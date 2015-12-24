'use strict';

module.exports = function isPlainObject(obj) {
    return (!!obj) && (obj.constructor === Object);
};
