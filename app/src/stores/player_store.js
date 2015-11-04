import SoundCloud from "../utils/soundcloud"
import _ from "underscore"

const soundcloud = new SoundCloud()

export default class PlayerStore {
  static config = {
    onDeserialize(data) {
      _.defaults(data, PlayerStore.defaultState)
      data.playing   = false
      data.buffering = false
      return data
    }
  }

  static defaultState = {
    playing      : false,
    buffering    : false,
    volume       : 50,
    currentTime  : 0,
    progress     : 0,
    currentTrack : null
  }

  constructor() {
    this.state = Object.assign({}, PlayerStore.defaultState)

    this.player = null

    this.bindListeners({
      load   : this.alt.actions.BrowserActions.SELECT_TRACK,
      toggle : this.alt.actions.PlayerActions.TOGGLE,
      play   : this.alt.actions.PlayerActions.PLAY,
      pause  : this.alt.actions.PlayerActions.PAUSE
    })
  }

  load() {
    this.unload()

    this.waitFor(this.alt.stores.TrackStore)

    let currentTrack = this.alt.stores.TrackStore.getState().selected

    this.setState({
      currentTrack : currentTrack,
      currentTime  : 0,
      progress     : 0
    })

    this.startStream()
  }

  unload() {
    if (this.player) {
      this.player.off("time")
      this.player.off("finish")
      this.player.pause()
    }
  }

  startStream() {
    this.setState({
      buffering: true
    })

    soundcloud.stream(this.state.currentTrack.id).then(player => {
      this.player = player

      this.player.on("time", () => {
        this.setState({
          currentTime : this.player.currentTime(),
          progress    : this.player.currentTime() / this.state.currentTrack.duration
        })
      })

      this.player.on("buffering_start", () => {
        this.setState({
          buffering: true
        })
      })

      this.player.on("buffering_end", () => {
        this.setState({
          buffering: false
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
          this.player.on("play-resume", () => {
            this.setState({
              buffering: false
            })
          })
        })
      } else {
        this.player.on("play-resume", () => {
          this.setState({
            buffering: false
          })
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
