import React, { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../context/auth/authContext"
import Peer from "peerjs"
import { Button, Grid, OutlinedInput } from "@mui/material"
import "./VideoRoom.css"
import { Box, Container } from "@mui/system"
import SettingsIcon from "@mui/icons-material/Settings"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"
import CallEndIcon from "@mui/icons-material/CallEnd"
import VideocamIcon from "@mui/icons-material/Videocam"
import PresentToAllIcon from "@mui/icons-material/PresentToAll"
import VideocamOffIcon from "@mui/icons-material/VideocamOff"

const VideoRoom = () => {
  const myPeer = new Peer()

  const [peers, setPeers] = useState()
  // const [isMicMuted, setIsMicMuted] = useState(true)
  // const [isVideoShown, setIsVideoShown] = useState(true)

  const { socket, authStatus, user } = useContext(AuthContext)

  const myVideo = useRef()
  const userVideo = useRef()

  useEffect(() => {
    if (user && socket) {
      console.log("from video chat room", user, socket)

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream
          console.log("stream here", stream.getAudioTracks())
          myPeer.on("call", (call) => { 
            call.answer(stream)

            call.on("stream", (userVideoStream) => {
              console.log("call socket", userVideoStream.getAudioTracks())
              myVideo.current.srcObject = userVideoStream
            })
          })
          socket.on("user-connected", (userID) => {
            connectToNewUser(userID, stream)
          })

          socket.on("user-disconnected", (userID) => {
            console.log("user id", userID)
            document.getElementById("userVideo").remove()
            if (peers) {
              peers.close()
            }
          })
        })

      const url = window.location.href
      const parts = url.split("/")
      const meetID = parts[parts.length - 1]

      myPeer.on("open", (id) => {
        socket.emit("join-room", meetID, id)
      })
    }
  }, [authStatus, socket, user])

  // const toggleAudio = (val) => {
  //   setIsMicMuted(!val)
  //   myVideo.current.srcObject.getAudioTracks()[0].enabled = val
  // }

  // const toggleVideo = (val) => {
  //   setIsVideoShown(val)
  //   myVideo.current.srcObject.getVideoTracks()[0].enabled = val
  // }

  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }

  const connectToNewUser = (userID, stream) => {
    console.log("conect to new user", stream.getAudioTracks())
    const call = myPeer.call(userID, stream)
    call.on("stream", (userVideoStream) => {
      userVideo.current.srcObject = userVideoStream
    })
    call.on("close", () => {
      document.getElementById("userVideo").remove()
    })
    setPeers(call)
    console.log("call", call)
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        border={"2px solid green"}
      >
        <Box
          border={"2px solid red"}
          sx={{
            position: "relative",
            top: 0,
            overflow: "hidden",
            width: "100%",

            borderBottomLeftRadius: "20px 20px",
            borderBottomRightRadius: "20px 20px",
          }}
        >
          <video
            playsInline
            id="userVideo"
            className="userVideo"
            ref={userVideo}
            autoPlay
            muted
          />
        </Box>
        <Box
          border={"2px solid yellow"}
          sx={{
            overflow: "hidden",
            width: "100%",
            height: "110px",
            maxHeight: "110px",
            minHeight: '110px',
            display: "flex",
            paddingX: 4,
            paddingY: 3,
            justifyContent: "center",
          }}
        >
          <Button startIcon={<SettingsIcon />} variant="outlined">
            Settings
          </Button>
          <Box
            sx={{
              display: "flex",
              mx: 10,
              width: "18%",
              justifyContent: "space-evenly",
            }}
          >
            {/* {isMicMuted ? (
              <Button variant="outlined" onClick={() => toggleAudio(true)}>
                <MicOffIcon />
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => toggleAudio(false)}>
                <MicIcon />
              </Button>
            )} */}

            <Button variant="contained" color="danger">
              <CallEndIcon color="white" />
            </Button>

            {/* {isVideoShown ? (
              <Button variant="outlined" onClick={() => toggleVideo(false)}>
                <VideocamIcon />
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => toggleVideo(true)}>
                <VideocamOffIcon />
              </Button>
            )} */}
          </Box>
          <Button startIcon={<PresentToAllIcon />} variant="contained">
            Sharescreen
          </Button>
        </Box>
        {/* <Grid container spacing={2}>

<Grid item xs={12} border={'4px solid red'} height={'90vh'} width={'100vw'} sx={{position: 'absolute',
  top: 0, overflow: 'hidden'}}></Grid>

  </Grid> */}
        <Box
          item
          border={"2px solid cyan"}
          sx={{
            width: "20vw",
            // height: '25vh',
            aspectRatio: "16 / 9",
            overflow: "hidden",
            position: "absolute",
            bottom: "calc(10vh + 20px)",
            right: "20px",
            borderRadius: "20px",
          }}
        >
          <video
            resizeMode={"contain"}
            playsInline
            id="myVideo"
            ref={myVideo}
            autoPlay
            muted
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default VideoRoom
