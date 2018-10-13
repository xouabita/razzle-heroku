const isHeroku = require("is-heroku")
const entries = require("object.entries")

module.exports = (config, {target, dev}, webpack) => {
  if (target !== "node") return config

  const isDefinePlugin = plugin => plugin.constructor.name === "DefinePlugin"
  const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin)

  if (indexDefinePlugin < 0) {
    console.warn("Couldn't setup razzle-heroku, no DefinePlugin...")
    return config
  }

  const {definitions} = config.plugins[indexDefinePlugin]
  const newDefs = Object.assign({}, definitions);

  if (isHeroku) {
    delete newDefs["process.env.PORT"]
    newDefs["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"'
  }

  config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs)

  return config
}
