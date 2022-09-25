import axios from 'axios'
import Swal from 'sweetalert2'

// ** React Imports
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
import { Delete } from 'mdi-material-ui'
import EditSupplier from 'src/views/form/edit/EditSupplier'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'id', minWidth: 170, label: 'ID Barang' },
  { id: 'name', minWidth: 170, label: 'Nama Barang', align: 'center' },
  { id: 'jenis', minWidth: 170, label: 'Jenis Barang', align: 'center' },
  { id: 'stock', minWidth: 170, label: 'Stock', align: 'center' },
  { id: 'satuan', minWidth: 170, label: 'Satuan', align: 'center' },
  { id: 'size', minWidth: 170, label: 'Action', align: 'center' },
]

const TableBarang = ({ data }) => {
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
            Swal.fire({
              icon: "error",
              title: 'Gagal menghapus data!',
              text: 'Barang yang anda hapus memiliki relasi dengan data lain, hapus data terkait untuk melanjutkan!',
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
                      {item.id}
                    </TableCell>
                    <TableCell align='center'>
                      {item.name}
                    </TableCell>
                    <TableCell align='center'>
                      {item.category.name}
                    </TableCell>
                    <TableCell align='center'>
                      {item.stock}
                    </TableCell>
                    <TableCell align='center'>
                      {item.unit.name}
                    </TableCell>
                    <TableCell align='center'>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', minWidth: '5rem' }}>
                        <EditSupplier props={item} />
                        &nbsp; | &nbsp;
                        <Delete onClick={() => { deleteHandler(item.id) }} sx={{ ":hover": { cursor: 'pointer', color: 'red' } }} />
                      </div>
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

export default TableBarang
