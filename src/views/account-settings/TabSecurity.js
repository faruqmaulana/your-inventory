// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'

// ** Components Imports
import EditPassword from '../form/edit/EditPassword'

const TabSecurity = ({ props }) => {
  return (
    <CardContent sx={{ paddingBottom: 0 }}>
      <EditPassword props={props} />
    </CardContent>
  )
}

export default TabSecurity
