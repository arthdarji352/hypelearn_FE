import React, { useState, useContext } from "react"
import {

  Typography,
  Button,
  Stack,
  Container,
  OutlinedInput,

} from "@mui/material"
import  {useNavigate} from "react-router-dom"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useGlobalContext } from "../context/globalContext"
import ResetPassword from "./resetPassword"
import "@lottiefiles/lottie-player"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
// import GoogleLogin from "react-google-login"
import AuthContext from "../context/auth/authContext"

const Index = ({ handlePopup, goBack, closeDrawer }) => {
  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [values, setValues] = React.useState({
    showPassword: false,
  })
  const [errors, setErrors] = useState([])

  const {
    isResetpassword,
    setIsResetpassword,
  } = useGlobalContext()

  const handleLogin = async () => {
    // const navigateToLearnerPage = () => {
    //   console.log('router nevigate sussess')
      navigate('/learner-page')
    // }
    Login(loginData, setErrors, setIsLoading);
   

    // console.log("login data", loginData)

    // if (!errors.length) {
    //   setIsLoading(true)
    //   return axios
    //     .post(`${BASE_URL}/api/login`, loginData)
    //     .then(({ data }) => {
    //       setIsLoading(false)
    //       console.log("login data", data)
    //       Auth.setToken(data.id, data.token)
    //       setAuthStatus(true)
    //       setUser(data)
    //       setSelectedEmail(data.email)
    //       userData(data)
    //       createSocket()
    //       navigate('/learner-page');
    //       showToast("success", "Login Successful")
    //       return data
    //     })
    //     .catch((error) => {
    //       setIsLoading(false)
    //       const errorType = error.response.data.error
    //       showToast("error", errorType)
    //       console.log(error.response)
    //       setErrors(errorType)
    //       return error
    //     })
    // }
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // const responseGoogle = async (response) => {
  //   console.log(response)
  //   setIsLoading(true)
  //   await axios
  //     .post(`${BASE_URL}/api/googleLogin`, response)
  //     .then(({ data }) => {
  //       console.log("data", data)
  //       setIsLoading(false)
  //     })
  // }

  return (
    <>
      {!isResetpassword ? (
        <Container>
          <Button
            variant="Rounded"
            onClick={closeDrawer}
            startIcon={<ArrowBackIosNewRoundedIcon />}
          >
            Back
          </Button>
         
            <Typography variant="h5" fontWeight={'500'} align="center" marginY={4}>Login</Typography>

            <Stack spacing={0}>
              <FormControl variant="outlined" sx={{my:2}}>
                <InputLabel htmlFor="forEmail">Email</InputLabel>
                <OutlinedInput
                  id="forEmail"
                  type="text"
                  fullWidth={true}
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  label="email"
                />
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel htmlFor="forPassword">Password</InputLabel>
                <OutlinedInput
                  id="forPassword"
                  fullWidth={true}
                  type={values.showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
                  
              {!isLoading && (
              <Typography>
                Forget Password ?
                <Button onClick={() => setIsResetpassword(true)}>
                  Click Here.
                </Button>
              </Typography>
            )}

              {errors ? <Typography className="text-red-500">{errors}</Typography> : null}

              {isLoading ? (
              
                <lottie-player
                  src="https://assets5.lottiefiles.com/datafiles/LZyeA614QaESwNk/data.json"
                  background="transparent"
                  speed="0.7"
                  style={{ width: "50px", height: "50px;" }}
                  loop
                  autoplay
                />
             
            ) : (
              <Button
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                fullWidth={true}
                onClick={handleLogin}
              >
               LOGIN
              </Button>
            )}

           <Button onClick={()=>navigate('/learner-page')}>navigate</Button>
            </Stack>

            <Typography class="divider my-10">OR</Typography>
            {!isLoading && (
              <>
                {/* <GoogleLogin
                  clientId='223977320406-kceqnicbs63dfi6rup7mvn40m4je0qal.apps.googleusercontent.com'
                  buttonText='Sign in with Google'
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={false}
                  className='w-full rounded-lg'
                /> */}
             </>
            )}
         
        </Container>
      ) : (
        <ResetPassword />
      )}
    </>
  )
}

export default Index
