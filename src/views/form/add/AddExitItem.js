/* eslint-disable react-hooks/exhaustive-deps */
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { useState, useContext, forwardRef, useEffect } from 'react'

import * as React from 'react'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { alert } from 'src/utils/alert'
import { Account, Close } from 'mdi-material-ui'
import { AppContext } from 'src/context/app-context'
import { FormControl, InputAdornment, InputLabel, MenuItem, TextField, Select } from '@mui/material'
import { handleDate } from 'src/utils/handleDate'
import axios from 'axios'

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
  paddingBottom: 10
}

export default function AddExitItems({ data, session }) {
  const context = useContext(AppContext)
  const router = useRouter()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [uiState, setUistate] = useState({
    item: data,
    unit: 'satuan',
    lastStock: 0
  })

  const [state, setState] = useState({
    amount_out: 0,
    stock: '',
    userId: session ? parseInt(session.sub) : 1,
    goodsId: ''
  })

  const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Tanggal Keluar' fullWidth {...props} />
  })

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // parse and set date to payload
    const getDate = handleDate(date)

    const data = {
      ...state,
      date: getDate,
      amount_out: parseInt(state.amount_out),
      stock: uiState.lastStock - parseInt(state.amount_out)
    }
    setOpen(false)
    try {
      const result = await axios.post('/api/add/exitItem', data)
      setState({
        amount_out: '',
        stock: 0,
        userId: session ? parseInt(session.sub) : 1,
        goodsId: ''
      })
      alert('Berhasil menambahkan data', `Transaksi berhasil`, null, false, 1800)
      setTimeout(() => {
        router.replace(router.asPath)
      }, 1800)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal menambahkan data!',
        text: `Transaksi gagal!`,
        showConfirmButton: true
      }).then(confirm => {
        if (confirm.isConfirmed) {
          setOpen(true)
        }
      })
    }
  }

  useEffect(() => {
    const filteredData = uiState.item.filter(el => {
      return el.id === state.goodsId
    })

    if (filteredData.length > 0) {
      setState({ ...state, stock: filteredData[0].stock })
      setUistate({ ...uiState, unit: filteredData[0].unit.name, lastStock: filteredData[0].stock })
    }
  }, [state.goodsId])

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ bgcolor: 'primary.main', color: 'white', marginRight: 3, ':hover': { bgcolor: 'primary.dark' } }}
      >
        + Input Barang Keluar
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='modal-form'>
            <Box sx={{ display: 'flex', justifyContent: 'end', paddingTop: 5, marginBottom: 5 }}>
              <Close onClick={handleClose} sx={{ color: 'error.main', ':hover': { cursor: 'pointer' } }} />
            </Box>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth style={{ marginBottom: 20 }}>
                <DatePickerWrapper>
                  <DatePicker
                    selected={date}
                    showYearDropdown
                    showMonthDropdown
                    id='account-settings-date'
                    placeholderText='MM-DD-YYYY'
                    customInput={<CustomInput />}
                    onChange={date => setDate(date)}
                  />
                </DatePickerWrapper>
              </FormControl>
              <FormControl fullWidth style={{ marginBottom: 20 }}>
                <InputLabel id='demo-simple-select-label'>Barang</InputLabel>
                <Select
                  required
                  name='goodsId'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Barang'
                  value={state.goodsId}
                  onChange={handleChange}
                >
                  {data.map(value => (
                    <MenuItem value={value.id} key={value.id}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                disabled={true}
                required
                value={uiState.lastStock}
                onChange={handleChange}
                name='lastStock'
                style={{ marginBottom: 20 }}
                fullWidth
                type='number'
                label='Stock'
              />
              <TextField
                required
                onChange={handleChange}
                name='amount_out'
                style={{ marginBottom: 20 }}
                value={state.amount_out}
                fullWidth
                min='0'
                type='number'
                label='Jumlah Keluar'
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: uiState.lastStock
                  },
                  endAdornment: <InputAdornment position='end'>{uiState.unit}</InputAdornment>
                }}
              />
              <TextField
                disabled={true}
                required
                value={`${isNaN(uiState.lastStock - parseInt(state.amount_out))
                    ? 0
                    : uiState.lastStock - parseInt(state.amount_out)
                  }`}
                onChange={handleChange}
                name='stock'
                style={{ marginBottom: 20 }}
                fullWidth
                type='number'
                label='Total Stock'
              />
              <Button type='submit' variant='contained' size='large'>
                Tambah
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
