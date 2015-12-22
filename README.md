# sri-webpack-plugin

[![npm version](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin.svg)](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin)

Most of the code based on [@roman01la's](https://github.com/roman01la) [webpack-sri](https://github.com/roman01la/webpack-sri/blob/master/index.js).

This is a webpack plugin which generates a [subresource integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). It adds a `__CUSTOM_DATA_SRIS` key to webpack's `compilation` object.

Example:

```
compilation.__CUSTOM_DATA_SRIS = {
  'main-459130c16ce3c68b595e.js': 'sha384-Lgg9yFvipJWo8BEZOJhBN2wCPtr/RVl9EWeXFHUzQKtUduAyATSIl79NJbfzZT8p'
}
```

You will need a seperate stats plugin in order to write it to an asset manifest.

Also this sri hash might not be available to the your existing stat / manifest
generating plugins, as the `__CUSTOM_DATA_SRIS` key will probably not be available inside the
`stats.toJSON()` object webpack provides.

## Setup

```
npm install @mikechau/sri-webpack-plugin --save-dev
```

