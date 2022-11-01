import React, { useCallback } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

import Header from '~/components/header'
import Spacing from '~/components/spacing'

import { useOrders } from '~/context'
import { primaryColor, spacing } from '~/theme/colors'

import OrderItem from './orderItem'

const OrdersPage = () => {
  const { data } = useOrders()

  const renderItem = useCallback(({ item }) => {
    return <OrderItem order={item} />
  }, [])

  const keyExtractor = useCallback((item) => {
    return `${item.id}`
  }, [])

  return (
    <View style={styles.root}>
      <Header title="Orders" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatlist}
        ItemSeparatorComponent={Spacing}
      />
    </View>
  )
}

export default OrdersPage

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
})
