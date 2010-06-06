#!/usr/bin/nodejs

var opts = require('./ext/opts');

var options = [
	{ short       : 'v'
	, long        : 'version'
	, description : 'Show version and exit'
	, callback    : function () { sys.puts('0.1'); process.exit(1); }
	}
];
var arguments = [
	{ name : 'file'
	, required : true
	, description: 'Markdown documentation file'
	}
];
opts.parse(options, arguments, true);


var sys = require('sys');
var fs = require('fs');
var ronn = require('./ronn');

var fPath = opts.arg('file');
var fTxt = fs.readFileSync(fPath, 'utf8');
var fResult = ronn.roff(fTxt);
sys.puts(fResult);
