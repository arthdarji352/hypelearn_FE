import React, { useContext, useState, useReducer } from 'react'

import Auth from '../states/Auth'
import useLocalStorage from '../hooks/useLocalStorage'


const GlobalContext = React.createContext()

export function useGlobalContext() {
  return useContext(GlobalContext)
}

export function GlobalContextProvider({ children }) {
  
  const [authState, authDispatch] = useReducer(Auth.reducer, Auth.initialState)

  const [isSigninClicked, setIsSigninClicked] = useState()
  const [isResetpassword, setIsResetpassword] = useState(false)
  const [selectedEmail, setSelectedEmail] = useLocalStorage('email', '')

  // const [loginLoading, setLoginLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const [openedCourse, setOpenedCourse] = useState();


  const handlePopup = (type) => {
    if (type === 'signIn') {
      setIsSigninClicked(true)
    } else {
      console.log(type)
      setIsSigninClicked(false)
    }
    setOpen(true)
  }

  // const selectedCourse = async (data) => {
  //   console.log('opened course data', data)
  //   return await axios
  //     .post(`/api/get_courses`, data)
  //     .then(({ data }) => {
  //       setOpenedCourse(data)
        
  //       console.log('course name ------------------', data.data.courseName)
  //       return data
  //     })
  //     .catch((error) => {
  //       console.error(error)
     
  //       return error
  //     })

  // }


  const clearState = () => {
    Auth.Actions.resetState(authDispatch)
  }

 

  const userData = (data) => {
    console.log('user data', data)
  }

  // useEffect(() => {
  //   const { token } = AuthObject.getToken()
  //   Auth.Actions.setAuthStatus(token ? true : false, authDispatch)
  //   if (token) {
  //     getUserDetails()
  //     getAllCourses()
  //   }
  // }, [user])

  return (
    <GlobalContext.Provider
      value={{
        setAuthStatus: (status) =>
        Auth.Actions.setAuthStatus(status, authDispatch),
        ...authState,
        handlePopup,
        clearState,
        isOpen,
        isSigninClicked,
        setOpen,
        setIsResetpassword,
        isResetpassword,
        setSelectedEmail,
        selectedEmail,
        // selectedCourse,
        openedCourse,
        setOpenedCourse,
        userData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
