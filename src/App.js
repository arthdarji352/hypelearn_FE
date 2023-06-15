// import 'tailwindcss/tailwind.css'
import "./app.css"
import "react-toastify/dist/ReactToastify.min.css"
import { CourseProvider } from "./context/courseProvider"
import { ConversationsProvider } from "./context/conversationsProvider"
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom"
import LearnerDashboard from "./pages/LearnerDashboard/LearnerDashboard"
import ExpertsProfile from './pages/ExpertsProfile/ExpertsProfile'
import VideoChat from "./pages/videoChat"
import { SocketProvider } from "./context/SocketProvider"
// import Auth from './states/Auth'
import { VideoChatProvider } from "./context/videoChatProvider"
import { ToastContainer } from "react-toastify"
import ResetPasswordPage from "./pages/resetPasswordPage"
import Home from "./pages/Home/Home"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./Theme/Theme"
// import { useGlobalContext } from "./context/globalContext"
// import { AppContextProvider } from "./context/appContextProvider"
import React, { useContext } from "react"
import AuthContext from "./context/auth/authContext"
import VideoRoom from "./components/VideoRoom"
import TestVideo from "./components/TestVideo"

function App({ Component, pageProps }) {
  const { authStatus } = useContext(AuthContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Router>
        <ThemeProvider theme={theme}>
          {/* <AppContextProvider> */}
          <SocketProvider>
            <VideoChatProvider>
              <CourseProvider>
                <ConversationsProvider>
                  <Routes>
                    {/* <Route path='/about'>
          <About />
        </Route>
        <Route path='/users'>
          <Users />
        </Route> */}
                    <Route
                      path="/experts-profile/:id"
                      element={<ExpertsProfile />}
                    />
                    <Route
                      path="/reset-password/:id"
                      element={<ResetPasswordPage />}
                    ></Route>
                    <Route
                      path="/learner-page"
                      element={
                        authStatus ? (
                          <LearnerDashboard />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    ></Route>
                    <Route
                      path="/videoChat"
                      element={
                        authStatus ? <VideoChat /> : <Navigate to="/" />
                      }
                    ></Route>
                    <Route
                      path="/chatRoom/:id"
                      element={
                        authStatus ? <TestVideo /> : <Navigate to="/" />
                      }
                    ></Route>
                    <Route path="/" exact element={authStatus ? <Navigate to="/learner-page" /> : <Home /> }></Route>

                    {/* <Route index element={<Dashboard />} /> */}
                    {/* <Dashboard /> */}
                  </Routes>
                </ConversationsProvider>
              </CourseProvider>
            </VideoChatProvider>
          </SocketProvider>
          {/* </AppContextProvider> */}
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
