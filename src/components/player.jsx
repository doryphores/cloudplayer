import React from "react"
import BaseComponent from "./base_component"

export default class Player extends BaseComponent {
  play() {
    this.context.flux.getActions("TrackActions").play()
  }

  pause() {
    this.context.flux.getActions("TrackActions").pause()
  }

  render() {
    return (
      <div>
        <h2>Player</h2>
        <div>Current track: {this.props.currentTrack.title}</div>
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
      </div>
    )
  }
}
