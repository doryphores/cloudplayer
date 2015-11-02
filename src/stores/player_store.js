import SoundCloud from "../utils/soundcloud"
import _ from "underscore"

const soundcloud = new SoundCloud()

export default class PlayerStore {
  static config = {
    onDeserialize(data) {
      _.defaults(data, PlayerStore.defaultState)
      data.playing = false
      return data
    }
  }

  static defaultState = {
    playing      : false,
    volume       : 50,
    currentTime  : 0,
    progress     : 0,
    currentTrack : null
  }

  constructor() {
    this.state = Object.assign({}, PlayerStore.defaultState)

    this.player = null

    const PlayerActions = this.alt.getActions("PlayerActions")
    const TrackActions = this.alt.getActions("TrackActions")

    this.bindListeners({
      load   : TrackActions.SELECT,
      toggle : PlayerActions.TOGGLE,
      play   : PlayerActions.PLAY,
      pause  : PlayerActions.PAUSE
    })
  }

  load() {
    this.unload()

    this.waitFor(this.alt.stores.TrackStore)

    let currentTrack = this.alt.stores.TrackStore.getState().currentTrack

    this.setState({
      currentTrack : currentTrack,
      currentTime  : 0,
      progress     : 0
    })

    this.startStream()
  }

  unload() {
    this.player.off("time")
    this.player.off("finish")
    this.player.pause()
  }

  startStream() {
    soundcloud.stream(this.state.currentTrack.id).then(player => {
      this.player = player

      this.player.on("time", () => {
        this.setState({
          currentTime : this.player.currentTime(),
          progress    : this.player.currentTime() / this.state.currentTrack.duration
        })
      })

      this.player.on("finish", () => {
        this.setState({
          playing     : false,
          currentTime : this.state.currentTrack.duration,
          progress    : 1
        })
      })

      // We're restarting the stream so resume from where
      // we stopped. Most reliable way seems to be to listen
      // for 'play-resume' event and seek. Seeking before
      // starting playback doesn't work
      if (this.state.currentTime) {
        this.player.on("play-resume", () => {
          this.player.seek(this.state.currentTime)
          this.player.off("play-resume")
        })
      }

      this.play()
    })
  }

  play() {
    if (this.player) {
      this.setState({
        playing: true
      })
      this.player.play()
    } else if (this.state.currentTrack) {
      this.startStream()
    }
  }

  pause() {
    if (this.player) {
      this.setState({
        playing: false
      })
      this.player.pause()
    }
  }

  toggle() {
    if (this.state.playing) {
      this.pause()
    } else {
      this.play()
    }
  }
}
