var packager = require("electron-packager")
var path = require("path")
var pkgjson = require("../app/package.json")
var os = require("os")

var projectDir = path.resolve(path.join(__dirname, ".."))
var appDir = path.join(projectDir, "app")

packager({
  dir: appDir,
  out: path.join(projectDir, "dist"),
  name: pkgjson.productName,
  appVersion: pkgjson.version,
  platform: os.platform(),
  arch: os.arch(),
  version: pkgjson.engines.electron,
  ignore: [
    "^/node_modules/\.bin($|/)",
    "/node_modules/.*/(docs|test)($|/)",
  ],
  asar: true,
  prune: true,
  overwrite: true
}, function (err, appPath) {
  console.log("All done!")
})
