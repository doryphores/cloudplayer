import React from "react"
import BaseComponent from "./base_component"
import TrackList from "./track_list"
import Player from "./player"
import connectToStores from "alt/utils/connectToStores"

@connectToStores
export default class App extends BaseComponent {
  static getStores(_props, context) {
    return [
      context.flux.stores.TrackStore,
      context.flux.stores.PlayerStore
    ]
  }

  static getPropsFromStores(_props, context) {
    return {
      trackStore  : context.flux.stores.TrackStore.getState(),
      playerStore : context.flux.stores.PlayerStore.getState()
    }
  }

  render() {
    return (
      <div>
        <h1>Cloud player</h1>
        <Player playerStore={this.props.playerStore} />
        <TrackList tracks={this.props.trackStore.tracks} />
      </div>
    )
  }
}
