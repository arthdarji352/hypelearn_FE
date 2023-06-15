import React, { useContext } from 'react'




const SocketContext = React.createContext()


export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {
  // const [socket, setSocket] = useState()




  // useEffect(() => {
  //   const { token } = AuthObject.getToken();
  //   console.log("token", token, user)
  //   if (token) { //for user authentication
  //     let email = user.email
  //   const newSocket = io(socketURL, {
  //     transports: ['websocket'],
  //     query: { email },
  //   })
  //   setSocket(newSocket)
  //   return () => newSocket.close()
  //   }

  // }, [user]);
  

  // const createSocket = () => {
  //   let email = user.email
  //   const newSocket = io(socketURL, {
  //     transports: ['websocket'],
  //     query: { email },
  //   })
  //   setSocket(newSocket)
  //   return () => newSocket.close()
  // }

  return (
    <SocketContext.Provider value={{  }}>
      {children}
    </SocketContext.Provider>
  )
}
