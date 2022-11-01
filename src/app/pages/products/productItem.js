import React from 'react'

import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import {
  spacing,
  roundness,
  textColor,
  primaryColor,
  surfaceColor,
  secondaryColor,
} from '~/theme/colors'

import { formatPrice } from '~/utils'

const ScreenWidth = Dimensions.get('screen').width

const ProductItem = ({ product, onPurchasePress }) => {
  return (
    <View style={styles.root}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={onPurchasePress}
          >
            <Text style={styles.purchaseText}>Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: roundness,
    paddingVertical: spacing,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: textColor,
  },
  price: {
    color: secondaryColor,
  },
  image: {
    aspectRatio: 1,
    width: ScreenWidth * 0.3,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  purchaseButton: {
    borderRadius: roundness,
    paddingHorizontal: spacing,
    paddingVertical: spacing / 2,
    backgroundColor: primaryColor,
  },
  purchaseText: {
    fontWeight: 'bold',
    color: surfaceColor,
  },
})
