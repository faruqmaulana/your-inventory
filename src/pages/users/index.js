// ** MUI Imports
import { Grid, Card, CardHeader, Box } from '@mui/material'

// ** Demo Components Imports
import TableUsers from 'src/views/tables/TableUsers'
import AddUser from 'src/views/form/add/AddUser'
import prisma from 'src/lib/prisma'
import { authentication } from 'src/utils/authentication'


export function getServerSideProps(context) {
  return authentication(context, async ({ session }) => {
    const data = await prisma.user.findMany()

    return {
      props: {
        data,
        session
      },
    };
  })
}

const TypographyPage = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Data Users' titleTypographyProps={{ variant: 'h6' }} />
            <AddUser></AddUser>
          </Box>
          <TableUsers data={data}></TableUsers>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TypographyPage
