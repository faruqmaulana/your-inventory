// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}


// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  // ** State
  // const [theme, setTheme] = useState('');


  // const newInitalSettings = { ...initialSettings, mode: theme }
  const [settings, setSettings] = useState({ ...initialSettings })

  // useEffect(() => {
  //   const getTheme = localStorage.getItem('app-theme');
  //   if (!getTheme) return setTheme('light')

  //   return setTheme(getTheme)
  // }, [settings, theme])

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
