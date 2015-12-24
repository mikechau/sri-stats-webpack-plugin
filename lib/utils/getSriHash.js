/**
 *  Script based on @roman01la's sri.
 *
 *  https://github.com/roman01la/sri
 *
 */

'use strict';

var crypto = require('crypto');

module.exports = function getSriHash(algorithm, data) {
  var hash = crypto
    .createHash(algorithm)
    .update(data, 'utf8')
    .digest('base64');

  return (algorithm + '-' + hash);
};
