'use strict';

var glob = require('glob');
var path = require('path');

var baseDir = path.resolve(__dirname);
var testsDir = path.join(baseDir, '**', '*.test.js');

glob.sync(testsDir).forEach(function(file) {
  require(file);
});
