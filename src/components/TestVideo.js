import React, { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../context/auth/authContext"
import Peer from "peerjs"
import "./VideoRoom.css"


const TestVideo = () => {
    const myPeer = new Peer()
    const videoGrid = document.getElementById('video-grid')
    

    const [peers, setPeers] = useState([])
    // const [isMicMuted, setIsMicMuted] = useState(true)
    // const [isVideoShown, setIsVideoShown] = useState(true)
  
    const { socket, authStatus, user } = useContext(AuthContext)
  
    // const myVideo = useRef()
    // const userVideo = useRef()
  
    useEffect(() => {
    const myVideo = document.createElement('video')
    myVideo.muted = true
    const url = window.location.href
      const parts = url.split("/")
      const meetID = parts[parts.length - 1]
    
      if (user && socket) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
          }).then(stream => {
            addVideoStream(myVideo, stream)
          
            myPeer.on('call', call => {
              call.answer(stream)
              const video = document.createElement('video')
              call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
              })
            })
          
            socket.on('user-connected', userId => {
              connectToNewUser(userId, stream)
            })
          })
          
          socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
          })
          
          myPeer.on('open', id => {
            socket.emit('join-room', meetID, id)
          })
      }
    }, [authStatus, socket, user])
  
    function connectToNewUser(userId, stream) {
        const call = myPeer.call(userId, stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
        call.on('close', () => {
          video.remove()
        })
      
        setPeers([...userId, call])
      }
      
      function addVideoStream(video, stream) {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
          video.play()
        })
        videoGrid.append(video)
      }

  return (
    <div>
         <div id="video-grid"></div>
    </div>
  )
}

export default TestVideo