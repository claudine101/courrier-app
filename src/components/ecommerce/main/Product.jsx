import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
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

export default function Product({ product, index, totalLength, fixMargins = false, onRemove }) {
          const [wishlist, setWishlist] = useState(false)
          const navigation = useNavigation()
          const { width } = useWindowDimensions()
          const PRODUCT_MARGIN = 10
          const PRODUCT_WIDTH = (width / 2) - (PRODUCT_MARGIN * 2)
          const PRODUCT_HEIGHT = 300
          const additionStyles = {
                    width: PRODUCT_WIDTH,
                    height: PRODUCT_HEIGHT,
                    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
          }
          const modalizeRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const onCartPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

          const addwishlist = async () => {
                    try {
                              const form = new FormData()
                              const newWishlist = await fetchApi(`/ecommerce/ecommerce_wishlist_produit/${product.produit.ID_PRODUIT}`, {
                                        method: 'PUT',
                              })
                    } catch (error) {
                              console.log(error)
                    }
          }
          const onCloseAddToCart = () => {
                    modalizeRef.current?.close()
          }
          const productInCart = useSelector(ecommerceProductSelector(product.produit.ID_PRODUIT))

          useEffect(() => {
                    if (product.produit.ID_WISHLIST) {
                              setWishlist(true)
                    }
          }, [])
          useEffect(() => {
                    if (isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])

          return (
                    <TouchableWithoutFeedback onPress={() => navigation.push('ProductDetailsScreen', { product: product, SERVICE: 1 })}>
                              <View key={index} style={[styles.product, additionStyles]}>
                                        <View style={styles.imageCard}>
                                                  <Image source={{ uri: product.produit.IMAGE }} style={styles.image} />
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                                  <TouchableOpacity
                                                            onPress={() => {
                                                                      addwishlist()
                                                                      setWishlist(b => !b)
                                                            }}
                                                  >
                                                            <View style={styles.cardLike}>
                                                                      {wishlist ? <AntDesign name="heart" size={24} color="#F29558" /> : <AntDesign name="hearto" size={24} color="#F29558" />}
                                                            </View>
                                                  </TouchableOpacity>

                                                  <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
                                                            <>
                                                                      <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                      {productInCart ? <View style={styles.badge}>
                                                                                <Text style={styles.badgeText} numberOfLines={1}>{productInCart.QUANTITE}</Text>
                                                                      </View> : null}
                                                            </>
                                                  </TouchableOpacity>
                                        </View>
                                        <Text numberOfLines={2} style={styles.productName}> {product.produit.NOM}</Text>
                                        <Text numberOfLines={1} style={styles.partenaireNom}> {product.partenaire.NOM_ORGANISATION}</Text>
                                        <View style={styles.productFooter}>
                                                  {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>
                                                            {product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU
                                                  </Text> : null}
                                                  {product.produit.AVG ? <View style={styles.producmoyenne}>
                                                            <AntDesign name="star" size={15} color={COLORS.primary} style={{ marginRight: 2 }} />
                                                            <Text numberOfLines={2} style={styles.productnotes} >
                                                                      {parseFloat(product.produit.AVG).toFixed(1)}
                                                            </Text>
                                                  </View> : null}
                                        </View>

                                        <Portal>
                                                  <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                                            <Modalize
                                                                      ref={modalizeRef}
                                                                      adjustToContentHeight
                                                                      handlePosition='inside'
                                                                      modalStyle={{
                                                                                borderTopRightRadius: 10,
                                                                                borderTopLeftRadius: 10,
                                                                                paddingVertical: 20
                                                                      }}
                                                                      handleStyle={{ marginTop: 10 }}
                                                                      scrollViewProps={{
                                                                                keyboardShouldPersistTaps: "handled"
                                                                      }}
                                                                      onClosed={() => {
                                                                                setIsOpen(false)
                                                                                setLoadingForm(true)
                                                                      }}
                                                            >
                                                                      <AddCart
                                                                                product={product}
                                                                                loadingForm={loadingForm}
                                                                                onClose={onCloseAddToCart}
                                                                      />
                                                            </Modalize>
                                                  </GestureHandlerRootView>
                                        </Portal>
                              </View>
                    </TouchableWithoutFeedback>
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 240,
                    backgroundColor: 'white',
                    elevation: 5,
                    shadowColor: '#919191',
                    borderRadius: 10,
                    padding: 5,
                    marginTop: 10
          },
          producmoyenne: {
                    flexDirection: "row",
                    alignItems: 'center'
          },
          productnotes: {
                    color: COLORS.primary,
                    fontSize: 12
          },
          partenaireNom: {
                    fontSize: 10,
                    color: COLORS.primary,
          },
          productFooter: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 6,
                    width: '100%',
                    marginLeft: 5
          },
          imageCard: {
                    borderRadius: 8,
                    height: "55%",
                    width: "100%"
          },
          image: {
                    height: "100%",
                    width: "100%",
                    borderRadius: 8,
                    resizeMode: 'contain'
          },
          cardLike: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          cartBtn: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    paddingHorizontal: 5,
                    borderRadius: 20,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: "bold"
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "400",
                    fontSize: 13
          }
})