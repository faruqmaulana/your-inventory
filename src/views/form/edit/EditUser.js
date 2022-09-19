import axios from "axios";
import Swal from "sweetalert2";
import { useState } from 'react';
import { useRouter } from "next/router";

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Account, Close, PencilCircle, Phone, EmailOutline } from 'mdi-material-ui';
import { InputAdornment, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  paddingRight: 10,
  paddingLeft: 10,
  paddingBottom: 10,
};

export default function EditUser({ props }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    id: props.id,
    name: props.name,
    username: props.username,
    email: props.email,
    phone: props.phone,
    role: props.role
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value, });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    try {
      const result = await axios.put(`/api/update/${router.asPath}`, state);
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
        text: `${state.name} sudah ada dalam kategori.`,
        showConfirmButton: true,
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          setOpen(true);
        }
      });
    }
  }

  const handleReset = () => {
    setState({
      id: props.id,
      name: props.name,
      username: props.username,
      email: props.email,
      phone: props.phone,
      role: props.role
    })
  }

  return (
    <>
      <PencilCircle onClick={handleOpen} sx={{ ":hover": { color: 'primary.dark', cursor: 'pointer' } }} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='modal-form'>
            <Box sx={{ display: 'flex', justifyContent: 'end', paddingTop: 5, marginBottom: 5 }}>
              <Close onClick={handleClose} sx={{ color: 'error.main', ":hover": { cursor: 'pointer' } }} />
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                required
                value={state.name}
                onChange={handleChange}
                name="name"
                style={{ marginBottom: 20 }}
                fullWidth
                label='Nama User'
                placeholder='Nama'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Account />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                value={state.username}
                onChange={handleChange}
                name="username"
                style={{ marginBottom: 20 }}
                fullWidth
                label='Username'
                placeholder='Username'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Account />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                disabled
                fullWidth
                type='email'
                name="email"
                value={state.email}
                onChange={handleChange}
                style={{ marginBottom: 20 }}
                label='Email'
                placeholder='ex: yaourname@gmail.com'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required
                value={state.phone}
                onChange={handleChange}
                name="phone"
                style={{ marginBottom: 20 }}
                fullWidth
                type='number'
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
              <FormControl fullWidth style={{ marginBottom: 20 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="role"
                  value={state.role}
                  onChange={handleChange}
                >
                  <FormControlLabel value="USER" control={<Radio />} label="User" />
                  <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
              <Button type='submit' variant='contained' size='large'>
                Edit
              </Button>
              <Button
                size='large'
                color='secondary'
                variant='outlined'
                sx={{ marginLeft: 5 }}
                onClick={handleReset}>
                Reset
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
