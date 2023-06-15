import * as React from "react"
import Box from "@mui/material/Box"
// import Paper from "@mui/material/Paper"

// import { styled } from "@mui/material/styles"
import { Grid, Typography, Button, Divider, Container } from "@mui/material"

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }))

export default function Footer() {
  return (
    <Box sx={{ width: "100%", bgcolor: "#202435", height: "80vh" }}>
        <Container maxWidth="lg">
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
          sx={{ color: "#ffff", fontWeight: "bold", mb: 4, mt: 8 }}
        >
          Experience better learning from community.
        </Typography>

        <Button
          variant="contained"
          size="large"
          align="center"
          sx={{ py: 2, px: 5, mb: 8 }}
        >
          Explore Program
        </Button>
        <Divider
          light={true}
          style={{ width: "80%", borderColor: "#3D4566" }}
        />
      </Grid>
      </Container>
    </Box>
  )
}
