import React from 'react'
import { StyleSheet, View } from 'react-native'
import { spacing } from '~/theme/colors'

const Spacing = () => {
  return <View style={styles.root} />
}

export default Spacing

const styles = StyleSheet.create({
  root: {
    width: spacing,
    height: spacing,
  },
})
