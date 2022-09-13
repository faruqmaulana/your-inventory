// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import EditProfile from '../form/edit/EditProfile'

const TabAccount = ({ props }) => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  return (
    <CardContent>
      <EditProfile props={props} />
    </CardContent>
  )
}

export default TabAccount
