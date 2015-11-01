import React from "react"
import ReactDOM from "react-dom"
import Flux from "./flux"
import withAltContext from "alt/utils/withAltContext"
import App from "./components/app"

ReactDOM.render(
  React.createElement(withAltContext(new Flux())(App)),
  document.getElementById("app")
)
