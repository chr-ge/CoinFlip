import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Amplify from 'aws-amplify'

import useCachedResources from './src/hooks/useCachedResources'
import Navigation from './src/navigation'
// @ts-ignore
import config from './src/aws-exports'
import { AppContext } from './src/contexts/AppContext'

Amplify.configure(config)

export default function App() {
  const [userId, setUserId] = useState(null)
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <AppContext.Provider value={{ userId, setUserId }}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    )
  }
}
