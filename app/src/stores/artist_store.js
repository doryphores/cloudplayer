import _ from "underscore"

export default class ArtistStore {
  static config = {
    onDeserialize(data) {
      return _.pick(_.defaults(data, ArtistStore.defaultState),
        _.keys(ArtistStore.defaultState))
    }
  }

  static defaultState = {
    list     : [],
    selected : null
  }

  constructor() {
    this.state = Object.assign({}, ArtistStore.defaultState)

    this.bindListeners({
      refresh : this.alt.actions.BrowserActions.REFRESH_SUCCESS,
      select  : this.alt.actions.BrowserActions.SELECT_ARTIST,
    })
  }

  select(artist_id) {
    this.setState({
      selected: _.find(this.state.list, a => a.id == artist_id)
    })
  }

  refresh(tracks) {
    let artists = _.reduce(tracks, (users, track) => {
      if (!_.findWhere(users, {id: track.user.id})) {
        users.push(track.user)
      }
      return users
    }, [])

    this.setState({
      list     : _.sortBy(artists, "username"),
      selected : this.state.selected && _.findWhere(artists, {id: this.state.selected.id})
    })
  }
}
