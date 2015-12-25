/**
 *  Script based on @roman01la's webpack-sri.
 *
 *  https://github.com/roman01la/webpack-sri
 *
 */

'use strict';

var getSriHash = require('./lib/utils').getSriHash;
var CustomStats = require('webpack-custom-stats-patch');

var DEFAULT_PARAMS = {
  algorithm: 'sha384',
  regex: (/\.(js|css)$/i),
  customStatsKey: 'sris',
  assetKey: 'integrity'
};

function SriWebpackPlugin(options) {
  var params = options || {};
  this._algorithm = params.algorithm || DEFAULT_PARAMS.algorithm;
  this._regex = params.regex || DEFAULT_PARAMS.regex;
  this._customStatsKey = params.customStatsKey || DEFAULT_PARAMS.customStatsKey;
  this._assetKey = params.assetKey || DEFAULT_PARAMS.assetKey;
};

SriWebpackPlugin.prototype.apply = function(compiler) {
  var sriAlgorithm = this._algorithm;
  var allowedExtensions = this._regex;
  var customStatsKey = this._customStatsKey;
  var assetKey = this._assetKey;
  var sris = {};

  compiler.plugin('this-compilation', function(compilation) {
    compilation.plugin('optimize-assets', function(assets, callback) {
      Object.keys(assets).forEach(function(file) {
        var asset = assets[file];
        var assetStat = {};
        var content;
        var integrity;

        if (file.match(allowedExtensions)) {
          content = asset.source();
          integrity = getSriHash(sriAlgorithm, content);
          assetStat[assetKey] = integrity;
          sris[file] = assetStat;
          compilation.assets[file].integrity = integrity;
        }
      });

      callback();
    });
  });

  compiler.plugin('after-emit', function(compilation, callback) {
    var stats = new CustomStats(compilation);

    stats.addCustomStat(customStatsKey, sris);

    callback();
  });
}

module.exports = SriWebpackPlugin;
