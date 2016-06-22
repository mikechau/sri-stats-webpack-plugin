'use strict';

module.exports = function getParam(param, defaultParam) {
  return param === undefined ? defaultParam : param;
};
