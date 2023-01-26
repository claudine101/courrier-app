import React, { useCallback, useState, useEffect, useRef } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import Product from "../../components/ecommerce/main/Product";
import fetchApi from "../../helpers/fetchApi";
import { useRoute } from "@react-navigation/native";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { Ionicons, AntDesign, MaterialIcons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import CategoriesModalize from "../../components/ecommerce/allProducts/CategoriesModalize";
import ShopsModalize from "../../components/ecommerce/allProducts/ShopsModalize";

export default function AllProductsScreen() {
          const route = useRoute()
          const { category, shop } = route.params

          const [loadingCategories, setLoadingCatagories] = useState(true)
          const [loadingRestos, setLoadingRestos] = useState(true)

          const [categories, setCategories] = useState([])
          const [restos, setRestos] = useState([])

          const [selectedCategory, setSelectedCategory] = useState(category)
          const [selectedResto, setSelectedResto] = useState(shop)

          const categoriesModalizeRef = useRef()
          const restosModalizeRef = useRef()

          const [loadingForm, setLoadingForm] = useState(true)
          const [isOpen, setIsOpen] = useState(false)
          const [isRestoOpen, setIsRestoOpen] = useState(false)

          const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
          const [loadingProducts, setLoadingProducts] = useState(false)
          const [products, setProducts] = useState([])

          const navigation = useNavigation()

          const fecthProduits = async () => {
                    try {
                              const response = await fetchApi("/products/categories", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                              setCategories(response.result)
                    }
                    catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingCatagories(false)
                    }
          }

          const fetchRestos = async () => {
                    try {
                              const response = await fetchApi("/partenaire/ecommerce", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                              setRestos(response.result)
                    }
                    catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingRestos(false)
                    }
          }
          useFocusEffect(useCallback(() => {
                    fecthProduits()
                    fetchRestos()
          }, []))

          useEffect(() => {
                    if (isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
                    if (isRestoOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen, isRestoOpen])

          useEffect(() => {
                    (async () => {
                              try {
                                        if (firstLoadingProducts == false) {
                                                  setLoadingProducts(true)
                                        }
                                        var queries = []
                                        var url = "/products?"
                                        if (selectedCategory) {
                                                  queries.push(`category=${selectedCategory?.ID_CATEGORIE_PRODUIT}`)
                                        }
                                        if (selectedResto) {
                                                  queries.push(`partenaireService=${selectedResto?.ID_PARTENAIRE_SERVICE}`)
                                        }
                                        if(queries.length > 0) {
                                                  url += queries.join('&')
                                        }
                                        const produits = await fetchApi(url)
                                        setProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setFirstLoadingProducts(false)
                                        setLoadingProducts(false)
                              }
                    })()
          }, [selectedCategory, selectedResto])

          return (
                    <>
                    <CategoriesModalize
                              categoriesModalizeRef={categoriesModalizeRef}
                              categories={categories}
                              selectedCategory={selectedCategory}
                              setSelectedCategory={setSelectedCategory}
                              loadingForm={loadingForm}
                              setLoadingForm={setLoadingForm}
                              loadingCategories={loadingCategories}
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                    />
                    <ShopsModalize
                              restosModalizeRef={restosModalizeRef}
                              restos={restos}
                              selectedResto={selectedResto}
                              setSelectedResto={setSelectedResto}
                              loadingForm={loadingForm}
                              setLoadingForm={setLoadingForm}
                              loadingRestos={loadingRestos}
                              isRestoOpen={isRestoOpen}
                              setIsRestoOpen={setIsRestoOpen}
                    />
                    <View style={styles.container}>
                              <View style={styles.cardHeader}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            onPress={() => navigation.goBack()}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={styles.headerBtn}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            onPress={() => navigation.goBack()}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={styles.headerBtn}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <EcommerceBadge />
                                        </View>
                              </View>
                              <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[1]}>
                                        <Text style={styles.titlePrincipal}></Text>
                                        <View>
                                                  <View style={styles.quickFilters}>
                                                            <View style={styles.filterCategoryShop}>
                                                                      <TouchableNativeFeedback useForeground onPress={() => {
                                                                                categoriesModalizeRef.current.open()
                                                                                setIsOpen(true)
                                                                      }}>
                                                                                <View style={styles.quickFilterBtn}>
                                                                                          <View style={styles.quickFilterBtnHeader}>
                                                                                                    <Entypo name="shopping-cart" size={20} color={COLORS.primary} />
                                                                                                    <Text style={styles.quickFilterTitle}>
                                                                                                              {selectedCategory ? selectedCategory.NOM : 'Catégories'}
                                                                                                              <Entypo name="chevron-small-down" size={12} color="#777" />
                                                                                                    </Text>
                                                                                          </View>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                                      <TouchableNativeFeedback useForeground onPress={() => {
                                                                                restosModalizeRef.current.open()
                                                                                setIsRestoOpen(true)
                                                                      }}>
                                                                                <View style={[styles.quickFilterBtn, { marginLeft: 10}]}>
                                                                                          <View style={styles.quickFilterBtnHeader}>
                                                                                                    <Entypo name="shop" size={20} color={COLORS.primary} />
                                                                                                    <Text style={styles.quickFilterTitle}>
                                                                                                              {selectedResto ? selectedResto.NOM_ORGANISATION : 'Restaurants'}
                                                                                                              <Entypo name="chevron-small-down" size={12} color="#777" />
                                                                                                    </Text>
                                                                                          </View>
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            </View>
                                                            <View>
                                                                      <TouchableNativeFeedback useForeground>
                                                                                <View style={styles.filterBtn}>
                                                                                          <SimpleLineIcons name="equalizer" size={24} color={COLORS.primary} style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            </View>
                                                  </View>
                                        </View>
                                        {(loadingProducts || firstLoadingProducts) ? <HomeProductsSkeletons wrap noTitle /> :
                                                  products.length == 0 ? <View style={styles.emptyContainer}>
                                                            <Image source={require('../../../assets/images/no-money.png')} style={styles.emptyImage} />
                                                            <Text style={styles.emptyFeedback}>Aucun résultat trouvé</Text>
                                                  </View> :
                                                  <View style={styles.products}>
                                                            {products.map((product, index) => {
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
                                                  </View>}
                              </ScrollView>
                    </View>
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
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
                    marginTop: 25
          },
          menuOpenerLine: {
                    height: 3,
                    width: 30,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    marginTop: 5
          },
          title: {
                    fontWeight: 'bold'
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingBottom: 10
          },
          titlePrincipal: {
                    fontSize: 0,
                    fontWeight: "bold",
                    marginBottom: 0,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
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
          DataImageCategorie: {
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: 10,
          },
          headerBtn: {
                    padding: 10
          },
          quickFilters:  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginBottom: 10
          },
          filterCategoryShop: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          quickFilterBtn: {
                    padding: 10,
                    borderRadius: 8,
                    borderWidth: 0.5,
                    borderColor: '#aaa',
                    minWidth: 120,
                    borderRadius: 8,
                    overflow: 'hidden'
          },
          filterBtn: {
                    padding: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    borderWidth: 0.5,
                    borderColor: '#aaa',
                    overflow: 'hidden'
          },
          quickFilterBtnHeader: {
                    flexDirection: 'row',
                    alignItems: 'center'
          },
          quickFilterTitle: {
                    fontSize: 12,
                    marginLeft: 5,
                    color: '#777'
          },
          quickFilterValue: {
                    fontSize: 12
          },
          emptyContainer: {
                    justifyContent: "center",
                    alignItems: "center"
          },
          emptyImage: {
                    width: 200,
                    height: 200
          },
          emptyFeedback: {
                    fontWeight: 'bold',
                    marginVertical: 10,
                    marginTop: 30,
                    fontSize: 16,
                    color: COLORS.ecommercePrimaryColor,
                    paddingHorizontal: 10
          }
})