import React from "react"
import BaseComponent from "./base_component"

export default class TrackBrowser extends BaseComponent {
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

  artistFilterValue() {
    if (this.props.artists.selected) {
      return this.props.artists.selected.id
    }
    return "__ALL__"
  }

  render() {
    return (
      <div className="browser u-panel u-panel--grow u-container u-container--vertical">
        <div className="browser__tool-bar u-panel">
          <button onClick={this.refresh.bind(this)}>Refresh</button>
          <select value={this.artistFilterValue()} onChange={this.selectArtist.bind(this)}>
            <option value="__ALL__">All</option>
            {this.props.artists.list.map(user => {
              return (
                <option value={user.id} key={user.id}>{user.username}</option>
              )
            })}
          </select>
        </div>
        <ul className="browser__list u-panel u-panel--grow">
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
