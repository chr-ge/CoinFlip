import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList } from '../../types';

// Screens
import HomeScreen from '../screens/Home';
import PortfolioScreen from '../screens/Portfolio';
import MarketScreen from '../screens/Market';
import RankingsScreen from '../screens/Rankings';
import ProfileScreen from '../screens/Profile';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ color }) => <Entypo name="home" size={30} color={color} /> }}
      />
      <BottomTab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ tabBarIcon: ({ color }) => <AntDesign name="piechart" size={30} color={color} /> }}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketScreen}
        options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="chart-line" size={30} color={color} /> }}
      />
      <BottomTab.Screen
        name="Rankings"
        component={RankingsScreen}
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="leaderboard" size={30} color={color} /> }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={30} color={color} /> }}
      />
    </BottomTab.Navigator>
  );
}
