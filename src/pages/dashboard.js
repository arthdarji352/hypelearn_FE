import NavBar from '../components/navBar'
import Cards from '../components/cards'
import Sidebar from '../components/sidebar'
// import { useSocket } from '../context/SocketProvider'
import { useGlobalContext } from '../context/globalContext'
import Login from '../components/login'
import SidePopup from '../components/sidePopup'
import Register from '../components/signup'

import React from 'react'

const Dashboard = () => {
  // const { createNewMeeting, checkUser } = useSocket()

  const { isSigninClicked, isOpen, setOpen } = useGlobalContext()
  


  return (
    <>
      <NavBar></NavBar>
      <div className='flex z-1'>
        <Cards></Cards>
        <Sidebar></Sidebar>
      </div>

      {/* <button
        className='btn btn-primary'
        onClick={() => {
          createNewMeeting()
        }}
      >
        Create meet
      </button> */}

      {/* <WebRTC />
      <input
        className='input input-bordered'
        type='text'
        onChange={(e) => {
          setEnteredID(e.target.value)
        }}
      />
      <button className='btn btn-primary' onClick={startMeet}>
        Join room
      </button> */}

      {/* <Meet /> */}

      {/* {meet ? (
        <MeetRoom />
      ) : (
        <button
          className='btn btn-natural'
          onClick={() => {
            setMeet(true)
          }}
        >
          Create meet
        </button>
      )} */}

      {/* <ChatRoom></ChatRoom> */}
      {/* <Login /> */}

      <SidePopup isOpen={isOpen}>
        <div className='w-full mt-10'>
          {isSigninClicked ? (
            <div className='w-full'>
              <Login handlePopup={setOpen} goBack={() => setOpen(false)} />
            </div>
          ) : (
            <div className='w-full'>
              <Register goBack={() => setOpen(false)} />
            </div>
          )}
        </div>
      </SidePopup>
    </>
  )
}

export default Dashboard
