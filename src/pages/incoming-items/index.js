// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableIncomingItems from 'src/views/tables/TableIncomingItems'
import AddIncomingItem from 'src/views/form/add/AddIncomingItem'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.incomingItem.findMany({ include: { goods: true, user: true, supplier: true } })
  const supplier = await prisma.supplier.findMany();
  const goods = await prisma.goods.findMany({ include: { unit: true } });

  return {
    props: {
      data,
      addIncomingItems: { goods, supplier }
    },
  };
}

const TypographyPage = ({ data, addIncomingItems }) => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Data Barang Masuk' titleTypographyProps={{ variant: 'h6' }} />
            <AddIncomingItem data={addIncomingItems}></AddIncomingItem>
          </Box>
          <TableIncomingItems data={data}></TableIncomingItems>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
