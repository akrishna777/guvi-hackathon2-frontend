import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Avatar, Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material'
import Logo from '../assets/BMSLogo.png'
import SidebarList from './SidebarList'
import { NavLink, Route, Routes } from 'react-router-dom'
import Movies from '../Pages/Admin/Movies'
import AddMovie from '../Pages/Admin/AddMovie'
import AddTheater from '../Pages/Admin/AddTheater'

import ViewMovies from '../Pages/Admin/ViewMovies'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth/Auth'
import { useDispatch } from 'react-redux'

import decode from 'jwt-decode'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

// const pages = ['Home', 'All Movies', 'Contact', 'Login', 'Register']

export default function Sidebar() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [loginButton, setLoginButton] = React.useState(true)

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [currentId, setCurrentId] = React.useState(null)

  const selectedMovie = (id) => {
    // const selectedData = movies.filter((movie) => movie._id === id)[0]
    // console.log(selectedData)
    console.log(`This is id inside selected movie`, id)
    setCurrentId(id)
    navigate('/addmovie')
  }

  const selectedMovie2 = (id) => {
    // const selectedData = movies.filter((movie) => movie._id === id)[0]
    // console.log(selectedData)
    console.log(`This is id inside selected movie`, id)
    setCurrentId(id)
    navigate('/addtheater')
  }

  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('profile')),
  )

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    setUser(null)
  }

  React.useEffect(() => {
    const token = user?.token
    // JWT
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
  }, [user])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: '#333545',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Stack>
            <img src={Logo} width={100} height={30} />
          </Stack>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'right',
              justifyContent: 'right',
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              All Movies
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Contact Us
            </Button>
            {!user && (
              <NavLink
                to="/Auth"
                sx={{ textDecoration: 'none', color: 'white' }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    backgroundColor: 'red',
                    display: 'block',
                    marginRight: 1,
                    textDecoration: 'none',
                  }}
                >
                  Login
                </Button>
              </NavLink>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: 'none',
                md: 'flex',
              },
              alignItems: 'right',
              justifyContent: 'right',
            }}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                  </Avatar>
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                  ></Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#333545',
            color: 'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SidebarList />

        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                currentId={currentId}
                setCurrentId={setCurrentId}
                selectedMovie2={selectedMovie2}
              />
            }
          />
          <Route path="/Auth" element={<Auth user setUser />} />
          <Route
            path="/viewmovies"
            element={
              <ViewMovies
                setCurrentId={setCurrentId}
                selectedMovie={selectedMovie}
              />
            }
          />
          <Route
            path="/addmovie"
            element={
              <AddMovie
                currentId={currentId}
                setCurrentId={setCurrentId}
                selectedMovie={selectedMovie}
              />
            }
          />
          <Route
            path="/addtheater"
            element={
              <AddTheater
                currentId={currentId}
                setCurrentId={setCurrentId}
                selectedMovie={selectedMovie}
              />
            }
          />
        </Routes>
      </Main>
    </Box>
  )
}
