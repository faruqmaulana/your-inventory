// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableBarang from 'src/views/tables/TableBarang'
import AddSupplier from 'src/pages/form/add/AddSupplier'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.goods.findMany({ include: { category: true, unit: true } })

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
          <TableBarang data={data}></TableBarang>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
