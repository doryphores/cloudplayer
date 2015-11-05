import React from "react"
import BaseComponent from "./base_component"
import ProgressBar from "./progress_bar"

export default class Player extends BaseComponent {
  toggle() {
    this.context.flux.actions.PlayerActions.toggle()
  }

  buttonIcon() {
    if (this.props.playerStore.buffering) return "more_horiz"
    return this.props.playerStore.playing ? "pause" : "play_arrow"
  }

  render() {
    if (!this.props.playerStore.track) return null

    return (
      <div className="player">
        <div className="player__button" onClick={this.toggle.bind(this)}>
          <i className="icon">{this.buttonIcon().toLowerCase()}</i>
        </div>
        <div className="player__progress">
          <ProgressBar currentTime={this.props.playerStore.currentTime}
                       duration={this.props.playerStore.track.duration}
                       progress={this.props.playerStore.progress}/>
        </div>
      </div>
    )
  }
}
