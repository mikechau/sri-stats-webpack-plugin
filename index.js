/**
 *  Script based on @roman01la's webpack-sri.
 *
 *  https://github.com/roman01la/webpack-sri
 *
 */

'use strict';

var fs = require('fs');
var path = require('path');
var getSriHash = require('./lib/utils').getSriHash;
var CustomStats = require('webpack-custom-stats-patch');

var DEFAULT_PARAMS = {
  algorithm: 'sha384',
  allow: (/\.(js|css)$/i),
  customStatsKey: 'sris',
  assetKey: 'integrity',
  saveAs: path.join(process.cwd(), 'build', 'subresource-integrity-map.json'),
  write: false,
  writeDirectMapping: true,
  resultsKey: '__RESULTS_SRIS'
};

function SriStatsWebpackPlugin(options) {
  var params = options || {};
  this._algorithm = params.algorithm || DEFAULT_PARAMS.algorithm;
  this._allow = params.allow || DEFAULT_PARAMS.allow;
  this._customStatsKey = params.customStatsKey || DEFAULT_PARAMS.customStatsKey;
  this._assetKey = params.assetKey || DEFAULT_PARAMS.assetKey;
  this._saveAs = params.saveAs || DEFAULT_PARAMS.saveAs;
  this._write = ((params.write === undefined) ? DEFAULT_PARAMS.write : params.write);
  this._writeDirectMapping = ((params.writeDirectMapping === undefined) ? DEFAULT_PARAMS.writeDirectMapping : params.writeDirectMapping);
  this._resultsKey = params.resultsKey || DEFAULT_PARAMS.resultsKey;
}

SriStatsWebpackPlugin.prototype.getAlgorithm = function getAlgorithm() {
  return this._algorithm;
};

SriStatsWebpackPlugin.prototype.apply = function(compiler) {
  var sriAlgorithm = this._algorithm;
  var whitelistRegex = this._allow;
  var customStatsKey = this._customStatsKey;
  var assetKey = this._assetKey;
  var savePath = this._saveAs;
  var writeEnabled = this._write;
  var writeDirectMapping = this._writeDirectMapping;
  var resultsKey = this._resultsKey;
  var directMapping = {};
  var sris = {};

  compiler.plugin('this-compilation', function(compilation) {
    compilation.plugin('optimize-assets', function(assets, callback) {
      Object.keys(assets).forEach(function(file) {
        var asset = assets[file];
        var assetStat = {};
        var content;
        var integrity;

        if (file.match(whitelistRegex)) {
          content = asset.source();
          integrity = getSriHash(sriAlgorithm, content);
          assetStat[assetKey] = integrity;
          sris[file] = assetStat;
          directMapping[file] = integrity;
        }
      });

      callback();
    });
  });

  compiler.plugin('after-emit', function(compilation, callback) {
    var stats = new CustomStats(compilation);

    stats.addCustomStat(customStatsKey, sris);
    compilation[resultsKey] = directMapping;

    callback();
  });

  compiler.plugin('done', function(stats) {
    var output;

    if (writeEnabled) {
      output = ((writeDirectMapping) ? stats.compilation[resultsKey] : sris);

      fs.writeFile(savePath, JSON.stringify(output, null, '  '), function(err) {
        if (err) {
          console.error('Failed to write stats.', err);
          throw err;
        }
      });
    }
  });
};

module.exports = SriStatsWebpackPlugin;
