import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import { primaryColor, roundness, spacing, textColor } from '~/theme/colors'

const CategoryItem = ({ title = '', icon = '', onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: icon }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-right" size={16} color={primaryColor} />
      </View>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: roundness,
    overflow: 'hidden',
  },
  imageWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
    padding: spacing * 2,
  },
  image: {
    aspectRatio: 1,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: textColor,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing,
  },
})
