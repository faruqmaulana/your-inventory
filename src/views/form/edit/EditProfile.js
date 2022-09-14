import axios from "axios";
import Swal from "sweetalert2";
import { useState } from 'react';
import { useRouter } from "next/router";

// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function EditProfile({ props }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    id: props.id,
    name: props.name,
    username: props.username,
    email: props.email,
    phone: props.phone,
  })

  async function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    try {
      const result = await axios.put(`/api/update/profile`, state);
      console.log(result)
      Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1800
      });
      setTimeout(() => {
        router.replace(router.asPath);
      }, 1800);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Gagal memperbarui data!',
        text: `Gagal memperbarui data!`,
        showConfirmButton: true,
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          setOpen(true);
        }
      });
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value, });
  };

  const handleReset = () => {
    setState({
      id: props.id,
      name: props.name,
      username: props.username,
      email: props.email,
      phone: props.phone,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={7} sx={{ marginTop: 1, marginBottom: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="username"
              label='Username'
              value={state.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label='Name'
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="email"
              type='email'
              label='Email'
              value={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="phone"
              label='Phone'
              value={state.phone}
              onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' onClick={handleReset} variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form></>)
}