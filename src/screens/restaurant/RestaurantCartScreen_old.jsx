import React from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import ProductCart from "../../components/ecommerce/main/ProductCart";
import { ecommerceCartSelector } from "../../store/selectors/ecommerceCartSelectors";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import LottieView from 'lottie-react-native';
import { useState } from "react";
import Product from "../../components/ecommerce/main/Product";
import { useEffect } from "react";
import fetchApi from "../../helpers/fetchApi";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { restaurantCartSelector } from "../../store/selectors/restaurantCartSelectors";
import MenuCart from "../../components/restaurants/main/MenuCart_old";
import Menu from "../../components/restaurants/main/Menu";

export default function RestaurantCartScreen() {
          const menus = useSelector(restaurantCartSelector)
          var menuParPartenaire = {}
      const partenaireMenus = []
      menus.forEach(menu => {
            if (menuParPartenaire[menu.ID_PARTENAIRE_SERVICE]) {
                  menuParPartenaire[menu.ID_PARTENAIRE_SERVICE].push(menu)
            }
            else {
                  menuParPartenaire[menu.ID_PARTENAIRE_SERVICE] = [menu]
            }
      })
      for (let key in menuParPartenaire) {
            const MENUS = menuParPartenaire[key]
            partenaireMenus.push({
              MENUS
            })
      }
          const navigation = useNavigation()
          const [recommndations, setRecomandations] = useState([])
          const [loadingProducts, setLoadingProducts] = useState(false)

          const getAmount = useCallback(() => {
                    var total = 0
                    menus.forEach(menu => {
                              total += parseInt(menu.PRIX) * menu.QUANTITE
                    })
                    return total
          }, [menus])

          const getElements = useCallback(() => {
                    var elements = 0
                    menus.forEach(menu => {
                              elements += parseInt(menu.QUANTITE)
                    })
                    return elements
          }, [menus])
          useEffect(() => {
                    (async () => {
                              if(menus.length == 0) {
                                        try {
                                                  setLoadingProducts(true)
                                                  var url = "/resto/menu"
                                                  const menus = await fetchApi(url)
                                                  setRecomandations(menus.result)
                                        } catch (error) {
                                                  console.log(error)
                                        } finally {
                                                  setLoadingProducts(false)
                                        }
                              }
                    })()
          }, [menus])
          if(menus.length == 0) {
                    return (
                              <View style={[styles.container, { backgroundColor: '#fff' }]}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity onPress={() => navigation.goBack()}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </TouchableOpacity>
                                                  <TouchableOpacity style={{  }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor}  />
                                                  </TouchableOpacity>
                                        </View>
                                        <ScrollView>
                                                  <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
                                                  <Text style={styles.emptyFeedback}>Votre panier est vide</Text>
                                                  {loadingProducts ? <HomeProductsSkeletons wrap /> :
                                                  <>
                                                  <TouchableNativeFeedback
                                                            accessibilityRole="button"
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                                  >
                                                            <View style={styles.productsHeader}>
                                                                      <Text style={[styles.title, { fontSize: 16 }]}>Recommandés pour vous</Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={[styles.recommadations]}>
                                                            {recommndations.map((menu, index) => {
                                                                      return (
                                                                                <Menu
                                                                                          menu={menu}
                                                                                          index={index}
                                                                                          totalLength={menus.length}
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
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                                  <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{  }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                  <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor}  />
                                        </TouchableOpacity>
                              </View>
                              <Text style={styles.titlePrincipal}>Mon panier</Text>
                              {/* <View style={styles.products}>
                                        <ScrollView>
                                                  {menus.map((menu, index) => {
                                                            return (
                                                                      <MenuCart
                                                                                menu={menu}
                                                                                index={index}
                                                                                key={index}
                                                                      />
                                                            )
                                                  })}
                                        </ScrollView>
                              </View> */}
                              <View style={styles.products}>
                        <ScrollView>
                              {partenaireMenus.map((partenaire, i) => {
                                    var somme = 0
                                    var element=0
                                    partenaire.MENUS.forEach(menu => {
                                          somme += parseInt(menu.PRIX) * menu.QUANTITE
                                          element=element+menu.QUANTITE
                                    })
                                    const parte = partenaire.MENUS[0].NOM_ORGANISATION
                                    return (
                                          <View style={{ marginTop: 25,backgroundColor: '#F1F1F1',padding:10,borderRadius:10 }}>
                                                <Text style={styles.boutique}>{parte}</Text>
                                                <Text style={styles.somme}>Total : {somme.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text>
                                                <Text style={styles.somme}>Elément : {element} </Text>
                                                {
                                                      partenaire.MENUS.map((menu, index) => {
                                                            return (
                                                                  <MenuCart
                                                                        menu={menu}
                                                                        index={index}
                                                                        key={index}
                                                                  />

                                                            )
                                                      })}
            
                                                <View style={{  marginTop:10,borderRadius:12}}>
                                                {/* backgroundColor: '#F1F1F1' */}

                                                </View>
                                          </View>
                                    )
                              })
                              }
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
                                                            <Text style={styles.amountTitle}>{getAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text>
                                                            <Text style={[styles.amount, { textAlign: "right" }]}>Total</Text>
                                                  </View>
                                        </View>
                                        <TouchableOpacity style={styles.checkoutBtn} onPress={() => {
                                                navigation.navigate("ShippingInfoScreen",{service:2})
                                      }}
                                        >
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
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    padding: 10
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
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