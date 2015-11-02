import Alt from "alt"
import remote from "remote"
import fs from "fs-extra"
import path from "path"
import _ from "underscore"
import TrackActions from "./actions/track_actions"
import TrackStore from "./stores/track_store"
import PlayerActions from "./actions/player_actions"
import PlayerStore from "./stores/player_store"

const app = remote.require("app")

const SNAPSHOT_FILE = path.join(
  app.getPath("appData"),
  app.getName(),
  "snapshot.json"
)

export default class Flux extends Alt {
  constructor(config = {}) {
    super(config)

    this.addActions("TrackActions", TrackActions)
    this.addActions("PlayerActions", PlayerActions)

    this.createStore(TrackStore)
    this.createStore(PlayerStore)

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
