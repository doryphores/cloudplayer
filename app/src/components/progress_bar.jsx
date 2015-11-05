import React from "react"
import BaseComponent from "./base_component"

export default class ProgressBar extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      dragging       : false,
      sliderPosition : props.progress
    }

    this.onMouseMove = this.drag.bind(this)
    this.onMouseUp   = this.endDrag.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.dragging) {
      this.setState({
        sliderPosition: nextProps.progress
      })
    }
  }

  endDrag(e) {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("mouseup"  , this.onMouseUp)
    this.context.flux.actions.PlayerActions.seek(this.state.sliderPosition)
    this.setState({
      dragging: false
    })
  }

  startDrag(e) {
    this.setState({
      dragging       : true,
      sliderPosition : this.translateMousePosition(e.clientX)
    })
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("mouseup"  , this.onMouseUp)
  }

  drag(e) {
    this.setState({
      sliderPosition: this.translateMousePosition(e.clientX)
    })
  }

  translateMousePosition(clientX) {
    let rect = this.refs.slider.getBoundingClientRect()
    return [0, 1, (clientX - rect.left) / rect.width].sort()[1]
  }

  trackStyles() {
    return {
      width: `${this.state.sliderPosition * 100}%`
    }
  }

  handleStyles() {
    return {
      left: `${this.state.sliderPosition * 100}%`
    }
  }

  formatTime(timestamp) {
    let d = new Date(timestamp)
    return [
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    ].map(t => t < 10 ? `0${t}` : t).join(":").replace(/^00:/, "")
  }

  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar__time">
          {this.formatTime(this.props.currentTime)}
        </div>
        <div ref="slider" className="progress-bar__slider"
             onMouseDown={this.startDrag.bind(this)}>
          <div className="progress-bar__track">
            <span style={this.trackStyles()}/>
          </div>
          <div className="progress-bar__handle" style={this.handleStyles()}/>
        </div>
        <div className="progress-bar__duration">
          {this.formatTime(this.props.duration)}
        </div>
      </div>
    )
  }
}
