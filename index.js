/**
 *  Script based on @roman01la's webpack-sri.
 *
 *  https://github.com/roman01la/webpack-sri
 *
 */

'use strict';

var getSriHash = require('./lib/getSriHash');

var DEFAULT_PARAMS = {
  algorithm: 'sha384',
  regex: (/\.(js|css)$/i)
}

function SriWebpackPlugin(options) {
  var params = options || {};
  this.algorithm = params.algorithm || DEFAULT_PARAMS.algorithm;
  this.regex = params.regex || DEFAULT_PARAMS.regex;
};

SriWebpackPlugin.prototype.apply = function(compiler) {
  var allowedExtensions = this.regex;

  compiler.plugin('this-compilation', function(compilation) {
    compilation.plugin('optimize-assets', function(assets, callback) {
      Object.keys(assets).forEach(function(file) {
        var asset = asset[file];
        var content;

        if (file.match(allowedExtensions)) {
          content = asset.source();
          asset.sri = getSriHash(content);
        }
      });

      callback();
    });
  });
}

module.exports = SriWebpackPlugin;
