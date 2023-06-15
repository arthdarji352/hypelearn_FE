import { Grid, Typography, Button } from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import classes from "./Hero.module.css"
import HeroImage from "../../assets/heroImage.png"
import useResponsive from "../../hooks/useResponsive.ts"

const Hero = () => {
  const breakPoints = useResponsive()
  return (
    <>
      <Container sx={{ pb: 10 }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          //   style={{ minHeight: "100vh" }}
        >
          <Typography
            variant="h4"
            align="center"
            marginTop={breakPoints({ xs: 6, md: 18 })}
            sx={{ fontWeight: "bold" }}
          >
            A <span className={classes.bluecolor}>learning</span> community platform{" "}
            <br />
            for students by students
          </Typography>
          <Button
            variant="contained"
            size="large"
            align="center"
            sx={{ py: 2, px: 5, my: 2 }}
          >
            Explore Program
          </Button>
          <Container maxWidth="md" sx={{ mt: 6 }}>
            <img src={HeroImage} alt="Hero" />
          </Container>
        </Grid>
        {/* <Stack spacing={2}>
        <Typography variant="h3" align="center" sx={{ fontWeight: "bold" }}>
            A <span class={classes.bluecolor}>learning</span> community platform{" "}
            <br />
            for students by students
          </Typography>
          <Button variant="contained" size="large" align="center" sx={{p: 2, px: 6, my: 2}}>
            Explore Program
          </Button>
        </Stack> */}
      </Container>
    </>
  )
}

export default Hero
