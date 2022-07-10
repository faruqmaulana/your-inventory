// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

import Link from 'next/link'

const rows = [
  {
    stock: 27,
    name: 'Sally Quinn',
  },
  {
    stock: 61,
    name: 'Margaret Bowers',
  },
  {
    stock: 59,
    name: 'Minnie Roy',
  },
  {
    stock: 30,
    name: 'Ralph Leonard',
  },
  {
    stock: 66,
    name: 'Annie Martin',
  },
  {
    stock: 33,
    name: 'Adeline Day',
  },
]

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table' sx={{ textAlign: 'center' }}>
          <TableHead>
            <TableRow>
              <TableCell>Barang</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Pasok</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                </TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>
                  <Box sx={{
                    bgcolor: 'warning.main',
                    maxWidth: '30px',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    <Link href='#'>
                      <a style={{ color: 'white' }}>
                        +
                      </a>
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
