// ** React Imports
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Delete, PencilCircle } from 'mdi-material-ui'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'id', minWidth: 170, label: 'No Transaksi' },
  { id: 'name', minWidth: 170, label: 'Tanggal Keluar', align: 'center' },
  { id: 'stock', minWidth: 170, label: 'Nama Barang', align: 'center' },
  { id: 'satuan', minWidth: 170, label: 'Jumlah Keluar', align: 'center' },
  { id: 'user', minWidth: 170, label: 'User', align: 'center' },
  { id: 'aksi', label: 'Aksi', align: 'center' },
]

const TableExitItems = ({ data }) => {

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  function deleteHandler(id) {
    Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Data akan dihapus secara permanen!",
      icon: 'warning',
      iconColor: '#9155fd',
      showCancelButton: true,
      confirmButtonColor: '#312D4B',
      cancelButtonColor: '#9155fd',
      confirmButtonText: 'Iya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const result = await axios.delete(`/api/delete/${router.asPath + id}`, id);
            Swal.fire({
              icon: "success",
              title: result.data.message,
              showConfirmButton: false,
              timer: 1800,
            });

            setTimeout(() => {
              router.replace(router.asPath);
            }, 1800);

          } catch (error) {
            console.log(error)
            Swal.fire({
              icon: "error",
              title: 'Gagal menghapus data!',
              text: 'Data yang anda hapus memiliki relasi dengan data lain, hapus data terkait untuk melanjutkan!',
            });
          }
        })()
      }
    })
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.label} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (
                rowsPerPage > 0
                  ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : data
              ).map((item, i) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={item.id}>
                    <TableCell>
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      {item.id}
                    </TableCell>
                    <TableCell align='center'>
                      {item.date}
                    </TableCell>
                    <TableCell align='center'>
                      {item.goods.name}
                    </TableCell>
                    <TableCell align='center'>
                      {item.amount_out}
                    </TableCell>
                    <TableCell align='center'>
                      {item.user.role}
                      <span style={{ display: 'block' }}>
                        {item.user.name}
                      </span>
                    </TableCell>
                    <TableCell align='center'>
                      <Delete onClick={() => { deleteHandler(item.id) }} sx={{ ":hover": { cursor: 'pointer', color: 'red' } }} />
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableExitItems
