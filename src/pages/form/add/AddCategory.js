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
import { InputAdornment, TextField } from '@mui/material';
import { Account, HomeEdit, Phone, Close } from 'mdi-material-ui';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  paddingRight: 10,
  paddingLeft: 10,
  paddingBottom: 10,
};

export default function AddCategory() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    name: '',
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setOpen(false);
    try {
      const result = await axios.post("/api/add/category", state);
      setState({
        name: '',
      });
      Swal.fire({
        icon: "success",
        title: result.data.message,
        text: `${result.data.data.name} berhasil ditambahkan kedalam jenis barang`,

      });

      setTimeout(() => {
        router.replace(router.asPath);
      }, 1800);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: 'Gagal menambahkan data!',
        text: `Kategori ${state.name} sudah ada.`,
        showConfirmButton: true,
      }).then((confirm) => {
        if (confirm.isConfirmed) {
          setOpen(true);
        }
      });
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ bgcolor: 'primary.main', color: 'white', marginRight: 3, ":hover": { bgcolor: 'primary.dark' } }}>+ Tambah Data Supplier</Button>
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
          <Box sx={style}>
            <Box sx={{ display: 'flex', justifyContent: 'end', paddingTop: 5, marginBottom: 5 }}>
              <Close onClick={handleClose} sx={{ color: 'error.main', ":hover": { cursor: 'pointer' } }} />
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                autoFocus
                value={state.name}
                onChange={handleChange}
                name="name"
                style={{ marginBottom: 20 }}
                fullWidth
                label='Jenis Barang'
                placeholder='Jenis Barang'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Account />
                    </InputAdornment>
                  )
                }}
              />
              <Button type='submit' variant='contained' size='large'>
                Tambah
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div >
  );
}
