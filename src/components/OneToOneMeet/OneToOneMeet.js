import * as React from "react"
import Box from "@mui/material/Box"
import {
    Button,

  Stack,
  Typography,
} from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"


const slotObj = [
  { day: "Mon", date: "25 Apr", Slots: "2", value: "1" },
  { day: "Tue", date: "26 Apr", Slots: "4", value: "2" },
  { day: "Wed", date: "27 Apr", Slots: "0", value: "3" },
  { day: "Thu", date: "28 Apr", Slots: "1", value: "4" },
  { day: "Fri", date: "29 Apr", Slots: "3", value: "5" },
  { day: "Sat", date: "30 Apr", Slots: "5", value: "6" },
  { day: "Sun", date: "1 Apr", Slots: "2", value: "7" },
  { day: "Mon", date: "2 Apr", Slots: "4", value: "8" },
  { day: "Tue", date: "3 Apr", Slots: "0", value: "9" },
]

const timeObj = [{time:'2:00 PM'}, {time:'3:00 PM'}, {time:'4:00 PM'}, {time:'5:00 PM'}, {time:'6:00 PM'}, {time:'7:00 PM'}]

export default function OneToOneMeet() {
  const [date, setDate] = React.useState()
  const [time, setTime] = React.useState()
 



  const handleDate = (event, newAlignment) => {
    setDate(newAlignment)
  }
  const handleTime = (event, newAlignment) => {
    setTime(newAlignment)
  }

  return (
    <Box
      sx={{
        border: "1px solid #E0E0E0",
        color: "#393939",
        borderRadius: "8px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        padding: 2,
        paddingX: 4,
      }}
    >
      <Typography variant="h6">1:1 Meeting</Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          maxWidth: "100%",
          overflow: "scroll",
          my: 2,
        }}
      >
        <ToggleButtonGroup
          value={date}
          exclusive
          onChange={handleDate}
          aria-label="text alignment"
        >
          {slotObj.map((data) => (
            <ToggleButton
              value={data.value}
              sx={{
                width: "80px",
                height: "80px",
                px: 1,
                py: 0,
                "&.MuiToggleButtonGroup-grouped": {
                  borderRadius: "8px !important",
                  mr: 2,
                  border: "1px solid #BDBDBD !important",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "#fff",
                  border: "1.5px solid #258461 !important",
                },
              }}
            >
              <Stack>
                <Typography align="center" variant="overline">
                  {data.day}
                </Typography>
                <Typography align="center" variant="subtitle1">
                  {data.date}
                </Typography>
                <Typography align="center" variant="caption" color={"#219653"}>
                  {data.Slots} Slots
                </Typography>
              </Stack>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Typography variant="subtitle2" sx={{mt:5}}>Available time slots</Typography>
      <Box sx={{maxWidth: "100%",
          overflow: "scroll",}}>
      <ToggleButtonGroup
        value={time}
        exclusive
        onChange={handleTime}
        aria-label="select time"
        sx={{my:2}}
      >
        {timeObj.map((data) => (
          <ToggleButton
            value={data.time}
            sx={{
              width: "120px",
              height: "40px",
              px: 1,
              py: 0,
              "&.MuiToggleButtonGroup-grouped": {
                borderRadius: "8px !important",
                mr: 2,
                border: "1px solid #BDBDBD !important",
              },
              "&.Mui-selected, &.Mui-selected:hover": {
                backgroundColor: "#fff",
                border: "1.5px solid #258461 !important",
              },
            }}
          >
            <Typography align="center" variant="subtitle1">
              {data.time}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      </Box>
      <Button variant="contained" fullWidth sx={{my:2}}>Book a Session for 25 Apr 2022</Button>
    </Box>
  )
}
