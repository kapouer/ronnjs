
/* ronn.js test suite
 *
 * Usage:
 *      nodeunit test.js
 *
 * Can limit the tests with the "TEST_ONLY" environment variable: a
 * space-separated lists of dir names to which to limit. E.g.:
 *      TEST_ONLY=foo nodeunit test.js
 * Can also prefix with a '-' to *exclude* that test. E.g.: to run all but
 * the "irc" test:
 *      TEST_ONLY="-bar" nodeunit test.js
 */

var path = require('path');
var sys  = require('sys');
var exec = require('child_process').exec;
var fs   = require('fs');
var testCase = require('nodeunit').testCase;

var Ronn = require('../lib/ronn').Ronn;


var data = {
  //setUp: function(callback) {
  //  ...
  //}
};

// Process includes and excludes from "TEST_ONLY".
var only = [], excludes = [];
if (process.env.TEST_ONLY) {
  console.warn("Note: Limiting 'test.js' tests by $TEST_ONLY: '"
    + process.env.TEST_ONLY + "'");
  var tokens = process.env.TEST_ONLY.trim().split(/\s+/);
  for (var i=0; i < tokens.length; i++) {
    if (tokens[i][0] === "-") {
      excludes.push(tokens[i].slice(1));
    } else {
      only.push(tokens[i]);
    }
  }
}

// Add a test case for each dir with a "test.sh" script.
var casesDir = __dirname + "/cases";
var names = fs.readdirSync(casesDir);
for (var i=0; i < names.length; ++i) {
  var name = names[i];
  if (name.slice(-".ronn".length) !== ".ronn") {
    continue;
  }
  if (only.length && only.indexOf(name) == -1) {
    continue;
  }
  if (excludes.length && excludes.indexOf(name) != -1) {
    continue;
  }
  var ronnPath = path.join(casesDir, name);
  data[name] = (function(ronnPath) {
    return function(test) {
      var numTests = 0;
      var expectedHtml = null;
      try {
        var htmlPath = ronnPath.slice(0, -".ronn".length) + ".html";
        if (fs.statSync(htmlPath)) {
          expectedHtml = fs.readFileSync(htmlPath, 'utf-8');
          numTests += 1;
        }
      } catch(e) {}
      
      var expectedRoff = null;
      try {
        var roffPath = ronnPath.slice(0, -".ronn".length) + ".roff";
        if (fs.statSync(roffPath)) {
          expectedRoff = fs.readFileSync(roffPath, 'utf-8');
          numTests += 1;
        }
      } catch(e) {}
      
      test.expect(numTests);
      var ronn = new Ronn(fs.readFileSync(ronnPath, 'utf-8'), "", "", "2010-12-25");
      if (expectedRoff !== null) {
        var actual = ronn.roff();
        test.equal(expectedRoff, actual,
          "unexpected roff output. Expected: --\n"+expectedRoff+"\n--\nGot: --\n"+actual+"\n--");
      }
      if (expectedHtml !== null) {
        var actual = ronn.html();
        test.equal(expectedHtml, actual,
          "unexpected HTML output. Expected: --\n"+expectedHtml+"\n--\nGot: --\n"+actual+"\n--");
      }
      test.done();
    }
  })(ronnPath);
}

exports['test'] = testCase(data);
