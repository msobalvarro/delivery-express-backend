import React from "react"

// import all views components
// import LoginView from "./login/login.view"

// Import component
import { BrowserRouter } from "react-router-dom"
import Navbar from "../components/navbar/navbar.component"
import Panel from "../components/panel/panel.component"

// import root of all views
import RootView from "./root/root.view"


function App() {


  return (
    <BrowserRouter>
      <Navbar />

      <div className="content-app">
        <Panel />

        <RootView />
      </div>
    </BrowserRouter>
  )
}

export default App
