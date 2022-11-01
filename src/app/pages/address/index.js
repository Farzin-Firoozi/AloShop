import React, { useCallback, useRef, useState } from 'react'

import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import {
  spacing,
  roundness,
  primaryColor,
  surfaceColor,
  secondaryColor,
} from '~/theme/colors'
import { useOrders } from '~/context'

const defaultDelta = 0.002
const ScreenWidth = Dimensions.get('window').width

const AddressPage = () => {
  const route = useRoute()
  const navigation = useNavigation()

  const mapRef = useRef(null)
  const { addNewOrder } = useOrders()

  const { product } = route.params

  const [coords, setCoords] = useState({
    latitude: 35.720917765023934,
    longitude: 51.33497167378664,
    latitudeDelta: 0.07915325018470298,
    longitudeDelta: 0.052956864237792445,
  }) // City of Tehran

  const onGoBack = () => {
    if (navigation.canGoBack) {
      navigation.goBack()
    }
  }

  const getMyLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        const newCoords = {
          latitudeDelta: defaultDelta, // used only if region don't have it. iOS works with no issue
          longitudeDelta: defaultDelta, // same goes here
          ...info.coords,
        }

        if (mapRef) {
          mapRef.current.animateToRegion(newCoords, 1000)
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }

  const onChangeComplete = useCallback((newCoords) => {
    setCoords({
      latitudeDelta: defaultDelta,
      longitudeDelta: defaultDelta,
      ...newCoords,
    })
  }, [])

  const onSubmitLocation = () => {
    addNewOrder(product, coords)
    navigation.dispatch(StackActions.popToTop())
    navigation.navigate('Orders')
  }

  return (
    <View style={[styles.fullSize, styles.map]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={[styles.fullSize, { width: ScreenWidth }]}
        initialRegion={coords}
        region={coords}
        onRegionChangeComplete={onChangeComplete}
      />

      <View style={styles.pinView}>
        <Image
          source={{ uri: 'https://img.icons8.com/fluency/344/map-pin.png' }}
          style={styles.pin}
        />
      </View>

      <View style={styles.infoCard}>
        <TouchableOpacity style={styles.backIcon} onPress={onGoBack}>
          <Icon name="arrow-back" color={primaryColor} size={24} />
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Please select your location for the delivery.
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={getMyLocation}
        >
          <Icon name="location-outline" size={24} color={primaryColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmitLocation}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddressPage

const styles = StyleSheet.create({
  map: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullSize: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#39C7A5',
    padding: spacing,
    borderRadius: roundness,
    flex: 1,
    marginLeft: spacing,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: spacing,
    borderRadius: roundness,
    width: ScreenWidth - spacing * 2,
    margin: spacing,
    position: 'absolute',
    top: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    color: secondaryColor,
    flex: 1,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: spacing,
    flexDirection: 'row',
  },
  myLocationButton: {
    backgroundColor: surfaceColor,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing,
  },
  pinView: {
    position: 'absolute',
    paddingBottom: 56,
    zIndex: 100,
  },
  pin: {
    height: 56,
    width: 48,
  },
})
