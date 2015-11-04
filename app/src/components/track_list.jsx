import React from "react"
import BaseComponent from "./base_component"

export default class TrackList extends BaseComponent {
  refresh() {
    this.context.flux.actions.BrowserActions.refresh()
  }

  selectTrack(id) {
    this.context.flux.actions.BrowserActions.selectTrack(id)
  }

  selectArtist(e) {
    this.context.flux.actions.BrowserActions.selectArtist(e.target.value)
  }

  filteredTracks() {
    if (this.props.artists.selected) {
      return this.context.flux.stores.TrackStore.forArtist(this.props.artists.selected.id)
    } else {
      return this.props.tracks.list
    }
  }

  render() {
    return (
      <div>
        <h2>Track list</h2>
        <button onClick={this.refresh.bind(this)}>Refresh</button>
        <select value={this.props.artists.selected.id} onChange={this.selectArtist.bind(this)}>
          <option value="__ALL__">All</option>
          {this.props.artists.list.map(user => {
            return (
              <option value={user.id} key={user.id}>{user.username}</option>
            )
          })}
        </select>
        <ul>
          {this.filteredTracks().map(track => {
            return (
              <li key={track.id} onDoubleClick={this.selectTrack.bind(this, track.id)}>{track.title}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}
