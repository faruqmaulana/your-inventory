import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      {settings.mode === 'dark' ? <WeatherSunny /> : <WeatherNight />}
    </IconButton>
  )
}

export default ModeToggler

// import IconButton from '@mui/material/IconButton'

// // ** Icons Imports
// import WeatherNight from 'mdi-material-ui/WeatherNight'
// import WeatherSunny from 'mdi-material-ui/WeatherSunny'
// import { useEffect, useState } from 'react'

// const ModeToggler = props => {
//   // ** Props
//   const { settings, saveSettings } = props
//   const [theme, setTheme] = useState('')
//   const [trigger, setTrigger] = useState('')

//   const handleModeChange = mode => {
//     saveSettings({ ...settings, mode })
//   }

//   const handleModeToggle = () => {
//     if (theme === 'light') {
//       handleModeChange('dark')
//       setTrigger('dark')
//       window.localStorage.setItem('app-theme', 'dark')
//     } else {
//       handleModeChange('light')
//       setTrigger('light')
//       window.localStorage.setItem('app-theme', 'light')
//     }
//   }
//   useEffect(() => {
//     const getTheme = localStorage.getItem('app-theme');
//     if (!getTheme) return setTheme('light')

//     return setTheme(getTheme)
//   }, [trigger])

//   return (
//     <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
//       {theme === 'dark' ? <WeatherSunny /> : <WeatherNight />}
//     </IconButton>
//   )
// }

// export default ModeToggler
