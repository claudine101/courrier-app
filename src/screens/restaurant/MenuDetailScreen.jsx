import React, { useEffect, useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, StatusBar } from "react-native"
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import { useDispatch } from "react-redux";
import { restaurantProductSelector } from '../../store/selectors/restaurantCartSelectors';
import { useSelector } from 'react-redux';
import ImageView from "react-native-image-viewing";
import ProductImages from "../../components/ecommerce/details/ProductImages";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from "react";
import AddCart from "../../components/restaurants/main/AddCart";
import useFetch from "../../hooks/useFetch"
import Loading from "../../components/app/Loading";
import HomeMenus from "../../components/restaurants/home/HomeMenus";
import { HomeMenuSkeletons, HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import UserProductRating from "../../components/ecommerce/details/UserProductRating";
import ProductRatings from "../../components/ecommerce/details/ProductRatings";

export default function MenuDetailScreen() {
          const route = useRoute()
          const navigation = useNavigation()
          const [showImageModal, setShowImageModal] = useState(false)

          const { product, SERVICE } = route.params
          const [loadingShopProducts, shopProducts] = useFetch(`/resto/restaurant_menus?partenaireService=${product.produit_partenaire.ID_PARTENAIRE_SERVICE}`)
          const [loadingSimilarProducts, similarProducs] = useFetch(`/resto/restaurant_menus?category=${product.categorie.ID_CATEGORIE_MENU}`)
          const [loadingRatingsOverview, ratingsOverview] = useFetch(`/resto/restaurant_menus_notes/notes?ID_RESTAURANT_MENU=${product.produit.ID_RESTAURANT_MENU}`)
          const modalizeRef = useRef(null)
          const scrollRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const onCartPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

          const onCloseAddToCart = () => {
                    modalizeRef.current?.close()
          }

          var IMAGES = [
                    product.produit_partenaire.IMAGE_1 ? product.produit_partenaire.IMAGE_1 : undefined,
                    product.produit_partenaire.IMAGE_2 ? product.produit_partenaire.IMAGE_2 : undefined,
                    product.produit_partenaire.IMAGE_3 ? product.produit_partenaire.IMAGE_3 : undefined,
          ]
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
                    <>
                              <View style={{ marginTop: 0, flex: 1 }}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            onPress={() => navigation.goBack()}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={styles.headerBtn}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableNativeFeedback
                                                                      style={{}}
                                                                      background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                                      <View style={styles.headerBtn}>
                                                                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                                      </View>
                                                            </TouchableNativeFeedback>
                                                            <RestaurantBadge />
                                                  </View>
                                        </View>
                                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled ref={scrollRef} keyboardShouldPersistTaps='always'>
                                                  <ProductImages images={IMAGES} />
                                                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
                                                            <View>
                                                                      <TouchableOpacity style={styles.category} >
                                                                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                                                                <Text style={styles.categoryName} numberOfLines={2}>{product.categorie.NOM}</Text>
                                                                      </TouchableOpacity>
                                                                      <View style={styles.productNames}>
                                                                                <Text style={styles.productName}>
                                                                                          {product.produit.NOM}
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.shareBtn}>
                                                                      <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                                                            </View>
                                                  </View>
                                                  {product.produit_partenaire.DESCRIPTION ? <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                            <Text style={styles.productDescription}>{product.produit_partenaire.DESCRIPTION}</Text>
                                                  </View> : null}
                                                  <TouchableNativeFeedback onPress={() => navigation.push('ShopScreen', { id: product.partenaire.ID_PARTENAIRE_SERVICE, shop: product.partenaire })}>
                                                            <View style={styles.shop}>
                                                                      <View style={styles.shopLeft}>
                                                                                <View style={styles.shopIcon}>
                                                                                          {true ? <Entypo name="shop" size={24} color={COLORS.primary} /> :
                                                                                                    <FontAwesome name="user" size={24} color={COLORS.primary} />}
                                                                                </View>
                                                                                <View style={styles.shopOwner}>
                                                                                          <Text style={styles.productSeller}>
                                                                                                    {product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}`}

                                                                                          </Text>
                                                                                          <Text style={styles.shopAdress}>
                                                                                                    {product.partenaire.ADRESSE_COMPLETE ? product.partenaire.ADRESSE_COMPLETE : "Particulier"}
                                                                                          </Text>
                                                                                </View>
                                                                      </View>
                                                            </View>

                                                  </TouchableNativeFeedback>
                                                  {loadingRatingsOverview ? <HomeProductsSkeletons /> :
                                                            <>
                                                                      {ratingsOverview.result.hasCommande ?
                                                                                <UserProductRating userRating={ratingsOverview.result.userNote} productId={product.produit.ID_RESTAURANT_MENU} scrollRef={scrollRef} SERVICE={SERVICE} /> : null}
                                                                      <ProductRatings userRating={ratingsOverview.result} productId={product.produit.ID_RESTAURANT_MENU} SERVICE={SERVICE} />
                                                            </>}

                                                  {loadingSimilarProducts ? <HomeMenuSkeletons /> : <HomeMenus
                                                            menus={similarProducs.result}
                                                            title="Similaires"
                                                            categorie={product.categorie}
                                                            titleStyle={{ fontSize: 14 }}
                                                  />}

                                                  {loadingShopProducts ? <HomeMenuSkeletons /> : <HomeMenus
                                                            menus={shopProducts.result}
                                                            resto={product.partenaire}
                                                            title={`Plus à ${product.partenaire.NOM_ORGANISATION}`}
                                                            categorie={product.categorie}
                                                            shop={product.produit_partenaire}
                                                            titleStyle={{ fontSize: 14 }}
                                                  />}

                                                  {showImageModal &&
                                                            <ImageView
                                                                      images={IMAGES.map(img => ({ uri: img }))}
                                                                      imageIndex={imageIndex}
                                                                      visible={showImageModal}
                                                                      onRequestClose={() => setShowImageModal(false)}
                                                                      swipeToCloseEnabled
                                                                      keyExtractor={(_, index) => index.toString()}
                                                            />
                                                  }

                                        </ScrollView>
                              </View>
                              <View style={styles.productFooter}>
                                        {product.produit_partenaire.PRIX ? <Text style={styles.productPrice}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                        <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress}>
                                                  <>
                                                            <View>
                                                                      <Ionicons name="cart" size={24} color="#fff" />
                                                            </View>
                                                            <Text style={styles.addCartBtnTitle}>
                                                                      Ajouter au panier
                                                            </Text>

                                                  </>
                                        </TouchableOpacity>
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
                                                                      menu={product}
                                                                      loadingForm={loadingForm}
                                                                      onClose={onCloseAddToCart} />
                                                  </Modalize>
                                        </GestureHandlerRootView>
                              </Portal>
                    </>
          )
}
const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#F1F1F1',
          },
          category: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
          },
          categoryName: {
                    fontWeight: "bold",
                    fontSize: 13,
                    color: COLORS.primary,
                    marginLeft: 5
          },
          productNames: {
                    marginTop: 5
          },
          productName: {
                    fontWeight: "bold",
                    fontSize: 18,
                    color: COLORS.ecommercePrimaryColor
          },
          shop: {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingHorizontal: 10,
          },
          shopLeft: {
                    flexDirection: "row",
                    alignItems: 'center'
          },
          shopIcon: {
                    width: 40,
                    height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: "center"

          },
          shopOwner: {
                    marginLeft: 10,
          },
          productSeller: {
                    fontWeight: "bold",
                    color: COLORS.ecommercePrimaryColor,
                    fontSize: 14,
          },
          shopAdress: {
                    color: '#777',
                    fontSize: 13
          },
          shareBtn: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: "#1D8585",
                    backgroundColor: '#D7D9E4',
                    borderRadius: 100
          },
          productDescription: {
                    color: '#777',
                    fontSize: 15,
                    lineHeight: 22
          },
          productFooter: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
          },
          productPrice: {
                    fontWeight: "bold",
                    fontSize: 22
          },
          addCartBtn: {
                    borderRadius: 30,
                    backgroundColor: COLORS.ecommerceOrange,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center"
          },
          addCartBtnTitle: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold'
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    borderRadius: 20,
                    paddingHorizontal: 3,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -10,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: "bold"
          },
          headerBtn: {
                    padding: 10
          }
})
