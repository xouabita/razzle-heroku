class DefinePlugin {
  constructor(definitions) {
    this.definitions = definitions
  }
}

const fakeInvalidPlugin = {
  constructor: {
    name: "InvalidPlugin",
  },
}

const fakeFunctionPlugin = () => {}

const fakeWebpack = {
  DefinePlugin,
}

test("return the same config if target is not node", () => {
  const modify = require(".")
  const config = {
    foo: "bar",
  }
  const result = modify(Object.assign({}, config), {target: "web"}, fakeWebpack)
  expect(result).toEqual(config)
})

test("don't override the whole process.env if target is node", () => {
  const modify = require(".")
  const config = {
    plugins: [
      fakeInvalidPlugin,
      new DefinePlugin({
        "process.env": {
          foo: "bar",
          lol: "qux",
          PORT: 42,
        },
      }),
    ],
  }
  const result = modify(config, {target: "node"}, fakeWebpack)
  expect(result).toEqual({
    plugins: [
      fakeInvalidPlugin,
      new DefinePlugin({
        "process.env.foo": "bar",
        "process.env.lol": "qux",
        "process.env.PORT": 42,
      }),
    ],
  })
})

test("delete env.PORT and define process.env.RAZZLE_PUBLIC_DIR on heroku", () => {
  process.env.HEROKU = 1
  jest.resetModules()
  const modify = require(".")
  const config = {
    plugins: [
      fakeInvalidPlugin,
      new DefinePlugin({
        "process.env": {
          foo: "bar",
          lol: "qux",
          PORT: 42,
        },
      }),
    ],
  }
  const result = modify(config, {target: "node"}, fakeWebpack)
  expect(result).toEqual({
    plugins: [
      fakeInvalidPlugin,
      new DefinePlugin({
        "process.env.foo": "bar",
        "process.env.lol": "qux",
        "process.env.RAZZLE_PUBLIC_DIR": '"/app/build/public"',
      }),
    ],
  })
})