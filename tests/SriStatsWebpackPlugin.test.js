'use strict';

var test = require('tape');
var SriStatsWebpackPlugin = require('..');

test('SriStatsWebpackPlugin', function(assert) {
  var plugin = new SriStatsWebpackPlugin({
    algorithm: 'sha256'
  });

  assert.equal(plugin.getAlgorithm(), 'sha256', 'should receive an algorithm');
  assert.end();
});
