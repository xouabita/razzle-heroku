# razzle-heroku [![Build Status](https://travis-ci.org/xouabita/razzle-heroku.svg?branch=master)](https://travis-ci.org/xouabita/razzle-heroku)
Make [razzle](https://github.com/jaredpalmer/razzle) work on heroku seamlessly.

## Quickstart :rocket:

1. Install `razzle-heroku` (`npm i -S razzle-heroku` or `yarn add razzle-heroku`)
2. Create a `razzle.config.js` in your project root

```js
module.exports = {
  modify: require("razzle-heroku"),
}
```

For more details, you can check [this commit](https://github.com/xouabita/razzle-heroku/commit/a99255bff9c11f9aa5af077923ba2bf5889ae63c) :)

## Features

- Allow your server to read environment variables at runtime. Client
  environment variables still need to be prefixed by `RAZZLE_`
- Bind the `$PORT` at runtime
- Fix `RAZZLE_PUBLIC_DIR` on heroku
