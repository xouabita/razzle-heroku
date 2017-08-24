# razzle-heroku
Make [razzle](https://github.com/jaredpalmer/razzle) work on heroku seamlessly

## Quickstart :rocket:

1. Install `razzle-heroku` (`npm i -S razzle-heroku` or `yarn add razzle-heroku`)
2. Create a `razzle.config.js` in your project root

```js
module.exports = {
  modify: require("razzle-heroku"),
}
```

## Features

- Allow your app to read environment variables at runtime
- Bind the `$PORT` at runtime
- Fix `RAZZLE_PUBLIC_DIR` on heroku

## Why ? 🤔

[Razzle](https://github.com/jaredpalmer/razzle) is a really good tool but it is hard to deploy on heroku:

- You need to prefix all your environment variables by `RAZZLE_`
- Because all environment variables are embedded during the build time, but the heroku `$PORT` is set at runtime
- `RAZZLE_PUBLIC_DIR` is not properly set
