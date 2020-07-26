import React, { useState, useEffect } from "react"

// import all views components
// import LoginView from "./login/login.view"

// Import component
import { BrowserRouter } from "react-router-dom"
import Lottie from "react-lottie"
import Navbar from "../components/navbar/navbar.component"
import Panel from "../components/panel/panel.component"
import Modal from "../components/modal/modal.component"

// import store and actions types
import store from "../store"

// import root of all views
import RootView from "./root/root.view"

// import assets
import loadingAnimation from "../animations/loading.json"

function App() {
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    store.subscribe(() => {
      const { loader } = store.getState()


      setLoader(loader)
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="content-app">
          <Panel />

          <RootView />
        </div>
      </BrowserRouter>


      <Modal isVisible={loader}>
        <Lottie style={{ borderRadius: 25 }} options={{ loop: true, animationData: loadingAnimation }} height={512} width={512} />
      </Modal>
    </>
  )
}

export default App
