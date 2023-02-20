import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, TouchableWithoutFeedback, View } from 'react-native'
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';

/**
 * composant pour afficher tous les menus
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 24/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function Restaurant({ note, restaurant, restaurants, index, totalLength, isMore = true }) {
          const navigation = useNavigation()
          const { width } = useWindowDimensions()
          const MAX_WIDTH = 200
          const PRODUCT_MARGIN = 20
          const PRODUCT_WIDTH = (width) - PRODUCT_MARGIN
          const PRODUCT_HEIGHT = 200
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    // height: PRODUCT_HEIGHT,
                    marginLeft: index == 0 ? 0 : PRODUCT_MARGIN,
                    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : 0,
                    marginTop: isMore ? 10 : 0
          }
          function strUcFirst(a) {
                    return (a + '').charAt(0).toUpperCase() + a.substr(1);
          }
          return (
                    <TouchableNativeFeedback onPress={() => navigation.navigate('ShopScreen', { id: restaurant.ID_PARTENAIRE_SERVICE, shop: restaurant })} useForeground background={TouchableNativeFeedback.Ripple('#ddd')}>
                              <View key={index} style={[styles.shop, additionStyles]}>
                                        <View style={styles.imageCard}>
                                                  <Image source={{ uri: restaurant.BACKGROUND_IMAGE }} style={styles.image} />
                                                  <Image source={{ uri: restaurant.LOGO }} style={styles.logo} />
                                        </View>
                                        <View style={styles.shopDetail}>
                                                  <Text style={styles.shopName} numberOfLines={2}>
                                                            {strUcFirst(restaurant.NOM_ORGANISATION.toLowerCase())}
                                                  </Text>
                                                  <Text style={styles.shopAddress} numberOfLines={2}>
                                                            { restaurant.ADRESSE_COMPLETE }
                                                  </Text>
                                        </View>
                                        <View style={styles.shopFooter}>
                                                  <View style={styles.footerLeft}>
                                                            <View style={styles.footerBlock}>
                                                                      <Entypo name="location-pin" size={16} color={COLORS.primary} style={{ marginRight: 2 }} />
                                                                      <Text style={styles.footerText}>
                                                                                1.2km
                                                                      </Text>
                                                            </View>
                                                            {restaurant.MOYENNE ? <View style={[styles.footerBlock, { marginLeft: 10 }]}>
                                                                      <AntDesign name="star" size={15} color={COLORS.primary} style={{ marginRight: 2 }} />
                                                                      <Text style={styles.footerText}>{parseFloat(restaurant.MOYENNE).toFixed(1)}</Text>
                                                            </View> : null}
                                                  </View>
                                                            <View>
                                                  <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#C4C4C4')}>
                                                                      <View style={styles.followBtn}>
                                                                                <Text style={styles.followBtnText}>+ S'abonner</Text>
                                                                      </View>
                                                  </TouchableNativeFeedback>
                                                            </View>
                                        </View>
                              </View>
                    </TouchableNativeFeedback>
          )
}
const styles = StyleSheet.create({
          shop: {
                    maxWidth: 400,
                    overflow: 'hidden',
                    borderRadius: 10,
                    paddingBottom: 5
          },
          imageCard: {
                    height: 200,
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
          logo: {
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    position: 'absolute',
                    bottom: 10,
                    left: 10
          },
          shopName: {
                    color: '#333',
                    fontWeight: "bold",
                    fontSize: 15,
          },
          shopAddress: {
                    color: COLORS.smallBrown,
                    fontSize: 12
          },
          shopCategory: {
                    textAlign: 'center',
                    color: '#777',
                    fontSize: 12
          },
          shopFooter: {
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    flex: 1,
          },
          footerLeft: {
                    flexDirection: 'row',
                    alignItems: "center",
          },
          footerBlock: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          footerText: {
                    color: COLORS.primary
          },
          shopDetail: {
                    flex: 1,
                    justifyContent: "center",
                    marginTop: 5
          },
          followBtn: {
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    borderRadius: 30,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    overflow: 'hidden'
          },
          followBtnText: {
                    color: '#FFF',
                    fontWeight: 'bold',
                    opacity: 0.8
          }
})