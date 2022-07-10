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
import { PencilCircle, Delete } from 'mdi-material-ui'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'name', minWidth: 800, label: 'Nama Barang' },
  { id: 'size', label: 'Action', align: 'center' },
]

const TableCategory = ({ data }) => {
  const router = useRouter();

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  function handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            const result = await axios.delete(`/api/delete/category/${id}`, id);
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
            Swal.fire({
              icon: "error",
              title: 'Gagal menghapus data!',
              text: 'Kategori yang anda hapus memiliki relasi dengan data lain, hapus data terkait untuk melanjutkan!',
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
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
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
                      {item.name}
                    </TableCell>
                    <TableCell align='center' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PencilCircle /> &nbsp; | &nbsp;<Delete onClick={() => { handleDelete(item.id) }} sx={{ ":hover": { cursor: 'pointer', color: 'red' } }} />
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

export default TableCategory
