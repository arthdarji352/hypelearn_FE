import React, { useEffect, useState } from "react"
import axios from "../../axiosConfig"
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Menu,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded"
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded"
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import ExpertsTab from "../../components/ExpertsTab/ExpertsTab"
import GeneratedID from "../../utils/MeetIdGenerator"
import { useNavigate } from "react-router-dom"

const ExpertsProfile = () => {
  const [opendCourse, setOpendCourse] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const url = window.location.href
    const parts = url.split("/")
    const result = parts[parts.length - 1]
    const callCourse = { _id: result }
    selectedCourse(callCourse)
  }, [])

  const selectedCourse = async (data) => {
    return await axios
      .post(`/api/get_courses`, data)
      .then(({ data }) => {
        console.log("course name ------------------", data.data)
        setOpendCourse(data)
        return data
      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  const handleJoinMeet = (id) => {
    navigate(`/chatRoom/${id}`)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }
  return (
    <>
      <Box
        width={"100%"}
        sx={{
          height: "150px",
          backgroundImage: `url(https://api.lorem.space/image/shoes?w=1500&h=150)`,
          backgroundSize: "cover",
        }}
      >
        <Button
          variant="Rounded"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIosNewRoundedIcon color="white" />}
        ></Button>
      </Box>
      <Container sx={{ mb: 5 }}>
        <Grid container sx={{ mb: 4 }}>
          <Grid container xs={6}>
            <Grid item xs={4}>
              {/* <Avatar
                sx={{
                  width: "150px",
                  height: "150px",
                  marginTop: "-40px",
                  border: "4px solid white",
                }}
              ></Avatar> */}
              <CardMedia
                component={"img"}
                src={"https://i.pravatar.cc/200?img=33"}
                sx={{
                  borderRadius: "50%",
                  width: "180px",
                  height: "180px",
                  marginTop: "-40px",
                  border: "4px solid white",
                }}
              />
            </Grid>
            <Grid xs={8} container marginTop={"20px"} direction={"column"}>
              <Grid item>
                <Typography variant="h5" sx={{ fontWeight: "medium" }}>
                  Ravi Patel
                </Typography>
              </Grid>
              <Grid item>
                <Typography>SDE @ Zelthy</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction={"row-reverse"}
            xs={6}
            spacing={1}
            align="right"
            marginY={"auto"}
          >
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleMenu}
                sx={{
                  px: 0,
                  display: "inline-block",
                  minHeight: 0,
                  minWidth: "40px",
                }}
              >
                <MoreVertRoundedIcon />
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  px: 0,
                  display: "inline-block",
                  minHeight: 0,
                  minWidth: "40px",
                }}
              >
                <FavoriteBorderRoundedIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleDialogOpen}>
                <AddRoundedIcon /> Join Meet
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {opendCourse ? (
          <ExpertsTab course={opendCourse} />
        ) : (
          <Typography>Loading...</Typography>
        )}

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Video Chat</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter Your ID to join video call.
              <Typography variant="h6">Your Id is: {GeneratedID} </Typography>
            </DialogContentText>
            <OutlinedInput id="enterCode" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => handleJoinMeet(GeneratedID)}
            >
              Click To Join Meet
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}

export default ExpertsProfile
