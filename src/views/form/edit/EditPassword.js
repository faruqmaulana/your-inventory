import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {
  Alert,
  Box,
  CardContent,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'

export default function EditPassword({ props }) {
  const router = useRouter()

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    confirmNewPassword: '',
    showNewPassword: false,
    showCurrentPassword: false,
    showConfirmNewPassword: false,
    alertMessage: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  // Handle New Password
  const handleNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  }

  const handleMouseDownConfirmNewPassword = event => {
    event.preventDefault()
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const state = {
      id: props.id,
      currentPassword: values.currentPassword,
      password: values.newPassword
    }

    if (values.newPassword !== values.confirmNewPassword) return setValues({ ...values, alert: true })
    try {
      const result = await axios.put(`/api/update/password`, state)
      setValues({
        ...values,
        newPassword: '',
        currentPassword: '',
        confirmNewPassword: ''
      })

      Swal.fire({
        icon: 'success',
        title: result.data.message,
        showConfirmButton: false,
        timer: 1800
      })

      setTimeout(() => {
        router.replace(router.asPath)
      }, 1800)
    } catch (error) {
      if (error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal memperbarui data!',
          text: `kata sandi tidak cocok`,
          showConfirmButton: true
        })
      }
      if (error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Data default tidak boleh diubah!',
          showConfirmButton: true
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            {values.alert && (
              <Fade in={values.alert}>
                <Alert
                  severity='error'
                  sx={{ width: '100%' }}
                  onClose={() => {
                    setValues({ ...values, alert: false })
                  }}
                >
                  New password and confirm password doesn't match!
                </Alert>
              </Fade>
            )}
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
                  <OutlinedInput
                    label='New Password'
                    value={values.newPassword}
                    id='account-settings-new-password'
                    onChange={handleNewPasswordChange('newPassword')}
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          aria-label='toggle password visibility'
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
                  <OutlinedInput
                    label='Confirm New Password'
                    value={values.confirmNewPassword}
                    id='account-settings-confirm-new-password'
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Box>
          <Button variant='contained' type='submit' sx={{ marginRight: 3.5 }}>
            Change Password
          </Button>
        </Box>
      </CardContent>
    </form>
  )
}
