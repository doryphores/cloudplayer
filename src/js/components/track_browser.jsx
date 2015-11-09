import React from "react"
import BaseComponent from "./base_component"
import {formatTime} from "../utils/helpers"
import classnames from "classnames"

export default class TrackBrowser extends BaseComponent {
  refresh() {
    this.context.flux.actions.BrowserActions.refresh()
  }

  selectTrack(id) {
    this.context.flux.actions.BrowserActions.selectTrack(id)
  }

  selectArtist(id) {
    if (typeof id == "object") id = e.target.value
    this.context.flux.actions.BrowserActions.selectArtist(id)
  }

  filteredTracks() {
    if (this.props.artists.selected) {
      return this.context.flux.stores.TrackStore.forArtist(this.props.artists.selected.id)
    } else {
      return this.props.tracks.list
    }
  }

  artistClassNames(id) {
    return classnames("artist", {
      "artist--selected": (
        this.props.artists.selected && this.props.artists.selected.id == id ||
        !this.props.artists.selected && id == "ALL"
      )
    })
  }

  trackClassNames(id) {
    return classnames("track", {
      "track--selected": this.props.tracks.selected && this.props.tracks.selected.id == id
    })
  }

  render() {
    return (
      <div className="browser u-panel u-panel--grow u-container u-container--vertical">
        <div className="browser__tool-bar u-panel">
          <button onClick={this.refresh.bind(this)}>Refresh</button>
        </div>
        <div className="u-panel--grow u-container u-container--horizontal">
          <ul className="browser__list artist-list u-panel">
            <li className={this.artistClassNames("ALL")} onClick={this.selectArtist.bind(this, "__ALL__")}>
              <span className="artist__name">All</span>
            </li>
            {this.props.artists.list.map(user => {
              return (
                <li className={this.artistClassNames(user.id)} key={user.id} onClick={this.selectArtist.bind(this, user.id)}>
                  <img className="artist__avatar" src={user.avatar_url}/>
                  <span className="artist__name">{user.username}</span>
                </li>
              )
            })}
          </ul>
          <ul className="browser__list track-list u-panel u-panel--grow">
            {this.filteredTracks().map(track => {
              return (
                <li className={this.trackClassNames(track.id)} key={track.id}
                  onDoubleClick={this.selectTrack.bind(this, track.id)}>
                  <img className="track__artwork" src={track.artwork_url}/>
                  <span className="track__title">{track.title}</span>
                  <span className="track__artist">{track.user.username}</span>
                  <span className="track__duration">{formatTime(track.duration)}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
