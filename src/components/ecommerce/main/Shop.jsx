import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import AddCart from './AddCart';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ecommerceProductSelector } from '../../../store/selectors/ecommerceCartSelectors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import fetchApi from "../../../helpers/fetchApi";

export default function Shop({ shop, index, totalLength, fixMargins = false }) {
          const [wishlist, setWishlist] = useState(false)
          const [selectedSize, setSelectedSize] = useState(null)
          const navigation = useNavigation()
          const { width } = useWindowDimensions()
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
          const PRODUCT_HEIGHT = 220
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
                    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
          }
          function strUcFirst(a) {
                    return (a + '').charAt(0).toUpperCase() + a.substr(1);
          }
          return (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ShopScreen', { id: shop.ID_PARTENAIRE_SERVICE, shop: shop })}>
                              <View key={index} style={[styles.shop, additionStyles]}>
                                        <View style={styles.imageCard}>
                                                  <Image source={{ uri: shop.LOGO }} style={styles.image} />
                                        </View>
                                        <View style={styles.shopDetail}>
                                                  <Text style={styles.shopName} numberOfLines={2}>
                                                            {strUcFirst(shop.NOM_ORGANISATION.toLowerCase())}
                                                  </Text>
                                        </View>
                                        {shop.categories[0] ? <View style={styles.shopDetail}>
                                                  <Text style={styles.shopCategory} numberOfLines={2}>
                                                  { shop.categories[0].NOM }
                                        </Text>
                                        </View> : null }
                                        <View style={[styles.shopDetail]}>
                                                  <View style={styles.shopFooter}>
                                                            <View style={styles.footerBlock}>
                                                                      <Entypo name="location-pin" size={16} color={COLORS.ecommerceOrange} style={{ marginRight: 2 }} />
                                                                      <Text style={styles.footerText}>
                                                                                {shop.DISTANCE ? shop.DISTANCE.toFixed(1) : null}1.2km
                                                                      </Text>
                                                            </View>
                                                            {shop.note && shop.note.nbre > 0 ? <View style={styles.footerBlock}>
                                                                      <AntDesign name="star" size={15} color={COLORS.ecommerceOrange} style={{ marginRight: 2 }} />
                                                                      <Text style={styles.footerText}>{shop.note.nbre}.1</Text>
                                                            </View> : null}
                                                  </View>
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
          shopFooter: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "flex-end",
                    flex: 1,
          },
          footerBlock: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          footerText: {
                    color: '#777'
          },
          shopDetail: {
                    flex: 1,
                    justifyContent: "center"
          }
})