import React from 'react'

import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  spacing,
  primaryColor,
  surfaceColor,
  secondaryColor,
} from '~/theme/colors'

const convertRoute = (routeName, focused = false) => {
  switch (routeName) {
    case 'Shop':
      return {
        name: 'Shop',
        icon: focused ? 'cart' : 'cart-outline',
      }

    case 'Orders':
      return {
        name: 'Orders',
        icon: focused ? 'ios-list-outline' : 'ios-list-outline',
      }

    default:
      return {
        name: '',
        icon: '',
      }
  }
}

function Tabbar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.root,
        {
          height: 56 + Math.max(insets.bottom, spacing),
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index
        const color = isFocused ? primaryColor : secondaryColor

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={label}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
          >
            <Icon
              name={convertRoute(route.name, isFocused).icon}
              size={24}
              color={color}
            />
            <Text
              style={[
                styles.text,
                {
                  color,
                },
              ]}
            >
              {convertRoute(route.name, isFocused).name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Tabbar

const styles = StyleSheet.create({
  root: {
    backgroundColor: surfaceColor,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 8,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
  },
})
