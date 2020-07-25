import React from "react"
import ReactDOM from "react-dom"

// import assets and styles
import "./index.scss"
import "normalize.css"

// import components
import App from "./views/App"

// import services
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
