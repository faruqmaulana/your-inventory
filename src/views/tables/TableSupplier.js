// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { PencilCircle } from 'mdi-material-ui'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'name', minWidth: 170, label: 'Nama' },
  { id: 'phone', minWidth: 170, label: 'No. Telp', align: 'center' },
  { id: 'address', minWidth: 170, label: 'Alamat', align: 'center' },
  { id: 'aksi', minWidth: 170, label: 'Aksi', align: 'center' },
]

const TableSupplier = ({ data }) => {

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
              ).map((supplier, i) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={supplier.id}>
                    <TableCell>
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      {supplier.name}
                    </TableCell>
                    <TableCell align='center'>
                      {supplier.phone}
                    </TableCell>
                    <TableCell align='center'>
                      {supplier.address}
                    </TableCell>
                    <TableCell align='center' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PencilCircle /> | <PencilCircle />
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

export default TableSupplier
