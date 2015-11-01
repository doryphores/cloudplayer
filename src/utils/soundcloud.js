import SC from "soundcloud"
import _ from "underscore"

const USER_NAME = "doryphores"
const CLIENT_ID = "7eff5005846f8ac6bd32d417a55eb5d5"

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: "cloudplayer://callback.html"
})

export default class SoundCloud {
  constructor() {
    this.player = null
  }

  fetchTracks() {
    return SC.resolve(`https://soundcloud.com/${USER_NAME}`).then(user => {
      return SC.get(`/users/${user.id}/followings`)
    }).then(function (users) {
      return Promise.all(users.map(user => {
        return SC.get(`/users/${user.id}/tracks`)
      }))
    }).then(tracks => {
      return Promise.resolve(_.sortBy(_.flatten(tracks), "created_at").reverse())
    })
  }

  stream(track_id) {
    return SC.stream(`/tracks/${track_id}`).then(player => {
      this.player = player
    })
  }

  play() {
    if (this.player) {
      this.player.play()
    }
  }

  pause() {
    if (this.player) {
      this.player.pause()
    }
  }
}
