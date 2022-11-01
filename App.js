import React from 'react'

import { enableLatestRenderer } from 'react-native-maps'
import { View, StatusBar, StyleSheet } from 'react-native'

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import Navigator from '~/app'
import OrdersProvider from '~/context'
import { surfaceColor } from '~/theme/colors'

enableLatestRenderer()

if (!__DEV__) {
  console.log = () => {}
}

const App = () => {
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <OrdersProvider>
        <Navigator />
      </OrdersProvider>
    </SafeAreaProvider>
  )
}

export default App

const CustomStatusBar = () => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.statusbar,
        {
          height: insets.top,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={surfaceColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: surfaceColor,
  },
})
