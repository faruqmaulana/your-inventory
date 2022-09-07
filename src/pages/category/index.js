// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableCategory from 'src/views/tables/TableCategory'
import AddCategory from 'src/views/form/add/AddCategory'
import prisma from 'src/lib/prisma'


export async function getServerSideProps() {
  const data = await prisma.category.findMany()

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
            <CardHeader title='Data Jenis Barang' titleTypographyProps={{ variant: 'h6' }} />
            <AddCategory></AddCategory>
          </Box>
          <TableCategory data={data}></TableCategory>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
