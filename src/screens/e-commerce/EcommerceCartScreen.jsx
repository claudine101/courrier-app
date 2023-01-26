import React from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import ProductCart from "../../components/ecommerce/main/ProductCart";
import { ecommerceCartSelector } from "../../store/selectors/ecommerceCartSelectors";
import { AntDesign, Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import LottieView from 'lottie-react-native';
import { useState } from "react";
import Product from "../../components/ecommerce/main/Product";
import { useEffect } from "react";
import fetchApi, { API_URL } from "../../helpers/fetchApi";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { useRef } from "react";
import ServicesIDS from "../../constants/ServicesIDS";

export default function EcommerceCartScreen() {
          const products = useSelector(ecommerceCartSelector)
          const navigation = useNavigation()

          const [recommndations, setRecomandations] = useState([])
          const [loadingProducts, setLoadingProducts] = useState(false)

          const getAmount = useCallback(() => {
                    var total = 0
                    products.forEach(product => {
                              total += parseInt(product.combinaison.PRIX) * product.QUANTITE
                    })
                    return total
          }, [products])

          const getElements = useCallback(() => {
                    var elements = 0
                    products.forEach(product => {
                              elements += parseInt(product.QUANTITE)
                    })
                    return elements
          }, [products])
          useEffect(() => {
                    (async () => {
                              if(products.length == 0) {
                                        try {
                                                  setLoadingProducts(true)
                                                  var url = "/products"
                                                  const produits = await fetchApi(url)
                                                  setRecomandations(produits.result)
                                        } catch (error) {
                                                  console.log(error)
                                        } finally {
                                                  setLoadingProducts(false)
                                        }
                              }
                    })()
          }, [products])

          if(products.length == 0) {
                    return (
                              <View style={[styles.container, { backgroundColor: '#fff' }]}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} onPress={() => navigation.goBack()}>
                                                            <View style={styles.headerBtn}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}  onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                            <View style={styles.headerBtn}>
                                                                      <Feather name="more-horizontal" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <ScrollView>
                                                  <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
                                                  <Text style={styles.emptyFeedback}>Votre panier est vide</Text>
                                                  {loadingProducts ? <HomeProductsSkeletons wrap /> :
                                                  <>
                                                  <TouchableNativeFeedback
                                                            accessibilityRole="button"
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                                            disabled
                                                  >
                                                            <View style={styles.productsHeader}>
                                                                      <Text style={[styles.title, { fontSize: 16 }]}>Recommandés pour vous</Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={[styles.recommadations]}>
                                                            {recommndations.map((product, index) => {
                                                                      return (
                                                                                <Product
                                                                                          product={product}
                                                                                          index={index}
                                                                                          totalLength={products.length}
                                                                                          key={index}
                                                                                          fixMargins
                                                                                />
                                                                      )
                                                            })}
                                                  </View>
                                                  </>}
                                        </ScrollView>
                              </View>
                    )
          }
          return (
                    <View style={styles.container}>
                              <View style={styles.cardHeader}>
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} onPress={() => navigation.goBack()}>
                                                  <View style={styles.headerBtn}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}  onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                  <View style={styles.headerBtn}>
                                                            <Feather name="more-horizontal" size={24} color="black" />
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <Text style={styles.titlePrincipal}>Mon panier</Text>
                              <View style={styles.products}>
                                        <ScrollView>
                                                  {products.map((product, index) => {
                                                            return (
                                                                      <ProductCart
                                                                                product={product}
                                                                                index={index}
                                                                                key={index}
                                                                      />
                                                            )
                                                  })}
                                        </ScrollView>
                              </View>
                              <View style={styles.cartFooter}>
                                        <View style={styles.cartFooterTotals}>
                                                  <View style={styles.imageAmount}>
                                                            <View style={styles.cartImage}>
                                                                      <Image source={require('../../../assets/images/carts.png')} style={styles.image} />
                                                            </View>
                                                            <View style={styles.cartAmount}>
                                                                      <Text style={styles.amountTitle}>Panier</Text>
                                                                      <Text style={styles.amount}>{ getElements() } élément{getElements() > 1 && 's'}</Text>
                                                            </View>
                                                  </View>
                                                  <View style={styles.prices}>
                                                            <Text style={styles.amountTitle}>{getAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } FBU</Text>
                                                            <Text style={[styles.amount, { textAlign: "right" }]}>Total</Text>
                                                  </View>
                                        </View>
                                        <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
                                                  navigation.navigate("ShippingInfoScreen", { service: ServicesIDS.ecommerce })
                                        }}>
                                                  <Text style={styles.checkoutBtnTitle}>CONTINUER</Text>
                                        </TouchableOpacity>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#F1F1F1',
                    flex: 1
          },
          title: {
                    fontWeight: 'bold',
                    marginVertical: 10,
                    marginTop: 30,
                    fontSize: 20,
                    color: COLORS.ecommercePrimaryColor,
                    paddingHorizontal: 10
          },
          products: {
                    paddingHorizontal: 10
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
          },
          headerBtn: {
                    padding: 10
          },
          titlePrincipal: {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
          },
          menuOpener: {
                    marginTop: 25
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    marginTop: 5,
                    borderRadius: 10
          },
          cartFooter: {
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    width: "100%",
                    padding: 20
          },
          cartFooterTotals: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          },
          imageAmount: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          cartImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    backgroundColor: '#F1F1F1',
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          image: {
                    width: "60%",
                    height: "60%"
          },
          cartAmount: {
                    marginLeft: 10
          },
          amountTitle: {
                    fontWeight: 'bold'
          },
          amount: {
                    color: '#777',
                    fontSize: 15
          },
          checkoutBtn: {
                    paddingVertical: 15,
                    backgroundColor: COLORS.ecommerceOrange,
                    borderRadius: 5,
                    marginTop: 10
          },
          checkoutBtnTitle: {
                    textAlign: "center",
                    color: '#fff',
                    fontWeight: "bold"
          },
          emptyFeedback: {
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    opacity: 0.6,
                    fontSize: 16
          },
          recommadations: {
                    flexDirection: 'row',
                    flexWrap: 'wrap'
          },
})