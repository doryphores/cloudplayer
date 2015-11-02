import SoundCloud from "../utils/soundcloud"
import _ from "underscore"

const soundcloud = new SoundCloud()

export default class TrackStore {
  constructor() {
    this.state = {
      tracks       : [],
      currentTrack : null
    }

    const TrackActions = this.alt.getActions("TrackActions")

    this.bindListeners({
      fetchTracks : TrackActions.REFRESH,
      select      : TrackActions.SELECT,
    })
  }

  select(id) {
    this.setState({
      currentTrack: _.find(this.state.tracks, track => track.id == id)
    })
  }

  fetchTracks() {
    this.setState({
      tracks: []
    })

    soundcloud.fetchTracks().then(tracks => {
      this.setState({
        tracks: tracks
      })
    })
  }
}
