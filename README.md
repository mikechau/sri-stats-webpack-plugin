# sri-webpack-plugin

[![npm version](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin.svg)](https://badge.fury.io/js/%40mikechau%2Fsri-webpack-plugin)

Most of the code based on [@roman01la's](https://github.com/roman01la) [webpack-sri](https://github.com/roman01la/webpack-sri/blob/master/index.js).

This is a webpack plugin which generates a [subresource integrity hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity). It adds a `sri` key to webpack's `compilation.assets` object.

You will need a seperate stats plugin in order to write it to an asset manifest.

Also this sri hash might not be available to the your existing stat / manifest
generating plugins, as the `sri` key will probably not be available inside the
`stats.toJSON().assets` object webpack provides.

The sri hash is acessible via `compilation.assets['filename'].sri`.

## Setup

```
npm install @mikechau/sri-webpack-plugin --save-dev
```

