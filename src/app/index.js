import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Tabbar from '~/components/tabbar'
import { primaryColor, surfaceColor } from '~/theme/colors'

import OrdersPage from './pages/orders'
import AddressPage from './pages/address'
import ProductsPage from './pages/products'
import CategoriesPage from './pages/categories'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Navigator = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: surfaceColor,
          primary: primaryColor,
          card: surfaceColor,
        },
      }}
    >
      <Tab.Navigator
        safeAreaInsets={{ top: 0 }}
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <Tabbar {...props} />}
      >
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Orders" component={OrdersPage} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigator

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Categories"
    >
      <Stack.Screen name="Address" component={AddressPage} />
      <Stack.Screen name="Products" component={ProductsPage} />
      <Stack.Screen name="Categories" component={CategoriesPage} />
    </Stack.Navigator>
  )
}
