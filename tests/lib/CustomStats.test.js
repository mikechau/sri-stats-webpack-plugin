'use strict';

var test = require('tape');
var CustomStats = require('../../lib/CustomStats');

test('CustomStats#getCustomStats()', function(assert) {
  var customStats = new CustomStats({});
  var actual = customStats.getCustomStats();
  var expected = {};

  assert.deepEqual(actual, expected, 'should get empty custom stats');
  assert.end();
});

test('CustomStats#addCustomStat()', function(assert) {
  var customStats = new CustomStats({});
  var actual = customStats.addCustomStat('key', { test: 'ok' });
  var expected = { key: { test: 'ok' } };

  assert.deepEqual(actual, expected, 'should return a object, given (key, value)');
  assert.deepEqual(customStats.getCustomStats(), expected, 'should save the new custom stat');

  assert.end();
});

test('CustomStats#replaceCustomStats()', function(assert) {
  var customStats = new CustomStats({});
  var expected = { test: 'ok' };

  assert.deepEqual(customStats.getCustomStats(), {}, 'should have empty custom stats');

  customStats.replaceCustomStats(expected);

  assert.deepEqual(customStats.getCustomStats(), expected, 'should replace custom stats');

  assert.end();
});

test('CustomStats#toJson()', function(assert) {
  var customStats = new CustomStats({
    hash: '1337',
    errors: [],
    warnings: [],
    mainTemplate: {
      getPublicPath: function() { return 'test'; }
    },
    assets: {
      test: {
        size: function() { return 9001; }
      }
    },
    chunks: [],
    modules: [],
    children: []
  });

  customStats.addCustomStat('sris', { 'leet.js': 'sha9001-1337' });

  var actual = customStats.toJson().sris;
  var expected = { 'leet.js': 'sha9001-1337' };

  assert.deepEqual(actual, expected, 'should have the custom stats attribute');

  assert.end();
});
