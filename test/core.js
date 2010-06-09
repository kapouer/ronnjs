var path = require('path');
var ronn = require(path.join(__dirname, '../lib/ronn'));

exports.tests = {
	testOne : function() {
		testFormat(path.join(__dirname, 'fixtures', 'markdown_syntax.ronn'), ['roff']);
	}
};



var read = require('fs').readFileSync;
function testFormat(pPath, pFormats) {
	var fTxt = read(pPath, 'utf8');
	var fBase = path.join(path.dirname(pPath), path.basename(pPath, path.extname(pPath)));
	var fRonn = new ronn.Ronn(fTxt);
	for (var i=0; i < pFormats.length; i++) {
		var lResult = fRonn[pFormats[i]]();
		assertEqual(lResult, read(fBase + "." + pFormats[i]));
	}
}