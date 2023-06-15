import * as React from "react"
import { Box, Grid, Typography } from "@mui/material"
import Container from "@mui/material/Container"
import useResponsive from '../../hooks/useResponsive.ts'


export default function HeroLearner() {
    const breakPoints = useResponsive();

  return (
    <>
      <Box sx={{ bgcolor: "#F6F6F6"}}>
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "80vh" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              paddingX={breakPoints({xs:0, md: 2})}
              justifyContent= {breakPoints({xs:"center", md: "left"})}
              direction="column"
            //   sx={{ pr: 12 }}
              paddingRight= {breakPoints({xs:0, md: 12})}
            //   paddingX= {breakPoints({xs:4, md: 0})}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }} textAlign={breakPoints({xs:"center", md: "left"})}>
                About Learner
              </Typography>
              <Typography paragraph sx={{ fontWeight: "regular" }} textAlign={breakPoints({xs:"center", md: "left"})}>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" paddingX={breakPoints({xs:0, md: 2})} justifyContent="center">
              <Box
                component="img"
                sx={{
                //   height: 500,
                //   width: 500,
                  //   maxHeight: { xs: 400, md: 400 },
                  //   maxWidth: { xs: 400, md: 400 },
                }}
                alt="The house from the offer."
                src="https://via.placeholder.com/500"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
