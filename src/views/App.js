import React from "react"

// import route configuration
import { BrowserRouter, Route, Switch } from "react-router-dom"

// import all views components
import LoginView from "./login/login.view"


function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginView} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
