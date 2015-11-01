import Alt from "alt"
import remote from "remote"
import fs from "fs-extra"
import path from "path"
import _ from "underscore"

const app = remote.require("app")

const SNAPSHOT_FILE = path.join(
  app.getPath("appData"),
  app.getName(),
  "snapshot.json"
)

export default class Flux extends Alt {
  constructor(config = {}) {
    super(config)

    // Restore previous store state
    this.restoreSnapshot()

    // Debounce the saveSnapshot method to optimise disk writes
    const saveSnapshot = _.debounce(this.saveSnapshot.bind(this), 200)

    // Save a snapshot every time a store changes
    for (let store in this.stores) this.stores[store].listen(saveSnapshot)
  }

  saveSnapshot() {
    fs.outputFile(SNAPSHOT_FILE, this.takeSnapshot())
  }

  restoreSnapshot() {
    if (fs.existsSync(SNAPSHOT_FILE)) {
      try {
        this.bootstrap(fs.readFileSync(SNAPSHOT_FILE, "utf-8"))
      } catch(e) {
        // Log the error but carry on as normal. This could be due
        // to a corrupt or incompatible snapshot file
        console.error("An error occurred while restoring snapshot:", e)
      }
    }
  }
}
