'use strict';

var test = require('tape');
var isPlainObject = require('../../../lib/utils/isPlainObject');

test('isPlainObject()', function(assert) {

  assert.plan(8);

  [
    { obj: false, expected: false },
    { obj: true, expected: false },
    { obj: [], expected: false },
    { obj: new Date(), expected: false },
    { obj: null, expected: false },
    { obj: 9001, expected: false },
    { obj: 'hi', expected: false },
    { obj: {}, expected: true }
  ].forEach(function(scenario) {
    var obj = scenario.obj;
    var actual = isPlainObject(obj);
    var expected = scenario.expected;

    assert.equal(actual, expected,
      'should return (' + expected + ') for (' + JSON.stringify(obj) + ')'
    );
  });

  assert.end();
});
