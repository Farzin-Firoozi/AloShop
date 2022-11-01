import React, { useCallback } from 'react'

import { useNavigation } from '@react-navigation/native'
import { FlatList, StyleSheet, View } from 'react-native'

import categories from '~/mock/categories'
import { primaryColor, spacing } from '~/theme/colors'

import CategoryItem from './categoryItem'
import Header from '~/components/header'
import Spacing from '~/components/spacing'

const CategoriesPage = () => {
  const navigation = useNavigation()

  const navigateToProducts = (categoryItem) => {
    navigation.navigate('Products', {
      category: categoryItem,
    })
  }

  const renderItem = useCallback(({ item, index }) => {
    const isEven = index % 2 === 0
    return (
      <View
        style={[
          styles.flex,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            marginLeft: isEven ? 0 : spacing / 2,
            marginRight: !isEven ? 0 : spacing / 2,
          },
        ]}
      >
        <CategoryItem
          title={item.title}
          icon={item.icon}
          onPress={() => navigateToProducts(item)}
        />
      </View>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const keyExtractor = useCallback((item) => {
    return `${item.id}`
  }, [])

  return (
    <View style={styles.flex}>
      <Header title="Categories" />

      <FlatList
        numColumns={2}
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Spacing}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  )
}

export default CategoriesPage

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    padding: spacing,
  },
  flatlist: {
    padding: spacing,
  },
})
