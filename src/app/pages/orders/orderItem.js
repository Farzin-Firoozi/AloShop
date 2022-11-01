import React, { useEffect, useState } from 'react'

import MapView, { Marker } from 'react-native-maps'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

import {
  spacing,
  textColor,
  roundness,
  primaryColor,
  surfaceColor,
} from '~/theme/colors'

import { formatPrice } from '~/utils'
import { useOrders } from '~/context'

const ScreenWidth = Dimensions.get('screen').width

const OrderItem = ({ order }) => {
  const { getOrderStatus } = useOrders()
  const [currentStatus, setCurrentStatus] = useState(0)

  useEffect(() => {
    const statusInterval = setInterval(() => {
      const newStatus = getOrderStatus(order.id)
      if (newStatus !== currentStatus) {
        setCurrentStatus(newStatus)
      }
    }, 5000)

    return () => {
      clearInterval(statusInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Image source={{ uri: order.product.image }} style={styles.image} />
          <View>
            <Text style={styles.title}>{order.product.title}</Text>
            <Text style={styles.price}>{formatPrice(order.product.price)}</Text>
          </View>
        </View>

        <OrderStatusBadge status={currentStatus} />
      </View>

      <View pointerEvents="none" style={styles.mapWrapper}>
        <MapView initialRegion={order.location} style={styles.map}>
          <Marker coordinate={order.location} />
        </MapView>
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  root: {
    borderRadius: roundness,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: textColor,
  },
  image: {
    width: ScreenWidth * 0.1,
    aspectRatio: 1,
    marginRight: spacing / 2,
  },
  price: {
    color: primaryColor,
  },
  map: {
    width: '100%',
    aspectRatio: 21 / 9,
  },
  badge: {
    paddingVertical: spacing / 4,
    paddingHorizontal: spacing / 2,
    borderRadius: roundness,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: surfaceColor,
  },
  pending: {
    backgroundColor: 'gray',
  },
  processing: {
    backgroundColor: 'orange',
  },
  delivered: {
    backgroundColor: 'green',
  },
  delivering: {
    backgroundColor: 'blue',
  },
})

const OrderStatusBadge = ({ status = 0 }) => {
  // pending: 0, in-process: 1, delivery: 2, and delivered: 3

  switch (status) {
    case 0:
      return (
        <View style={[styles.badge, styles.pending]}>
          <Text style={styles.badgeText}>Pending</Text>
        </View>
      )

    case 1:
      return (
        <View style={[styles.badge, styles.processing]}>
          <Text style={styles.badgeText}>Processing</Text>
        </View>
      )

    case 2:
      return (
        <View style={[styles.badge, styles.delivering]}>
          <Text style={styles.badgeText}>Delivering</Text>
        </View>
      )

    default:
      return (
        <View style={[styles.badge, styles.delivered]}>
          <Text style={styles.badgeText}>Delivered</Text>
        </View>
      )
  }
}
