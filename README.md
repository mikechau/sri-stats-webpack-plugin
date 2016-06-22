# sri-stats-webpack-plugin

[![npm version](https://badge.fury.io/js/sri-stats-webpack-plugin.svg)](https://badge.fury.io/js/sri-stats-webpack-plugin) [![Build Status](https://travis-ci.org/mikechau/sri-stats-webpack-plugin.svg?branch=master)](https://travis-ci.org/mikechau/sri-stats-webpack-plugin) [![Dependency Status](https://david-dm.org/mikechau/sri-stats-webpack-plugin.svg)](https://david-dm.org/mikechau/sri-stats-webpack-plugin) [![devDependency Status](https://david-dm.org/mikechau/sri-stats-webpack-plugin/dev-status.svg)](https://david-dm.org/mikechau/sri-stats-webpack-plugin#info=devDependencies)

Most of the code based on [@roman01la's](https://github.com/roman01la) [webpack-sri](https://github.com/roman01la/webpack-sri/blob/master/index.js).

This is a webpack plugin which generates a [subresource integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). It adds the hash to webpack's `stats` object.

It creates a direct mapping with `[asset] => sri hash`, and another
mapping of `[asset] => { [integrityKey]: hash }`.

The direct mapping is saved into webpack's `compilation`, while the secondary
mapping is saved into `stats.toJson()`.

Example:

```js
// webpack stats

compilation.getStats().toJson().sris
# => {
  'main-459130c16ce3c68b595e.js': {
    integrity: 'sha384-Lgg9yFvipJWo8BEZOJhBN2wCPtr/RVl9EWeXFHUzQKtUduAyATSIl79NJbfzZT8p'
  }
}

// webpack compilation

compilation.__RESULTS_SRIS
# => {
  'main-459130c16ce3c68b595e.js': 'sha384-Lgg9yFvipJWo8BEZOJhBN2wCPtr/RVl9EWeXFHUzQKtUduAyATSIl79NJbfzZT8p'
}
```

## Setup

```
npm install sri-stats-webpack-plugin --save-dev
```

## Usage

```js
// Your webpack config

var path = require('path');
var SriStatsPlugin = require('sri-stats-webpack-plugin');

var config = {
  plugins: [
    new SriStatsPlugin({
      algorithm: 'sha512',
      allow: (/\.(js|css)$/i/),
      customStatsKey: 'rails',
      assetKey: 'integrity',
      saveAs: path.join(__dirname, 'build', 'subresource-integrity-mapping.json'),
      write: true,
      writeDirectMapping: true,
      resultsKey: '__RESULTS_SRIS',
      runAfterEmit: true
    })
 ]
};
```

## Configuration

- `algorithm`: The hashing algorithm to use.
  Default: `sha384`
- `allow`: This is a regex to allow what files should be hashed. The default
  regex is set to allow only `.js` or `.css` files.
  Default: `/\.(js|css)$/i/`
- `customStatsKey`: This is the parent key the mapping is saved to. You will
  probably want to change this if you are using it with the
  *SprocketsStatsWebpackPlugin*.
  Default: `sris`
- `assetKey`: This is the child key that the hash will be associated to.
  Default: `integrity`
- `saveAs`: *Absolute* path to where to save the output to.
  Default: `path.join(process.env.WEBPACK_OUTPUT_PATH, 'build', 'subresource-integrity-mapping.json')`. If `WEBPACK_OUTPUT_PATH`, is not specified, it will fallback to `process.cwd()`.
- `write`: Boolean option, of whether to write the stats file or not.
  Default: `false`
- `writeDirectMapping`: Boolean option, enables writing `[asset] => [hash]`.
  Otherwise it will write it as `[asset] => { [integrityKey] => [hash] }`.
  Default: `true`
- `resultsKey`: Where to save the results to in webpack's `compilation` object.
  Default: `__RESULTS_SRIS`
- `runAfterEmit`: Boolean option, whether to calculate hashes during or after
  emit stage. If HTMLWebpackPlugin is supposed to pick up the hashes (during
  emit stage), set to false and run this plugin first.
  Default: `true`

## License
MIT.
