import _ from "underscore"

export default class TrackStore {
  static config = {
    onDeserialize(data) {
      return _.pick(_.defaults(data, TrackStore.defaultState),
        _.keys(TrackStore.defaultState))
    }
  }

  static defaultState = {
    list     : [],
    selected : null
  }

  constructor() {
    this.state = Object.assign({}, TrackStore.defaultState)

    this.bindListeners({
      refresh : this.alt.actions.BrowserActions.REFRESH_SUCCESS,
      select  : this.alt.actions.BrowserActions.SELECT_TRACK
    })

    this.exportPublicMethods({
      forArtist: this.forArtist
    })
  }

  forArtist(id) {
    return this.state.list.filter(track => track.user_id == id)
  }

  select(id) {
    this.setState({
      selected: _.find(this.state.list, track => track.id == id)
    })
  }

  refresh(tracks) {
    this.setState({
      list     : tracks,
      selected : this.state.selected && _.findWhere(tracks, {id: this.state.selected.id})
    })
  }
}
