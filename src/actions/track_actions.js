export default class TrackActions {
  refresh() {
    this.dispatch()
  }

  select(id) {
    this.dispatch(id)
    this.actions.play.defer()
  }

  play() {
    this.dispatch()
  }

  pause() {
    this.dispatch()
  }
}
