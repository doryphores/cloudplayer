import React from "react"
import BaseComponent from "./base_component"
import TrackList from "./track_list"
import Player from "./player"

export default class App extends BaseComponent {
  constructor(props, context) {
    super(props, context)
    this.state = this.getStoreState()
  }

  componentDidMount() {
    this.context.flux.getStore("TrackStore").listen(this.handleChange.bind(this))
  }

  getStoreState() {
    return {
      trackStore: this.context.flux.getStore("TrackStore").getState()
    }
  }

  handleChange() {
    this.setState(this.getStoreState())
  }

  render() {
    return (
      <div>
        <h1>Cloud player</h1>
        <Player currentTrack={this.state.trackStore.currentTrack} />
        <TrackList tracks={this.state.trackStore.tracks} />
      </div>
    )
  }
}
