import React, { useState, useEffect, useRef } from 'react'
import Peer from 'simple-peer'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSocket } from '../context/SocketProvider'
import { useGlobalContext } from '../context/globalContext'
import { useVideoChat } from '../context/videoChatProvider'

const Index = () => {
  const [me, setMe] = useState()

  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState('')
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState('')
  const [callEnded, setCallEnded] = useState(false)
  const [showHideVideoToggle, setShowHideVideoToggle] = useState('Hide')

  const userVideo = useRef()
  const connectionRef = useRef()

  const { selectedEmail } = useGlobalContext()
  const { stream, createVideoChat, myVideo, shareScreen, myScreen } =
    useVideoChat()
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('me', (id) => {
        console.log('me socket', id)
        setMe(id)

        socket.on('callUser', (data) => {
          console.log('data from use effect', data)
          setReceivingCall(true)
          setCaller(data.from)
          setCallerSignal(data.signal)
        })
      })
      if (!stream) {
        createVideoChat()
      }
    }
  }, [socket])

  const callUser = (id) => {
    console.log('called user', id)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    })
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: selectedEmail,
      })
    })
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream
    })
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    })
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller })
    })
    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()
  }

  const showHideVideo = () => {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
    if (stream.getVideoTracks()[0].enabled) {
      setShowHideVideoToggle('Hide')
    } else {
      setShowHideVideoToggle('Show')
    }
  }

  return (
    <>
      {stream && (
        <>
        <div className='grid grid-cols-12 gap-3 mx-auto w-full'>
          <div className='col-span-5'>
            {selectedEmail}
            <video playsInline muted ref={myVideo} autoPlay />
          </div>

          <div className='col-span-5'>
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay />
            ) : null}
          </div>
          <div className='myId col-span-2'>
            <div className='my-4 text-lg text-center'>{me}</div>
            <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
              <>
                <button className='btn'>Copy ID </button>
              </>
            </CopyToClipboard>

            <input
              className='input input-bordered'
              type='text'
              id='filled-basic'
              label='ID to call'
              value={idToCall}
              onChange={(e) => {
                setIdToCall(e.target.value)
                console.log('id to call', idToCall)
              }}
            />
            <div className='call-button'>
              {callAccepted && !callEnded ? (
                <button className='btn btn-error' onClick={leaveCall}>
                  End Call
                </button>
              ) : (
                <button
                  className='btn'
                  aria-label='call'
                  onClick={() => callUser(idToCall)}
                >
                  Join Meet
                </button>
              )}
              {idToCall}
              <button
                className='btn'
                onClick={() => {
                  stream.getAudioTracks()[0].enabled === true
                    ? (stream.getAudioTracks()[0].enabled = false)
                    : (stream.getAudioTracks()[0].enabled = true``)
                }}
              >
                mute audio
              </button>

              <button className='btn' onClick={showHideVideo}>
                {showHideVideoToggle} Video
              </button>
              <button className='btn' onClick={shareScreen}>
                Share Screen
              </button>
              <div>
                {receivingCall ? (
                  <div className='caller'>
                    <h1>{selectedEmail} is calling...</h1>
                    <button className='btn btn-success' onClick={answerCall}>
                      Answer
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
         <video
         playsInline
         ref={myScreen}
         autoPlay
         
       />
       </>
      )}
    </>
  )
}

export default Index
