// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableGoods from 'src/views/tables/TableGoods'
import AddGoods from 'src/views/form/add/AddGoods'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.goods.findMany({ include: { category: true, unit: true } })
  const category = await prisma.category.findMany();
  const unit = await prisma.unit.findMany();

  return {
    props: {
      data,
      addGoods: { unit, category }
    },
  };
}

const TypographyPage = ({ data, addGoods }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Data Barang' titleTypographyProps={{ variant: 'h6' }} />
            <AddGoods data={addGoods}></AddGoods>
          </Box>
          <TableGoods data={data}></TableGoods>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
