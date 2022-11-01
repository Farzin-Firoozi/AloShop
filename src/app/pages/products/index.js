/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import Header from '~/components/header'
import Spacing from '~/components/spacing'

import { primaryColor, spacing } from '~/theme/colors'

import ProductItem from './productItem'

const ProductsPage = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const { category } = route.params

  const onPurchasePress = useCallback((product) => {
    navigation.navigate('Address', {
      product,
    })
  }, [])

  const renderItem = useCallback(({ item }) => {
    return (
      <ProductItem
        product={item}
        onPurchasePress={() => onPurchasePress(item)}
      />
    )
  }, [])

  const keyExtractor = useCallback((item) => {
    return `${item.id}`
  }, [])

  return (
    <View style={styles.root}>
      <Header title={category.title} showBack />
      <FlatList
        data={category.products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatlist}
        ItemSeparatorComponent={Spacing}
      />
    </View>
  )
}

export default ProductsPage

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    padding: spacing,
    paddingLeft: 0,
  },
  flatlist: {
    padding: spacing,
  },
  divider: {
    height: spacing,
  },
})
