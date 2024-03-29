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

const DashboardTable = ({ data }) => {
  return (
    <Card>
      <TableContainer>
        <Table stickyHeader aria-label='sticky table' sx={{ textAlign: 'center' }}>
          <TableHead>
            <TableRow>
              <TableCell>Barang</TableCell>
              <TableCell align='center'>Stock</TableCell>
              <TableCell align='right'>Pasok</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(minStock => (
              <TableRow hover key={minStock.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{minStock.name}</Typography>
                </TableCell>
                <TableCell align='center'>{minStock.stock}</TableCell>
                <TableCell align='right' style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                  <Box
                    sx={{
                      bgcolor: 'warning.main',
                      width: '30px',
                      borderRadius: '10px',
                      textAlign: 'center'
                    }}
                  >
                    <Link href='#'>
                      <a style={{ color: 'white' }}>
                        <span>+</span>
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
