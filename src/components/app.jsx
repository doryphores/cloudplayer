import React from "react"
import BaseComponent from "./base_component"
import remote from "remote"

export default class App extends BaseComponent {
  constructor(props, context) {
    super(props, context)
    this.state = this.getStoreState()
  }

  componentDidMount() {
    // Listen to stores
  }

  getStoreState() {
    return {
    }
  }

  handleChange() {
    this.setState(this.getStoreState())
  }

  render() {
    return (
      <h1>Cloud player</h1>
    )
  }
}
