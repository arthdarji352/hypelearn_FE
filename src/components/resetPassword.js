import React, { useState, useContext } from "react"
import { useGlobalContext } from "../context/globalContext"
import showToast from "../services/toasterService"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import { OutlinedInput, Button, Container, Typography, Stack } from "@mui/material"
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"
import AuthContext from "../context/auth/authContext"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"

const ResetPassword = () => {
  const { setIsResetpassword } = useGlobalContext()
  const { resetPassword } = useContext(AuthContext);
  const [resetEmail, setResetEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = () => {
    const emailCheck =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    console.log("email", resetEmail)
    if (resetEmail && emailCheck.test(resetEmail)) {
      console.log("email", resetEmail)
      resetPassword({
        body: {
          email: resetEmail,
        },
        setData: (data) => {
          setResetEmail("")
          setIsResetpassword(false)
          showToast("warning", "Email Sent Successfully")
        },
        setLoading: setIsLoading,
        setError: (error) => {
          if (error) {
            console.log(error)
            showToast("error", error.response)
          }
        },
      })
    } else {
      showToast("error", "Email is incorrect")
    }
  }

  return (
    <>
     
        <Container>
        <Button
            variant="Rounded"
            onClick={() => setIsResetpassword(false)}
            startIcon={<ArrowBackIosNewRoundedIcon />}
          >
            Back
          </Button>
        
          <Typography variant="h5" fontWeight={'500'} align="center" marginY={4}>Reset Password</Typography>

          <Stack spacing={0}>
          <FormControl variant="outlined" fullWidth={true} sx={{my:2}}>
            <InputLabel htmlFor="forEmail">Enter Email</InputLabel>
            <OutlinedInput
              id="forEmail"
              type="text"
              fullWidth={true}
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              label="Enter Email"
            />
          </FormControl>

          

          {isLoading ? (
            <div className="btn btn-primary">Loading</div>
          ) : (
            <Button
            variant="outlined"
            endIcon={<ArrowForwardRoundedIcon />}
            fullWidth={true}
            onClick={handleResetPassword}
          >
            Send Email
          </Button>
          )}
          </Stack>
        
        </Container>
     
    </>
  )
}

export default ResetPassword
