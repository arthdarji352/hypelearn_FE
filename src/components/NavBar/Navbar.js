import * as React from "react"
import {useContext} from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import CssBaseline from "@mui/material/CssBaseline"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Button from "@mui/material/Button"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import  AuthContext  from "../../context/auth/authContext"

import Login from "../login"
import SignUp from "../signup"


// const menuId = "primary-search-account-menu"
// const mobileMenuId = "primary-search-account-menu-mobile"
const drawerWidth = 240

function ElevationScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default function NavBar(props) {
  const { authStatus } = useContext(AuthContext);
  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isLogin, setIsLogin] = React.useState()

  // const isMenuOpen = Boolean(anchorEl)
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)


  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null)
  // }

  // const handleMenuClose = () => {
  //   setAnchorEl(null)
  //   handleMobileMenuClose()
  // }

  const toggleDrawer = (open, type) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log('type of drawer', type, type === 'login' ? true : false)
    setIsLogin(type === 'login' ? true : false)
    setIsDrawerOpen(open)
  };

 
  const LoginDrawer = (
    <SwipeableDrawer
      anchor={'right'}
      open={isDrawerOpen}
      onClose={toggleDrawer( false, 'login')}
      onOpen={toggleDrawer( true, 'login')}
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '30%' },
      }}
    >
     <Login closeDrawer={toggleDrawer( false, 'login')}/>
    </SwipeableDrawer>
  )

  const RegisterDrawer = (
    
    <SwipeableDrawer
    anchor={'right'}
    open={isDrawerOpen}
    onClose={toggleDrawer( false, 'signup')}
    onOpen={toggleDrawer( true, 'signup')}
    sx={{
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '30%' },
    }}
  >
   <SignUp closeDrawer={toggleDrawer( false, 'signup')}/>
  </SwipeableDrawer>
  )
 
  const navItemsAuth = [
    { name: "Message", action: "click" },
    { name: "Notification", action: "click" },
    { name: "User", action: "click" },
  ]
  const navItemsNoAuth = [
    { name: "Login", action: toggleDrawer(true, 'login'), variant: 'outlined' },
    { name: "Sign Up", action: toggleDrawer(true, 'signup'), variant: 'contained'},
  ]

  const MenuDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        HypeLearn
      </Typography>
      <Divider />
      <List>
        {authStatus
          ? navItemsAuth.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))
          : navItemsNoAuth.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </Box>
  )
  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <CssBaseline />
      
        <>
        <ElevationScroll {...props}>
          <AppBar color='white' sx={{ borderBottom: 1, borderColor: '#E6E8EA' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block", fontWeight: 'bold' } }}
              >
                HypeLearn
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {authStatus ? navItemsAuth.map((item) => (
                  <Button key={item.name}>{item.name}</Button>
                )) : navItemsNoAuth.map((item) => (
                  <Button key={item.name} variant={item.variant} size='large' onClick={item.action} sx={{mx:1}}>{item.name}</Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          </ElevationScroll>
          <Box>{isLogin ? LoginDrawer : RegisterDrawer}</Box>

          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {MenuDrawer}
            </Drawer>
          </Box>
        </>
      
      <Toolbar />
    </>
  )
}
