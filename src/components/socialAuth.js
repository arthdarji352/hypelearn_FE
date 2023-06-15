import React, { useState } from 'react'
// import OpenRoutes from '../../../services/OpenRoutes'
// import ProtectedRoutes from '../../../services/ProtectedRoutes'
// import Auth from '../../../utils/AuthCookie'
// import { useGlobleContext } from '../../../GlobleContext'
// import { useSnackbar } from 'notistack'
import axiosInstance from '../axiosConfig'


export default function Index({ setLoading, close }) {
  //   const { setAuthStatus, setSubscriberId } = useGlobleContext()
  const [authStatus, setAuthStatus] = useState(false)
  const [subscriberId, setSubscriberId] = useState('')

  //   const { enqueueSnackbar } = useSnackbar()
  //   const showSnackBar = (message, varient) => {
  //     enqueueSnackbar(message, {
  //       variant: varient,
  //     })
  //   }

  function sendToGoogle(data) {
    registerGoogle({
      body: {
        access_token: data.accessToken,
      },
      setData: (resp) => {
        // Auth.setCookies(resp.user, resp.key)
        setSubscriberId(resp.user)
        updateUser({
          full_name: data.displayName,
          mobile: data.phoneNumber,
        })
      },
      setError: (e) => {
        if (e) {
          const errs = e.response.data?.non_field_errors
          errs &&
            errs.forEach((err) => {
              //   showSnackBar(err, 'error')
            })
        }
      },
      setLoading: setLoading,
    })
  }

  const registerGoogle =
    (async) =>
    ({ body, setData, setLoading, setError }) => {
      setLoading(true)
      setError(false)
      return axiosInstance(false)
        .post(`/rest-auth/google/`, body)
        .then(({ data }) => {
          setData(data)
          setLoading(false)
          console.log('Google Register ------------------')
          return data
        })
        .catch((error) => {
          setLoading(false)
          setError(error)
          return error
        })
    }

  function updateUser(data) {
    updateUserInfo({
      body: data,
      setData: (resp) => {
        setAuthStatus(true)
        // showSnackBar('Login Successful', 'success')
        close()
      },
      setLoading: setLoading,
      setError: (e) => {
        if (e) console.log(e)
      },
    })
  }

  const updateUserInfo = async ({ body, setData, setLoading, setError }) => {
    setLoading(true)
    setError(false)
    return axiosInstance()
      .patch(`/rest-auth/user/`, body)
      .then(({ data }) => {
        setData(data)
        setLoading(false)
        console.log('UpdateUserInfo Fetch ------------------')
        return data
      })
      .catch((error) => {
        setLoading(false)
        setError(error)
        return error
      })
  }

  React.useEffect(() => {
    const cb = (resp) => {
      if (resp.data?.sender === 'google-firbase-hypelearn') {
        sendToGoogle(resp.data)
      } else if (resp.data?.sender === 'facebook-firbase-hypelearn') {
        console.log(resp.data)
      }
    }

    window.addEventListener('message', cb)

    return () => {
      window.removeEventListener('message', cb)
    }
  }, [])

  return (
    <iframe
      // src="http://localhost:5500/"
      title='Social Login'
      src={`https://www.ravi.tech/Google-FaceBook-Login/`}
      className='w-full h-44 border-0'
    />
  )
}
