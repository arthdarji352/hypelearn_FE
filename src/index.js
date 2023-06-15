import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { GlobalContextProvider } from "./context/globalContext"
import { AppContextProvider } from "./context/appContextProvider"

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
