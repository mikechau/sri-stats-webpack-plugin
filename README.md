# sri-stats-webpack-plugin

[![npm version](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin.svg)](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin)

Most of the code based on [@roman01la's](https://github.com/roman01la) [webpack-sri](https://github.com/roman01la/webpack-sri/blob/master/index.js).

This is a webpack plugin which generates a [subresource integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). It adds the hash to webpack's `stats` object.

By default it will add the mapping of `asset => sri hash` to `stats.sris`.

Example:

```
compilation.getStats().toJson().sris = {
  'main-459130c16ce3c68b595e.js': {
    integrity: 'sha384-Lgg9yFvipJWo8BEZOJhBN2wCPtr/RVl9EWeXFHUzQKtUduAyATSIl79NJbfzZT8p'
  }
}
```

You will need a separate stats plugin in order to write it to an asset manifest.

## Setup

```
npm install sri-webpack-plugin --save-dev
```

## Usage

```js
// Your webpack config
var SriStatsPlugin = require('sri-stats-webpack-plugin');

var config = {
  plugins: [
    new SriStatsPlugin({
      algorithm: 'sha512',
      customStatsKey: 'rails',
      assetKey: 'integrity'
    })
 ]
};

```

## Configuration

- `algorithm`: The hashing algorithm, by default it uses `sha384`.
- `allow`: This is a regex to allow what files should be hashed. By default it
  is `/\.(js|css)$/i/`, it will only hash `.js` or `.css` files.
- `customStatsKey`: This is the parent key the mapping is saved to. By default
  this is set to `sris`, you may want to change this if you are using it with
  *SprocketsStatsWebpackPlugin*.
- `assetKey`: This is the child key that the hash will be associated to. By
  default it is `integrity`.

