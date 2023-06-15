import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiRes, setApiRes] = useState()
  const [resetPass, setResetPass] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([])

  useEffect(() => {
    var pathArray = window.location.pathname.split('/')
    resetPassCheck(pathArray[pathArray.length - 1])
  }, [])

  const resetPassCheck = async (token) => {
    console.log('token from-----', token)
    const data = { token: token }
    await axios
      .post(`/api/reset-password-check`, data)
      .then(({ data }) => {
        console.log('ResetPassword Fetch ------------------', data)
        setApiRes(data)
        setIsLoading(false)
        return data
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  const resetPassword = async () => {
    const errorsArray = []
    if (resetPass.password !== resetPass.confirmPassword) {
      errorsArray.push('*Password does not match')
      setErrors(errorsArray)
    } else {
      setErrors('')
    }

    const data ={email: apiRes.data.email, password:resetPass.password}

    if(!errors){
      await axios
      .post(`/api/reset-pass-page`, data)
      .then(({ data }) => {
        console.log('ResetPassword Fetch ------------------', data)
        return data
      })
      .catch((error) => {
        console.error(error)
        return error
      })
    }
  }
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className='font-sans antialiased text-gray-600 min-h-full flex flex-col relative'>
          <main className='relative z-10 flex-auto flex items-center justify-center text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-sm'>
              <h1 className='text-center mb-2 text-gray-900 text-sm font-semibold'>
                Reset your HypeLearn password
              </h1>
              <p className='text-center text-sm mb-10'>
                You are resetting password for {apiRes.data.email}
              </p>

              <div className='relative'>
                <div class='form-control'>
                  <label class='label sr-only'>
                    <span class='label-text'>Password</span>
                  </label>
                  <input
                    id='password'
                    x-ref='password'
                    name='password'
                    type='password'
                    required
                  
                    className="input input-bordered"
                    placeholder='Enter new password'
                    value={resetPass.password}
                    onChange={(e) =>
                      setResetPass({ ...resetPass, password: e.target.value })
                    }
                  />
                </div>




                <div class='form-control mt-2'>
                  <label class='label sr-only'>
                    <span class='label-text'>Confire password</span>
                  </label>
                  <input
                     id='confirePassword'
                     x-ref='confirePassword'
                     name='confirePassword'
                     type='password'
                     required
                     
                     className="input input-bordered"
                     placeholder='Confirm you new password'
                     value={resetPass.confirmPassword}
                    onChange={(e) =>
                      setResetPass({ ...resetPass, confirmPassword: e.target.value })
                    }
                  />
                </div>
                
                {errors ? <p className='text-red-500'>{errors}</p> : null}
          
              </div>

              <button
                onClick={resetPassword}
                className='btn btn-primary w-full mt-6'
              >
                Reset your password
              </button>
            </div>
          </main>

          <footer className='relative z-10 flex-none text-sm text-center py-4 px-4 sm:px-6 lg:px-8'>
            <div className='text-gray-900 sm:flex sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
              <p>Don't have an account?</p>
              <a
                href='#Void'
                className='rounded-md border border-gray-300 hover:border-gray-400 py-2 px-10 font-medium flex items-center justify-center'
              >
                Create new
                <svg
                  aria-hidden='true'
                  width='11'
                  height='10'
                  fill='none'
                  className='flex-none ml-1.5'
                >
                  <path
                    d='M5.977 9.639L10.616 5 5.977.362l-.895.89L8.19 4.353H.384v1.292H8.19L5.082 8.754l.895.885z'
                    fill='currentColor'
                  />
                </svg>
              </a>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}

export default ResetPasswordPage
