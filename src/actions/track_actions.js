export default class TrackActions {
  refresh() {
    this.dispatch()
  }

  select(id) {
    this.dispatch(id)
  }
}
