const Auth = {
  setToken: (id, token) => {
    // var now = new Date()
    // var time = now.getTime()
    // var expireTime = time + 3600 * 24 * 365 * 1000
    // const futureDate = new Date(expireTime)

    if (process.env.NODE_ENV === 'development') {
      // These two lines are for localhost:3000 development
      localStorage.setItem('hypelearn_user_id', id)
      localStorage.setItem('hypelearn_user_token', token)
    } else if (process.env.NODE_ENV === 'production') {
      localStorage.setItem('hypelearn_user_id', id)
      localStorage.setItem('hypelearn_user_token', token)
    }
  },

  getToken: () => {
    if (process.env.NODE_ENV === 'development') {
      const id = localStorage.getItem('hypelearn_user_id')
      const token = localStorage.getItem('hypelearn_user_token')
      return { id, token }
    } else if (process.env.NODE_ENV === 'production') {
      const id = localStorage.getItem('hypelearn_user_id')
      const token = localStorage.getItem('hypelearn_user_token')
      return { id, token }
    }
  },

  removeToken: () => {
    if (process.env.NODE_ENV === 'development') {
      localStorage.clear()
    } else if (process.env.NODE_ENV === 'production') {
      localStorage.clear()
    }
  },
}

export default Auth
