import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import { makeStyles } from "@material-ui/core"
import "./ExpertsTab.css"
import { Chip, createStyles, Grid, Stack } from "@mui/material"
import OneToOneMeet from "../OneToOneMeet/OneToOneMeet"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiChip-root": {
        borderRadius: "5px",
      },
    },
  })
)

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function ExpertsTab({course}) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <Typography variant="h6" fontWeight={"medium"}>
                Overview
              </Typography>
            }
            {...a11yProps(0)}
            sx={{ pb: 0, px: 0, mr: 1 }}
          />
          <Tab
            label={
              <Typography variant="h6" fontWeight={"medium"}>
                Ratings
              </Typography>
            }
            {...a11yProps(1)}
            sx={{ pb: 0, px: 0, mx: 1 }}
          />
          <Tab
            label={
              <Typography variant="h6" fontWeight={"medium"}>
                Courses
              </Typography>
            }
            {...a11yProps(2)}
            sx={{ pb: 0, px: 0, mx: 1 }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={6}>
        <Typography variant="subtitle1" color={grey[500]} fontWeight={"medium"}>
          About expert
        </Typography>
        <Typography variant="body1" maxWidth={"550px"} sx={{ pt: 2, pb: 4 }}>
          {course.data.courseName}
        </Typography>
        <Typography
          variant="subtitle1"
          color={grey[500]}
          fontWeight={"medium"}
          sx={{ mb: 1 }}
        >
          Expertice
        </Typography>
        <Stack direction="row" spacing={1} className={classes.root}>
          <Chip
            label="Frontend"
            style={{ backgroundColor: "#B3D4FF", color: "#0747A6" }}
          />
          <Chip
            label="React"
            style={{ backgroundColor: "#C0B6F2", color: "#403294" }}
          />
          <Chip
            label="HTML/CSS"
            style={{ backgroundColor: "#79F2C0", color: "#006644" }}
          />
        </Stack>
        <Typography
          variant="subtitle1"
          color={grey[500]}
          fontWeight={"medium"}
          sx={{ mt: 4, mb: 1 }}
        >
          Fluent in
        </Typography>
        <Stack direction="row" spacing={1} className={classes.root}>
          <Chip
            label="Hindi"
            style={{
              backgroundColor: "#F4F5F7",
              border: "1px solid #E0E0E0",
              color: "#393939",
            }}
          />
          <Chip
            label="English"
            style={{
              backgroundColor: "#F4F5F7",
              border: "1px solid #E0E0E0",
              color: "#393939",
            }}
          />
          <Chip
            label="Gujarati"
            style={{
              backgroundColor: "#F4F5F7",
              border: "1px solid #E0E0E0",
              color: "#393939",
            }}
          />
        </Stack>
        </Grid>
        <Grid item xs={6}>
        <OneToOneMeet />
        </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  )
}
