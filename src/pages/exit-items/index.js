// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableExitItems from 'src/views/tables/TableExitItems'
import AddExitItem from 'src/views/form/add/AddExitItem'
import prisma from 'src/lib/prisma'
import { authentication } from 'src/utils/authentication'


export function getServerSideProps(context) {
  return authentication(context, async ({ session }) => {
    const data = await prisma.exitItem.findMany({ include: { goods: true, user: true } })
    const goods = await prisma.goods.findMany({ include: { unit: true } });

    return {
      props: {
        data,
        goods,
        session
      },
    };
  })
}

const TypographyPage = ({ data, goods, session }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Data Barang Keluar' titleTypographyProps={{ variant: 'h6' }} />
            <AddExitItem data={goods} session={session}></AddExitItem>
          </Box>
          <TableExitItems data={data}></TableExitItems>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
