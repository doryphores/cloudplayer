export default class PlayerActions {
  toggle() {
    this.dispatch()
  }

  play() {
    this.dispatch()
  }

  pause() {
    this.dispatch()
  }

  seek(position) {
    this.dispatch(position)
  }
}
