import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions,TouchableWithoutFeedback, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';

/**
 * composant pour afficher tous les menus
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 24/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function Restaurant({ note, restaurant, restaurants, index, totalLength }) {
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const MAX_WIDTH = 200
  const PRODUCT_MARGIN = 10
  const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
  const PRODUCT_HEIGHT = 200
  const additionStyles = {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    marginLeft: index > 0 ? PRODUCT_MARGIN : 0,
    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : 0
  }
  function strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + a.substr(1);
  }
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ShopScreen', { id: restaurant.ID_PARTENAIRE_SERVICE, shop: restaurant })}>
      <View key={index} style={[styles.shop, additionStyles]}>
        <View style={styles.imageCard}>
          <Image source={{ uri: restaurant.LOGO }} style={styles.image} />
        </View>
        <View style={styles.shopDetail}>
          <Text style={styles.shopName} numberOfLines={2}>
            {strUcFirst(restaurant.NOM_ORGANISATION.toLowerCase())}
          </Text>
        </View>
        <View style={styles.shopDetail}>
          <Text style={styles.shopCategory} numberOfLines={2}>
          Restaurant
          </Text>
        </View> 

        <View style={{ flexDirection: "row", marginHorizontal: -1 }}>
          {restaurant.note ?
            <AntDesign name="staro" size={20} color="#EFC519" /> :
            <AntDesign name="star" size={20} color="#EFC519" />}
          <Text style={{ fontSize: 17, marginLeft: 10, color: "#797E9A", right: 10 }}>{restaurant.note.nbre}.0</Text>
          <Text style={{ fontSize: 17, marginLeft: 10, color: "#797E9A", right: 12, top: -10, fontWeight: "bold" }}>.</Text>
          <Text style={{ fontSize: 17, marginLeft: 10, color: "#797E9A", right: 15 }}>à {restaurant.DISTANCE ? restaurant.DISTANCE.toFixed(1) : null} Km</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  shop: {
    maxWidth: 160,
    marginHorizontal: 5,
    backgroundColor: '#F5F4F1',
    borderRadius: 10,
    padding: 10

  },
  imageCard: {
    height: "55%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    resizeMode: 'contain',


  },
  shopName: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: "bold",
    fontSize: 13,
    textAlign: 'center'
  },
  shopCategory: {
    textAlign: 'center',
    color: '#777',
    fontSize: 12
  },
  shopDetail: {
    flex: 1,
    justifyContent: "center"
  }
})