import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import Menu from "../../components/restaurants/main/Menu"
import LottieView from 'lottie-react-native';

import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";

export default function RestaurantWishlistScreen() {
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
  const [menus, setMenus] = useState([])
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

  const onRemove = useCallback((ID_RESTAURANT_MENU) => {

    const newMenus = menus.filter(p => p.ID_RESTAURANT_MENU != ID_RESTAURANT_MENU)
    setMenus(newMenus)
  }, [menus])

  const fecthMenus = async () => {
    try {
      if (firstLoadingProducts == false) {
        setLoadingProducts(true)
      }
      var url = "/resto/menu/wishlist/all"
      const menu = await fetchApi(url)
      setMenus(menu.result)
    }
    catch (error) {
      console.log(error)
    } finally {
      setFirstLoadingProducts(false)
      setLoadingProducts(false)
    }
  }
  useFocusEffect(useCallback(() => {
    fecthMenus()
  }, []))

  // return (
  //   <View style={styles.container}>

  //     {menus.length!=0 ?
  //     <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>

  //     <TouchableNativeFeedback
  //       accessibilityRole="button"
  //       background={TouchableNativeFeedback.Ripple('#c9c5c5')}
  //     >
  //       <View style={styles.productsHeader}>
  //      </View>
  //     </TouchableNativeFeedback>
  //     <View style={styles.products}>
  //       {menus.map((menu, index) => {
  //         return (
  //           <Menu
  //             menu={menu}
  //             index={index}
  //             totalLength={menus.length}
  //             key={index}
  //             fixMargins
  //             onRemove={onRemove}
  //           />
  //         )
  //       })}
  //     </View>
  //   </ScrollView>:
  //   <>
  //   <LottieView style={{ marginTop:40, width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
  //   <Text style={styles.emptyFeedback}>Votre liste des souhaits est vide</Text>

  //   </>
  //     }



  //   </View>
  // )
  return (
    <View style={styles.container}>
      {(firstLoadingProducts || loadingProducts) ?
        <View style={{ marginTop: 20 }}>
          <HomeProductsSkeletons />
          <HomeProductsSkeletons />
        </View>
        :
        menus.length != 0 ?
          <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>
            <TouchableNativeFeedback
              accessibilityRole="button"
              background={TouchableNativeFeedback.Ripple('#c9c5c5')}
            >
              <View style={styles.productsHeader}>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.products}>

              {menus.map((menu, index) => {
                return (
                  <Menu
                    menu={menu}
                    index={index}
                    totalLength={menus.length}
                    key={index}
                    fixMargins
                    onRemove={onRemove}
                  />
                )
              })}
            </View>
          </ScrollView> :
          <>
            <LottieView style={{ marginTop: 40, width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
            <Text style={styles.emptyFeedback}>Votre liste des souhaits est vide</Text>

          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, marginTop: -30
  },
  emptyFeedback: {
    textAlign: "center",
    marginTop: 10,
    color: COLORS.ecommercePrimaryColor,
    fontWeight: "bold",
    opacity: 0.6,
    fontSize: 16,
    marginTop: 40
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
    flexWrap: 'wrap'
  },
})