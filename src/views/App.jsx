import React, { useState, useEffect } from "react"

// import all views components
import LoginView from "./login/login.view"

// Import component
import { BrowserRouter } from "react-router-dom"
import Lottie from "react-lottie"
import Navbar from "../components/navbar/navbar.component"
import Panel from "../components/panel/panel.component"
import Modal from "../components/modal/modal.component"

// import constanst and functions
import { globalStore } from "../utils/constant.util"

// import store and actions types
import store from "../store"
import { SETSTORAGE, DELETESTORAGE } from "../store/actionsTypes"

// import root of all views
import RootView from "./root/root.view"

// import assets
import loadingAnimation from "../animations/loading.json"

const App = () => {

  // loader global
  const [loader, setLoader] = useState(false)

  // estado que indica si el usuario esta logueado
  const [session, setSession] = useState(false)


  /**
   * Funcion que se ejecuta para verificar algunos procesos
   */
  const configurateComponent = async () => {
    const payload = globalStore.get()

    // Comprueba si hay datos retornados en el payload
    if (Object.keys(payload).length > 0) {

      // Creamos el dispatch para el storage de redux
      store.dispatch({
        type: SETSTORAGE,
        payload
      })

      // Le decimos que el usuario esta logueado
      setSession(true)
    } else {
      setSession(false)
      // Destruimos el sorage
      store.dispatch({ type: DELETESTORAGE })
    }
  }

  useEffect(() => {
    configurateComponent()

    store.subscribe(() => {
      const { loader } = store.getState()

      console.log(loader)


      setLoader(loader)
    })
  }, [])

  return (
    <>
      {
        session &&
        <BrowserRouter>
          <Navbar />

          <div className="content-app">
            <Panel />

            <RootView />
          </div>
        </BrowserRouter>
      }


      {
        !session &&
        <LoginView />
      }


      <Modal isVisible={loader}>
        <Lottie style={{ borderRadius: 25 }} options={{ loop: true, animationData: loadingAnimation }} height={512} width={512} />
      </Modal>
    </>
  )
}

export default App
