'use strict';

var test = require('tape');
var SriWebpackPlugin = require('..');

test('SriWebpackPlugin', function(assert) {
  var plugin = new SriWebpackPlugin({
    algorithm: 'sha256'
  });

  assert.equal(plugin.algorithm, 'sha256', 'should receive an algorithm');
  assert.end();
});
