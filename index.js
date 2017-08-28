const isHeroku = require("is-heroku")

module.exports = (config, {target, dev}, webpack) => {
  if (target !== "node") return config

  const isDefinePlugin = plugin => plugin.constructor.name === "DefinePlugin"
  const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin)

  const {definitions} = config.plugins[indexDefinePlugin]
  const newDefs = {}

  const writeDefs = ([key, val]) => (newDefs[`process.env.${key}`] = val)

  Object.entries(definitions["process.env"]).forEach(writeDefs)

  if (isHeroku) {
    delete newDefs["process.env.PORT"]
    newDefs["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"'
  }

  config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs)

  return config
}
