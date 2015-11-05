import React from "react"
import BaseComponent from "./base_component"
import ProgressBar from "./progress_bar"

export default class Player extends BaseComponent {
  toggle() {
    this.context.flux.actions.PlayerActions.toggle()
  }

  buttonLabel() {
    if (this.props.playerStore.buffering) return "Loading..."
    return this.props.playerStore.playing ? "Pause" : "Play"
  }

  render() {
    if (!this.props.playerStore.track) return null

    return (
      <div className="player">
        <div>Current track: {this.props.playerStore.track.title}</div>
        <ProgressBar currentTime={this.props.playerStore.currentTime}
                     duration={this.props.playerStore.track.duration}
                     progress={this.props.playerStore.progress}/>
        <button onClick={this.toggle.bind(this)}>{this.buttonLabel()}</button>
      </div>
    )
  }
}
