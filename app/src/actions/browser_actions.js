import SoundCloud from "../utils/soundcloud"

const soundcloud = new SoundCloud()

export default class BrowserActions {
  refresh() {
    this.dispatch()
    soundcloud.fetchTracks().then(tracks => {
      this.actions.refreshSuccess(tracks)
    }).catch(err => console.log("REFRESH ERROR", err))
  }

  refreshSuccess(tracks) {
    this.dispatch(tracks)
  }

  selectTrack(id) {
    this.dispatch(id)
  }

  selectArtist(id) {
    this.dispatch(id)
  }
}
