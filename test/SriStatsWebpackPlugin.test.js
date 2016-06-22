'use strict';

var test = require('ava');
var SriStatsWebpackPlugin = require('..');

test('receives the algorithm', function(t) {
  var plugin = new SriStatsWebpackPlugin({
    algorithm: 'sha256'
  });

  t.is(plugin.getAlgorithm(), 'sha256', 'algorithm did not match expected');
});
