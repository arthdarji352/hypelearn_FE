import React from 'react'
import { useGoogleLogin } from 'react-google-login'
import Image from 'next/image'
import gmail from '../../assets/gmail.svg'
import styles from './login.module.css'

// refresh token
import { refreshTokenSetup } from '../../utils/refreshToken'

const clientId =
  '723143449413-cue0mmehd3k50irtecdu9ge5eb11r9re.apps.googleusercontent.com'

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj)
    alert(`Logged in successfully welcome ${res.profileObj.name}`)
    refreshTokenSetup(res)
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res)
    alert(`Failed to login. Server Error`)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  })

  return (
    <button onClick={signIn} className={styles.gmailfbBtn}>
      <span className={styles.fagmail}>
        <Image
          src={gmail}
          height='24px'
          width='24px'
          alt='google login'
          className='icon'
        />
      </span>
      Sign in with Google
    </button>
  )
}

export default LoginHooks
