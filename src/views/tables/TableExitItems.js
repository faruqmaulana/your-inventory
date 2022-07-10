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
  { id: 'id', minWidth: 170, label: 'No Transaksi' },
  { id: 'name', minWidth: 170, label: 'Tanggal Keluar', align: 'center' },
  { id: 'stock', minWidth: 170, label: 'Nama Barang', align: 'center' },
  { id: 'satuan', minWidth: 170, label: 'Jumlah Keluar', align: 'center' },
  { id: 'size', minWidth: 170, label: 'User', align: 'center' },
  { id: 'size', label: 'Aksi', align: 'center' },
]

const TableExitItems = ({ data }) => {
  console.log(data)

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
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PencilCircle /> &nbsp;|&nbsp;<PencilCircle />
                      </span>
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
