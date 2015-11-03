import React from "react"
import BaseComponent from "./base_component"

export default class Player extends BaseComponent {
  toggle() {
    this.context.flux.actions.PlayerActions.toggle()
  }

  buttonLabel() {
    return this.props.playerStore.playing ? "Pause" : "Play"
  }

  formatTime(timestamp) {
    let d = new Date(timestamp)
    return [
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    ].map(t => t < 10 ? `0${t}` : t).join(":").replace(/^00:/, "")
  }

  render() {
    if (!this.props.playerStore.currentTrack) return null

    return (
      <div>
        <h2>Player</h2>
        <div>Current track: {this.props.playerStore.currentTrack.title}</div>
        <div>Time: {this.formatTime(this.props.playerStore.currentTime)} / {this.formatTime(this.props.playerStore.currentTrack.duration)}</div>
        <div>Progress: {Math.round(this.props.playerStore.progress * 100)}%</div>
        <button onClick={this.toggle.bind(this)}>{this.buttonLabel()}</button>
      </div>
    )
  }
}
