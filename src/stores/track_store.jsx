import SoundCloud from "../utils/soundcloud"
import _ from "underscore"

const soundcloud = new SoundCloud()

export default class TrackStore {
  constructor() {
    this.tracks = []
    this.currentTrack = ""

    const TrackActions = this.alt.getActions("TrackActions")

    this.bindListeners({
      fetchTracks: TrackActions.REFRESH,
      select: TrackActions.SELECT,
      play: TrackActions.PLAY,
      pause: TrackActions.PAUSE
    })
  }

  select(id) {
    soundcloud.stream(id).then(() => {
      this.setState({
        currentTrack: _.find(this.tracks, track => track.id == id)
      })
    })
  }

  play() {
    soundcloud.play()
  }

  pause() {
    soundcloud.pause()
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
