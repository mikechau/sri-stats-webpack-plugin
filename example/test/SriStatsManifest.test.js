'use strict';

var test = require('ava');
var actualManifest = require('../build/subresource-integrity-map');
var expectedManifest = require('./fixtures/subresource-integrity-map');

test('generated sprockets manifest matches expected', function(t) {
  var actualFiles = actualManifest.files;

  t.deepEqual(actualManifest, expectedManifest, 'manifests not equal');
});
