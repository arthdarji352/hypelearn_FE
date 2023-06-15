/* eslint-disable no-unused-vars */
import * as React from "react"
import { Box, Container, Grid, Typography } from "@mui/material"
import Card from "@mui/material/Card"
// import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
// import Button from "@mui/material/Button"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import OutlinedInput from "@mui/material/OutlinedInput"
// import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
// import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import { makeStyles } from "@material-ui/core"
import clsx from "clsx"

import { useNavigate } from "react-router-dom"
import CourseContext from "../../context/course/courseContext"

const styles = makeStyles((theme) => ({
  root: {
    // height: "auto",
    paddingBottom: "100%",
    display: "block",
    position: "relative",
    // position:"relative",
    // top:0
    // maxHeight:0,
    // minHeight:"372px"
  },
  media: {
    position: "absolute",
    // position: "absolute",
    left: 0,
    top: 0,
    height: "100%", //auto
    // maxWidth:"100%"
    objectFit: "scale-down",
  },
}))
export default function CourseCard() {
  const navigate = useNavigate()
  const { isCourseLoading, allCourses, getAllCourses } = React.useContext(CourseContext);

  const classes = styles()
  const [topic, setTopic] = React.useState("")
  const [type, setType] = React.useState("")
  const [searchField, setSearchField] = React.useState("")
  const [courses, setCourses] = React.useState(allCourses)
  const [topicList, setTopicList] = React.useState("")
  const [toggleDisableTopic, setToggleDisableTopic] = React.useState(true)
  const [filteredCourses, setFilteredCourses] = React.useState(courses)


  React.useEffect(() => {
    getAllCourses()
  },[])
  
  React.useEffect(() => {
    if (allCourses.length > 0) {
      setCourses(allCourses)
      const uniqueTopics = Object.values(
        allCourses.reduce((a, { Category }) => {
          a[Category] = { Category }
          return a
        }, {})
      )
      setTopicList(uniqueTopics)

      console.log("uniqueTopics", uniqueTopics)
    }
  }, [allCourses])

  // const handleFilter = (e, type) => {
  //   if (type === "topicFilter") {
  //     if (e.target.value === "") {
  //       setCourses(allCourses)
  //       setTopic(e.target.value)
  //       setToggleDisableTopic(true)
  //     } else {
  //       setToggleDisableTopic(false)
  //       setTopic(e.target.value)
  //       setCourses(
  //         allCourses.filter((course) => course.Category === e.target.value)
  //       )
  //     }
  //   }

  //   if (type === "typeFilter") {
  //     if (e.target.value === "") {
  //       setCourses(allCourses)
  //       setType(e.target.value)
  //     } else {
  //       setCourses(
  //         allCourses.filter((course) => course.Type === e.target.value)
  //       )
  //       setType(e.target.value)
  //     }
  //   }

  //   if (type === "searchFilter") {
  //     if (e.target.value === "") {
  //       setCourses(allCourses)
  //       setSearchField(e.target.value)
  //     } else {
  //       console.log("searchField", courses, e.target.value.toLowerCase())
  //       const searchCourse = allCourses.filter((data) => {
  //         return (
  //           data.courseName
  //             .toLowerCase()
  //             .includes(e.target.value.toLowerCase()) ||
  //           data.author.toLowerCase().includes(e.target.value.toLowerCase())
  //         )
  //       })
  //       setCourses(searchCourse)
  //       setSearchField(e.target.value)
  //     }
  //   }
  // }

  const handleChange = (e) => {
    setSearchField(e.target.value)
    const searchCourse = allCourses.filter((data) => {
      return (
        data.courseName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.author.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setCourses(searchCourse)
    console.log(courses, e.target.value)
  }

  const handleTopic = (e) => {
    setTopic(e.target.value)

    if (e.target.value === "") {
      setCourses(allCourses)
      setToggleDisableTopic(true)
    } else {
      setToggleDisableTopic(false)
      setCourses(
        allCourses.filter((data) => {
          return data.Category.toLowerCase().includes(
            e.target.value.toLowerCase()
          )
        })
      )
      setFilteredCourses(courses)
    }
  }



  const handleCardOpen = async (data) => {
    console.log("data", data)
    navigate(`/experts-profile/${data._id}`)
    // await selectedCourse(data)
  }
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Educators
        </Typography>
        <Grid container direction={"row"} spacing={3} sx={{ my: 2 }}>
          <Grid item>
            <FormControl sx={{ width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                value={searchField}
                //    sx={{borderRadius:'30px'}}
                size="small"
                placeholder="Search here"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={topic}
                onChange={handleTopic}
                displayEmpty
                size="small"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled={toggleDisableTopic}>
                  <em>Select Topic</em>
                </MenuItem>
                {topicList
                  ? topicList.map((data) => {
                      return (
                        <MenuItem key={data.Category} value={data.Category}>
                          {data.Category}
                        </MenuItem>
                      )
                    })
                  : null}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={type}
                onChange={(e) => handleFilter(e, "typeFilter")}
                displayEmpty
                size="small"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled={true}>
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value={10}>Type 1</MenuItem>
                <MenuItem value={20}>Type 2</MenuItem>
                <MenuItem value={30}>Type 3</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        <Grid sx={{ flexGrow: 1 }} container spacing={8}>
          {isCourseLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            courses.map((data) => (
              <Grid item xs={4} key={data.author}>
                <Box sx={{ maxWidth: 350 }}>
                  <Card
                    onClick={() => handleCardOpen(data)}
                    variant="outlined"
                    sx={{
                      px: 2,
                      pt: 2,
                      "&:hover": {
                        boxShadow:
                          "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Grid item xs={12}>
                      <div className={classes.root}>
                        <CardMedia
                          component={"img"}
                          className={clsx(classes.media)}
                          src={"https://i.pravatar.cc/300"}
                          sx={{ borderRadius: "6%" }}
                        />
                      </div>
                    </Grid>
                    <CardContent>
                      <Typography sx={{ fontWeight: "medium" }}>
                        {data.author}
                      </Typography>
                      <Typography>{data.courseName}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  )
}
