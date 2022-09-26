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

const DashboardTable = ({ data }) => {
  return (
    <Card>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table' sx={{ textAlign: 'center' }}>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell align='center'>Barang</TableCell>
              <TableCell align='center'>Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(exit => (
              <TableRow hover key={exit.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{exit.date}</Typography>
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 500 }}>
                  {exit.goods.name}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      bgcolor: 'error.main',
                      color: 'white',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}
                  >
                    {exit.amount_out}
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
