import remote from "remote"
import React from "react"
import BaseComponent from "./base_component"
import TrackBrowser from "./track_browser"
import Player from "./player"
import connectToStores from "alt/utils/connectToStores"

@connectToStores
export default class App extends BaseComponent {
  static getStores(_props, context) {
    return [
      context.flux.stores.ArtistStore,
      context.flux.stores.TrackStore,
      context.flux.stores.PlayerStore
    ]
  }

  static getPropsFromStores(_props, context) {
    return {
      artistStore : context.flux.stores.ArtistStore.getState(),
      trackStore  : context.flux.stores.TrackStore.getState(),
      playerStore : context.flux.stores.PlayerStore.getState()
    }
  }

  componentDidMount() {
    const globalShortcut = remote.require("global-shortcut")

    globalShortcut.register("MediaPlayPause", () => {
      this.context.flux.actions.PlayerActions.toggle()
    })

    window.addEventListener("beforeunload", () => {
      globalShortcut.unregister("MediaPlayPause")
    })
  }

  render() {
    return (
      <div>
        <Player playerStore={this.props.playerStore} />
        <TrackBrowser tracks={this.props.trackStore}
                      artists={this.props.artistStore} />
      </div>
    )
  }
}
