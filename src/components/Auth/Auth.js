import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Input from './Input'

import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux'

import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'

import { signin, signup } from '../../actions/Auth'

const clientId =
  '1014879671333-h0ulanqngmdgqdeqtqog4tbbh01hlh58.apps.googleusercontent.com'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(formData)
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
      setUser(JSON.parse(localStorage.getItem('profile')))
    }
  }

  const [formData, setFormData] = useState(initialState)

  const [showPassword, setShowPassword] = useState(false)

  const [isSignup, setIsSignup] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  const googleSuccess = async (res) => {
    console.log(`LOGIN SUCCESS! Current user: ${res.profileObj}`)
    console.log(res)

    const result = res?.profileObj
    const token = res?.tokenId
    try {
      dispatch({ type: 'AUTH', data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (res) => {
    console.log(`LOGIN FAILED! res: ${res}`)
  }

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: clientId,
        scope: '',
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: 'secondary.main',
          }}
        >
          <LockOpenIcon />
        </Avatar>
        <Typography mb={2} variant="h5">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form
          sx={{
            width: '100%',
            marginTop: 3,
          }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                ></Input>

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {isSignup && (
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Register As
                </FormLabel>
                <RadioGroup
                  sx={{ display: 'flex', flexDirection: 'row' }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="typeOfUser"
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="client"
                    control={<Radio />}
                    label="Client"
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          )}

          <Button
            sx={{ mt: 3, mb: 3 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button
                sx={{ marginBottom: 2 }}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            clientId={clientId}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            isSignedIn={false}
            buttonText="Login"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
