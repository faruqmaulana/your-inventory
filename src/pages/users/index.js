// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableUsers from 'src/views/tables/TableUsers'
import AddSupplier from 'src/pages/form/add/AddSupplier'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.user.findMany()

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
          <TableUsers data={data}></TableUsers>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
