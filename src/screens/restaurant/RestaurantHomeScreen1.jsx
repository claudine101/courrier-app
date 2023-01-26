import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, StatusBar, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { AntDesign, SimpleLineIcons, FontAwesome, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { useFocusEffect, useNavigation, DrawerActions } from "@react-navigation/native";
import AjoutPanierModalize from "../../components/restaurants/AjoutPanierModalize";
import FiltreModal from "../../components/restaurants/FiltreModal";
import fetchApi from "../../helpers/fetchApi";
import { COLORS } from "../../styles/COLORS"
import RestoSubCategories from "../../components/restaurants/home/RestoSubCategories";
import { CategoriesMenuSkeletons, HomeProductsSkeletons } from "../../components/restaurants/skeletons/SkeletonsResto";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import Menu from "../../components/restaurants/main/Menu";


export default function RestaurantHomeScreen() {
          const ajoutPanierRef = useRef(null)
          const filtreRef = useRef(null)
          const navigation = useNavigation()

          const [partenaires, setPartenaires] = useState([])
          const [selectedPartenaire, setSelectedPartenaire] = useState(null)
          const [menuPartenaires, setMenuPartenaires] = useState([])

          const [loadingMenuCategories, setLoadingMenuCatagories] = useState(true)
          const [menuCategories, setMenuCategories] = useState([])
          const [selectedCategorie, setSelectedCategorie] = useState(null)

          const [firstLoadingMenu, setFirstLoadingMenu] = useState(true)
          const [loadingMenu, setLoadingMenu] = useState(false)
          const [menuListes, setMenuListes] = useState([])
          const [selectedMenu, setSelectedMenu] = useState(null)

          const fetchPartenaire = async () => {
                    try {
                              const response = await fetchApi('/partenaire/service/2', {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                              console.log(response.result)
                              setPartenaires(response.result)
                    }
                    catch (error) {
                              console.log(error)
                    }
          }

          useFocusEffect(useCallback(() => {
                    fetchPartenaire()
          }, []))

          //Fetch des menus par rapport des restaurants
          useEffect(() => {
                    (async () => {
                              try {
                                        const dataPartenaire = await fetchApi(`/resto/menu/${selectedPartenaire?.ID_PARTENAIRE}`, {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setMenuPartenaires(dataPartenaire)
                                        // console.log(dataPartenaire)

                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingMenuCatagories(false)
                              }
                    })()
          }, [selectedPartenaire])


          //Fetch all menu et filtre menu par categories
          useEffect(() => {
                    (async () => {
                              try {
                                        if (firstLoadingMenu == false) {
                                                  setLoadingMenu(true)
                                        }
                                        var url = "/resto/menu"
                                        if (selectedCategorie) {
                                                  url = `/resto/menu?category=${selectedCategorie?.ID_CATEGORIE_MENU}`
                                        } else if (selectedPartenaire) {
                                                  url = `/resto/menu?partenaire=${selectedPartenaire?.ID_PARTENAIRE}`
                                        }
                                        const menu = await fetchApi(url)
                                        setMenuListes(menu.result)
                                        // console.log(url)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setFirstLoadingMenu(false)
                                        setLoadingMenu(false)
                              }
                    })()
          }, [selectedCategorie, selectedPartenaire])

          //Fetch des listes des categories
          useEffect(() => {
                    (async () => {
                              try {
                                        const menus = await fetchApi("/resto/menu/categories", {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        setMenuCategories(menus.result)
                                         console.log(menus.result)

                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingMenuCatagories(false)
                              }
                    })()
          }, [])

          //fetch menu
          useEffect(() => {
                    (async () => {
                              try {
                                        setLoadingMenu(true)
                                        if (selectedCategorie?.ID_CATEGORIE_MENU) {
                                                  const menu = await fetchApi(`/resto/menu?category=${selectedCategorie?.ID_CATEGORIE_MENU}`, {
                                                            method: "GET",
                                                            headers: { "Content-Type": "application/json" },
                                                  })
                                                  setMenuListes(menu.result)
                                                  // console.log(menu.result)
                                        }
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingMenu(false)
                              }
                    })()
          }, [selectedCategorie])


          const onMenuCategoryPress = (menuCategorie) => {
                    setSelectedCategorie(menuCategorie)
                    setSelectedPartenaire(null)
          }
          const onPartenairePress = (partenaire) => {
                    setSelectedPartenaire(partenaire)
                    setSelectedCategorie(null)
          }
          return (
                    <>
                              <View style={styles.container}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                                            <View style={styles.menuOpenerLine} />
                                                            <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                            <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                                  </TouchableOpacity>
                                                  <RestaurantBadge />
                                        </View>
                                        <ScrollView stickyHeaderIndices={[3]}>
                                                  <Text style={styles.titlePrincipal}>Restauration</Text>
                                                  <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
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
                                                  </View>
                                                  {/* <View >
                                                            <ScrollView
                                                                      horizontal showsHorizontalScrollIndicator={false}
                                                                      style={styles.subCategories}
                                                            >
                                                                      {partenaires.map((partenaire, index) => {
                                                                                return (
                                                                                          <TouchableOpacity onPress={() => onPartenairePress(partenaire)} key={index} style={{ alignContent: "center", alignItems: "center" }}>
                                                                                                    <View style={{ alignContent: "center", alignItems: "center", margin: 10 }}>
                                                                                                              <View style={[styles.cardPhotoPartenaire, { backgroundColor: partenaire.ID_PARTENAIRE == selectedPartenaire?.ID_PARTENAIRE ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                                                        <Image source={{ uri: partenaire.LOGO }} style={styles.image} />
                                                                                                              </View>
                                                                                                              <Text style={{}}>{ partenaire.NOM_ORGANISATION }</Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity>

                                                                                )
                                                                      })}

                                                            </ScrollView>
                                                  </View> */}
                                                  {loadingMenuCategories ? <CategoriesMenuSkeletons /> :
                                                            <View>
                                                                      <ScrollView
                                                                                horizontal showsHorizontalScrollIndicator={false}
                                                                                style={styles.subCategoriesMenu}
                                                                      >
                                                                                {menuCategories.map((menuCategorie, index) => {
                                                                                          return (
                                                                                                    <TouchableOpacity key={index} onPress={() => onMenuCategoryPress(menuCategorie)}>
                                                                                                              <View style={{ alignContent: "center", alignItems: "center", margin: 20 }}>
                                                                                                                        <View style={[styles.cardPhoto, { backgroundColor: menuCategorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                                                                  <Ionicons name="shirt-sharp" size={24} color="white" />
                                                                                                                        </View>
                                                                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{menuCategorie.NOM}</Text>
                                                                                                              </View>
                                                                                                    </TouchableOpacity>
                                                                                          )
                                                                                })}
                                                                      </ScrollView>
                                                            </View>
                                                            }
                                                  <ScrollView showsVerticalScrollIndicator={false}>

                                                            <View style={styles.products}>
                                                                      {menuListes.map((menu, index) => {
                                                                                return (
                                                                                          <Menu
                                                                                                    menu={menu}
                                                                                                    index={index}
                                                                                                    totalLength={menuListes.length}
                                                                                                    key={index}
                                                                                                    fixMargins
                                                                                          />
                                                                                )
                                                                      })}
                                                            </View>
                                                  </ScrollView>
                                        </ScrollView>
                                        <Portal>
                                                  <Modalize ref={ajoutPanierRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                            <AjoutPanierModalize product={partenaires} ajoutPanierRef={ajoutPanierRef} />
                                                  </Modalize>
                                        </Portal>

                                        <Portal>
                                                  <Modalize ref={filtreRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                            <FiltreModal filtreRef={filtreRef} />
                                                  </Modalize>
                                        </Portal>

                              </View>
                    </>

          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
          },
          input: {
                    flex: 1
          },
          searchSection: {
                    flexDirection: "row",
                    marginTop: 10,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    //justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    backgroundColor: "#D7D9E4",
                    width: "84%"
          },
          cardRecherche: {
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "#EF4255",
                    marginTop: 8,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },
          cardAchat: {
                    // width: 120,
                    // height: 120,
                    // borderWidth: 2,
                    // borderColor: "#BCBFD1",
                    // borderRadius: 20,
                    // justifyContent: "center",
                    // alignItems: "center",
                    // margin: 5
          },
          image: {
                    width: 60,
                    height: 60,
                    borderRadius: 10
          },
          cardPhoto: {
                    width: 50,
                    height: 50,
                    //backgroundColor: "#242F68",
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          cardPhotoPartenaire: {
                    width: 75,
                    height: 75,
                    //backgroundColor: "#242F68",
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          cardAchatDescription: {
                    // marginTop: 20,
                    // width: 150,
                    // height: 120,
                    // borderWidth: 2,
                    // borderColor: "#BCBFD1",
                    // borderRadius: 20,
                    // justifyContent: "center",
                    // alignItems: "center"
          },
          imageDescription: {
                    marginTop: 20,
                    width: 150,
                    height: 150,
          },
          cardLike: {
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          cardLike2: {
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8
          },
          titleName: {
                    position: "absolute",
                    marginTop: 130,
                    marginLeft: 30,
          },


          imageModal: {
                    marginTop: 10,
                    width: 150,
                    height: 150,
          },
          cardSigne: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: "#1D8585",
                    backgroundColor: '#242F68',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          cardInput: {
                    padding: 15,
                    height: 50,
                    width: 155,
                    borderWidth: 2,
                    borderColor: '#D8D8D8',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          cardIcon: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: "#1D8585",
                    backgroundColor: '#D7D9E4',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          imageModalPanier: {
                    width: 70,
                    height: 70,
          },
          subCategories: {
                    paddingVertical: 5,
                    padding: 5,
          },
          subCategoriesMenu: {
                    backgroundColor: "#fff"
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
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap'
          },



})