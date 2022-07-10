// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Database from 'mdi-material-ui/Database'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import ClipboardTextMultiple from 'mdi-material-ui/ClipboardTextMultiple'
import Account from 'mdi-material-ui/Account'

const salesData = [
  {
    stats: '245k',
    title: 'Total Data Barang',
    color: 'primary',
    icon: <Database sx={{ fontSize: '2.5rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Data Supplier',
    color: 'success',
    icon: <Account sx={{ fontSize: '2.5rem' }} />
  },
  {
    stats: '1.54k',
    color: 'info',
    title: 'Totak Stok Barang',
    icon: <ClipboardTextMultiple sx={{ fontSize: '2.5rem' }} />
  },
  {
    stats: '$88k',
    color: 'warning',
    title: 'Total User',
    icon: <AccountGroup sx={{ fontSize: '2.5rem' }} />
  }
]

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 80,
            height: 80,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='body1'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
