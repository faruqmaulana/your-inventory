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


const rows = [
  {
    stock: 27,
    date: '09/27/2018',
    name: 'Sally Quinn',
  },
  {
    stock: 61,
    date: '09/23/2016',
    name: 'Margaret Bowers',
  },
  {
    stock: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
  },
  {
    stock: 30,
    date: '06/12/2018',
    name: 'Ralph Leonard',
  },
  {
    stock: 66,
    date: '03/24/2018',
    name: 'Annie Martin',
  },
  {
    stock: 33,
    date: '08/25/2017',
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
              <TableCell>Tanggal</TableCell>
              <TableCell>Barang</TableCell>
              <TableCell>Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.date}</Typography>
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell>
                  <Box sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: '10px',
                    textAlign: 'center'
                  }}>
                    {row.stock}
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
