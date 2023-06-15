import React, { useContext, useState, useRef } from 'react'
import { useSocket } from './SocketProvider'
import { useNavigate } from 'react-router-dom'

const VideoChat = React.createContext()

export function useVideoChat() {
  return useContext(VideoChat)
}

export function VideoChatProvider({ children }) {
  let navigate = useNavigate()

  const [stream, setStream] = useState()
  const [socketID, setSocketID] = useState()
  const [screenCapture, setScreenCapture] = useState('')

  const myVideo = useRef()
  const myScreen = useRef()

  const { socket } = useSocket()

  const createVideoChat = () => {
    console.log("socket print here", socket)
    if (socket) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream)
          navigate('../VideoChat')
          myVideo.current.srcObject = stream
        })
      setSocketID(socket.id)
      console.log('socket is here', socket)
    }
  }

  const shareScreen = async () => {
    try {
      await navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          setScreenCapture(stream)
          myScreen.current.srcObject = stream
          console.log('screen capture done')
        })
    } catch (err) {
      console.error('Error: ' + err)
    }
    return screenCapture
  }

  return (
    <VideoChat.Provider
      value={{
        stream,
        createVideoChat,
        myVideo,
        socketID,
        shareScreen,
        myScreen,
        screenCapture,
      }}
    >
      {children}
    </VideoChat.Provider>
  )
}
