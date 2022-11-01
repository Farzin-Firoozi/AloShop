import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { primaryColor, spacing, textColor } from '~/theme/colors'
import Icon from 'react-native-vector-icons/Ionicons'

const Header = ({ showBack = false, title = '' }) => {
  const navigation = useNavigation()

  const onGoBack = () => {
    if (navigation.canGoBack) {
      navigation.goBack()
    }
  }

  return (
    <View style={styles.root}>
      {!!showBack && (
        <TouchableOpacity onPress={onGoBack} style={styles.backIcon}>
          <Icon name="arrow-back" color={primaryColor} size={24} />
        </TouchableOpacity>
      )}
      {!!title && <Text style={styles.title}>{title}</Text>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  root: {
    padding: spacing,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textColor,
  },
  backIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
