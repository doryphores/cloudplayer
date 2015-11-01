import React from "react"
import BaseComponent from "./base_component"

export default class TrackList extends BaseComponent {
  refresh() {
    this.context.flux.getActions("TrackActions").refresh()
  }

  select(id) {
    this.context.flux.getActions("TrackActions").select(id)
  }

  render() {
    return (
      <div>
        <h2>Track list</h2>
        <button onClick={this.refresh.bind(this)}>Refresh</button>
        <ul>
          {this.props.tracks.map((track, index) => {
            return (
              <li key={index} onDoubleClick={this.select.bind(this, track.id)}>{track.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
