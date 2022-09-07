// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableSupplier from 'src/views/tables/TableSupplier'
import AddSupplier from 'src/views/form/add/AddSupplier'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.supplier.findMany()

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
            <CardHeader title='Data Supplier' titleTypographyProps={{ variant: 'h6' }} />
            <AddSupplier></AddSupplier>
          </Box>
          <TableSupplier data={data}></TableSupplier>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
