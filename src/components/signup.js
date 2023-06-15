import React, { useState } from "react"
// import styles from './login.module.css'
import { useGlobalContext } from "../context/globalContext"
import {
  Grid,
  Typography,
  Button,
  Container,
  Stack,
  OutlinedInput,
} from "@mui/material"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"


import axios from "axios"
// import GoogleLogin from "react-google-login"
import Auth from "../utils/AuthStorage"
import showToast from "../services/toasterService"
import ResetPassword from "./resetPassword"
import { useSocket } from "../context/SocketProvider"

const Index = ({ goBack, closeDrawer }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  })
  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  })

  const [errors, setErrors] = useState([])

  const { setAuthStatus, isResetpassword, setIsResetpassword } =
    useGlobalContext()
  const { createSocket } = useSocket()

  const handleRegister = async () => {
    const errorsArray = []

    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!registerData.email || !emailCheck.test(registerData.email)) {
      errorsArray.push("*Email is incorrect")
    }

    if (!registerData.password || registerData.password.length < 6) {
      errorsArray.push(
        "*Password is incorrect, length must be more than 6 characters"
      )
    }

    if (registerData.password !== registerData.confirmPassword) {
      console.log("*Password does not match")
      errorsArray.push("*Password does not match")
    } else {
      setErrors("")
    }

    setErrors(errorsArray)

    if (!errorsArray.length) {
      setIsLoading(true)
      return axios
        .post(`/api/register`, registerData)
        .then(({ data }) => {
          setIsLoading(false)
          console.log("registration data", data)
          Auth.setToken(data.id, data.token)
          setAuthStatus(true)
          createSocket()
          goBack()
          showToast("success", "Registration Successful")
          console.log("Registration Fetch ------------------")
          return data
        })
        .catch((error) => {
          setIsLoading(false)
          showToast("error", "Server Error")
          console.log(error)
          setErrors("Server Error")
          return error
        })
    }
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
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

          <Typography variant="h5" fontWeight={'500'} align="center" marginY={4}>Register</Typography>

          <Stack spacing={0}>
            <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth={true}>
              <InputLabel htmlFor="forFirstName">First Name</InputLabel>
              <OutlinedInput
                id="forFirstName"
                type="text"
                // fullWidth={true}
                value={registerData.firstName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                label="First Name"
              />
            </FormControl>
            </Grid >
            <Grid item xs={6}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="forLastName">Last Name</InputLabel>
              <OutlinedInput
                id="forFirstName"
                type="text"
                // fullWidth={true}
                value={registerData.lastName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                label="Last Name"
              />
            </FormControl>
            </Grid>
            </Grid>
            <FormControl variant="outlined" sx={{ my: 2 }}>
              <InputLabel htmlFor="forEmail">Email</InputLabel>
              <OutlinedInput
                id="forEmail"
                type="text"
                fullWidth={true}
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
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
                value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl variant="outlined" sx={{mt:2}}>
              <InputLabel htmlFor="forConfirmPassword">Confirm Password</InputLabel>
              <OutlinedInput
                id="forConfirmPassword"
                fullWidth={true}
                type={values.showConfirmPassword ? "text" : "password"}
                value={registerData.confirmPassword}
                  onChange={(e) => {
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Stack>
         

     
       
        
          {!isLoading && (
            <p>
              Forget Password ?{" "}
              <Button onClick={() => setIsResetpassword(true)}>
                Click Here.
              </Button>
            </p>
          )}

          {errors ? <p className="text-red-500">{errors}</p> : null}

          {isLoading ? (
            <Typography className="btn btn-primary">Loading</Typography>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              fullWidth={true}
              onClick={handleRegister}
            >
              Register
            </Button>
          )}

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
