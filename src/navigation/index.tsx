import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import CoinDetailsScreen from '../screens/CoinDetails'
import CoinExchangeScreen from '../screens/CoinExchange'
import WelcomeScreen from '../screens/Welcome'

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='CoinDetails' component={CoinDetailsScreen} options={{ title: 'Price Data' }} />
      <Stack.Screen name='CoinExchange' component={CoinExchangeScreen} options={{ title: 'Coin Exchange' }} />
      <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  )
}
