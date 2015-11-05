import SoundCloud from "../utils/soundcloud"
import _ from "underscore"

const soundcloud = new SoundCloud()

export default class PlayerStore {
  static config = {
    onDeserialize(data) {
      _.defaults(data, PlayerStore.defaultState)
      data.playing   = false
      data.buffering = false
      return _.pick(data, _.keys(PlayerStore.defaultState))
    }
  }

  static defaultState = {
    playing     : false,
    buffering   : false,
    volume      : 1,
    currentTime : 0,
    progress    : 0,
    track       : null
  }

  constructor() {
    this.state = Object.assign({}, PlayerStore.defaultState)

    this.player = null

    this.bindListeners({
      load   : this.alt.actions.BrowserActions.SELECT_TRACK,
      toggle : this.alt.actions.PlayerActions.TOGGLE,
      play   : this.alt.actions.PlayerActions.PLAY,
      pause  : this.alt.actions.PlayerActions.PAUSE,
      seek   : this.alt.actions.PlayerActions.SEEK
    })
  }

  load() {
    this.unload()

    this.waitFor(this.alt.stores.TrackStore)

    let track = this.alt.stores.TrackStore.getState().selected

    this.setState({
      track       : track,
      currentTime : 0,
      progress    : 0
    })

    this.startStream()
  }

  unload() {
    if (this.player) {
      this.player.off("time")
      this.player.off("finish")
      this.player.off("buffering_start")
      this.player.off("buffering_end")
      this.player.off("play-resume")
      this.player.off("seeked")
      this.player.pause()
    }
  }

  startStream() {
    this.setState({
      buffering: true
    })

    soundcloud.stream(this.state.track.id).then(player => {
      this.player = player

      this.player.on("time", () => {
        this.setState({
          currentTime : this.player.currentTime(),
          progress    : this.player.currentTime() / this.state.track.duration
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
          currentTime : 0,
          progress    : 0
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
      this.player.setVolume(this.state.volume)
      this.setState({
        playing: true
      })
      this.player.play()
    } else if (this.state.track) {
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

  seek(position) {
    // Ensure position is between 0 and 1
    position = [0, 1, position].sort()[1]
    let newTime = this.state.track.duration * position

    if (this.player) {
      // Pause playback while seeking
      if (this.state.playing) {
        this.player.pause()
        this.player.on("seeked", () => {
          this.player.off("seeked")
          this.player.play()
        })
      }
      this.player.seek(newTime)
    }

    // Manually set time and progress so display
    // is updated before seek is complete
    if (this.state.track) {
      this.setState({
        currentTime : newTime,
        progress    : position
      })
    }
  }
}
