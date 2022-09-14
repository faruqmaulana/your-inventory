// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import TableMinimumStock from 'src/views/tables/TableMinimumStock'
import TableEntries from 'src/views/tables/TableEntries'
import TableAmountOut from 'src/views/tables/TableAmountOut'
import { Box, Button, Card } from '@mui/material'
import prisma from 'src/lib/prisma'
import { getSession, signIn } from 'next-auth/react'
import { authentication } from 'src/utils/authentication'

export async function getServerSideProps(context) {
  //authentication
  const session = await getSession(context)

  //get count data
  const getGoodsCount = await prisma.goods.findMany()
  const getSupplierCount = await prisma.supplier.count()
  const getUserCount = await prisma.user.count()

  // get stock total 
  const getStockTotal = getGoodsCount.map(data => { return data.stock })
  const stockCount = getStockTotal.reduce((partialSum, a) => partialSum + a, 0);

  const minStock = await prisma.goods.findMany({ where: { stock: 0 }, orderBy: { id: 'desc' }, take: 5 })

  const incomingItems = await prisma.incomingItem.findMany({
    include: { goods: true },
    orderBy: { date: 'desc' },
    take: 5
  })

  const exitItems = await prisma.exitItem.findMany({
    include: { goods: true },
    orderBy: { date: 'desc' },
    take: 5
  })

  const totalCount = {
    goodsCount: getGoodsCount.length,
    supplierCount: getSupplierCount,
    userCount: getUserCount,
    stockCount
  }

  return {
    props: {
      minStock,
      incomingItems,
      exitItems,
      totalCount,
      session
    },
  };
}

const Dashboard = ({ minStock, incomingItems, exitItems, totalCount, session }) => {

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <StatisticsCard data={totalCount} session={session} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card>
            <Box sx={{ fontWeight: '600', padding: '20px', textAlign: 'center', bgcolor: "warning.main", color: '#FFF' }}>
              Stok Barang Minimum
            </Box>
            <TableMinimumStock data={minStock} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card>
            <Box sx={{ fontWeight: '600', padding: '20px', textAlign: 'center', bgcolor: "primary.main", color: '#FFF' }}>
              5 Transaksi Barang Masuk
            </Box>
            <TableEntries data={incomingItems} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card>
            <Box sx={{ fontWeight: '600', padding: '20px', textAlign: 'center', bgcolor: "error.main", color: '#FFF' }}>
              5 Transaksi Barang Keluar
            </Box>
            <TableAmountOut data={exitItems} />
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
