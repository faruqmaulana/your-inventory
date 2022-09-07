// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableUnit from 'src/views/tables/TableUnit'
import AddUnit from 'src/views/form/add/AddUnit'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.unit.findMany()

  return {
    props: {
      data
    },
  };
}

const TypographyPage = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Data Satuan Barang' titleTypographyProps={{ variant: 'h6' }} />
            <AddUnit></AddUnit>
          </Box>
          <TableUnit data={data}></TableUnit>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
