import React, { useCallback, useState } from "react";
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, ScrollView, TouchableNativeFeedback } from "react-native";
import fetchApi from "../../helpers/fetchApi";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import Product from "../../components/ecommerce/main/Product";
import LottieView from 'lottie-react-native';

export default function EvenementWishlistScreen() {
          const { height } = useWindowDimensions()
          const route = useRoute()
          const [loadingCategories, setLoadingCatagories] = useState(true)
          const [categories, setCategories] = useState([])
          const [selectedCategorie, setSelectedCategorie] = useState(null)


          const [loadingSubCategories, setLoadingSubCategories] = useState(false)
          const [sousCategories, SetSousCategories] = useState([])
          const [selectedsousCategories, setSelectedsousCategories] = useState(null)

          const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
          const [loadingProducts, setLoadingProducts] = useState(false)
          const [products, setProducts] = useState([])
          const [shops, setShops] = useState([])

          const navigation = useNavigation()



          const onCategoryPress = (categorie) => {
                    if (loadingSubCategories || loadingProducts) return false
                    if (categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                              return setSelectedCategorie(null)
                    }
                    setSelectedCategorie(categorie)
                    setSelectedsousCategories(null)
          }

          const selectedItemSousCategories = (souscategorie) => {
                    setSelectedsousCategories(souscategorie)
          }

          const onRemove = useCallback((ID_PRODUIT_PARTENAIRE) => {

                    const newProducts = products.filter(p => p.produit.ID_PRODUIT_PARTENAIRE != ID_PRODUIT_PARTENAIRE)
                    setProducts(newProducts)
          }, [products])

          const fecthProduits = async () => {
                    try {
                              const produits = await fetchApi("/products/wishlist", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })

                              setProducts(produits.result)

                    }
                    catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingCatagories(false)
                    }
          }
          useFocusEffect(useCallback(() => {
                    fecthProduits()
          }, []))

          return (
                    <View style={styles.container}>

                              {products.length != 0 ?
                                        <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>
                                                  {/* <Text style={styles.titlePrincipal}>Liste des sourains</Text>
      <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
        <View style={styles.searchSection}>
          <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
          <TextInput
            style={styles.input}
            placeholder="Recherche..."
          />
        </View>
        <View style={styles.cardRecherche}>
          <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
        </View>
      </View> */}
                                                  <TouchableNativeFeedback
                                                            accessibilityRole="button"
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                                  >
                                                            <View style={styles.productsHeader}>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={styles.products}>
                                                            {products.map((product, index) => {
                                                                      return (
                                                                                <Product
                                                                                          product={product}
                                                                                          index={index}
                                                                                          totalLength={products.length}
                                                                                          key={index}
                                                                                          fixMargins
                                                                                          onRemove={onRemove}
                                                                                />
                                                                      )
                                                            })}
                                                  </View>
                                        </ScrollView> :
                                        <>
                                                  <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
                                                  <Text style={styles.emptyFeedback}>Votre liste des souhaits est vide</Text>

                                        </>
                              }



                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          emptyFeedback: {
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    opacity: 0.6,
                    fontSize: 16
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60
          },
          menuOpener: {
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    marginTop: 5,
                    borderRadius: 10
          },
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          },
          cardOrginal: {
          },
          titlePrincipal: {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
          },

          searchSection: {
                    flexDirection: "row",
                    marginTop: 10,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    backgroundColor: "#D7D9E4",
                    width: "84%",
                    height: 50,
                    paddingHorizontal: 10
          },
          input: {
                    flex: 1,
                    marginLeft: 10
          },
          cardRecherche: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: COLORS.ecommerceRed,
                    marginTop: 8,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },
          DataImageCategorie: {
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: 10,
          },
          cardPhoto1: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          cardPhoto: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    //backgroundColor: "#242F68",
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    fontWeight: 'bold'
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingBottom: 10
          },
})