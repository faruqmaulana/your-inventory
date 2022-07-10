// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableIncomingItems from 'src/views/tables/TableIncomingItems'
import AddSupplier from 'src/pages/form/add/AddSupplier'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.incomingItem.findMany({ include: { goods: true, user: true, supplier: true } })

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
          <TableIncomingItems data={data}></TableIncomingItems>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
