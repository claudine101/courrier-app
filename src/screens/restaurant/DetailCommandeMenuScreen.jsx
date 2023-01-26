import React from "react";
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import ProductCart from "../../components/ecommerce/main/ProductCart";
import { ecommerceCartSelector } from "../../store/selectors/ecommerceCartSelectors";
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import LottieView from 'lottie-react-native';
import { useState } from "react";
import Product from "../../components/ecommerce/main/Product";
import { useEffect } from "react";
import fetchApi, { API_URL } from "../../helpers/fetchApi";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { useRef } from "react";
import DetailCart from "../../components/ecommerce/main/DetailCart";

export default function DetailCommandeMenuScreen() {
  const products = useSelector(ecommerceCartSelector)
  const navigation = useNavigation()
  const route = useRoute()
  const { commande } = route.params

  const [commandes, setCommandes] = useState([])
  const [total, setTotal] = useState(null)
  const [code, setCode] = useState(null)


  let element = 0
  const [loadingProducts, setLoadingProducts] = useState(false)
  const getStatusColor = idStatus => {
    if(idStatus == 3) {
              return COLORS.ecommercePrimaryColor
    }
    if(idStatus == 4) {
              return COLORS.primary
    }
    return  '#B9BDCA'
}
const handleCommandePress = commande => {
  // navigation.navigate('DetailCommandeScreen', { commande })
  navigation.navigate('NoHeaderSearchLivreurScreen', { commande })

}
  const getCommandes = async () => {
    try {
      return await fetchApi(`/commandes/detail/${commande.ID_COMMANDE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      throw error
    }
  }

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        const response = await getCommandes()
        setCommandes(response.result.details)
        setTotal(response.result.TOTAL)
        setCode(response.result.CODE_UNIQUE)
        // console.log(response.result)


      } catch (error) {
        console.log(error)
      }
      //   finally {
      //             setLoading(false)
      //   }
    })()
  }, []))
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => navigation.navigate('EcommerceCartScreen')}>
          <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
        </TouchableOpacity>
      </View>
      <Text style={styles.titlePrincipal}>commande:{code}</Text>
      <View style={styles.products}>
        <FlatList
          data={commandes}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          
          // refreshControl={<RefreshControl
          //   colors={[COLORS.ecommercePrimaryColor]} refreshing={refreshing}
          //   onRefresh={onRefresh} />}
          renderItem={(({ item: command, index }) => {
            return (
              <DetailCart
              product={command}
              commande={commande}

              index={index}
              key={index}
            />
            )
          })}
        />
        

      </View>
      <View style={styles.cartFooter}>
        <View style={styles.cartFooterTotals}>
          <View style={styles.imageAmount}>
            <View style={styles.cartImage}>
              <Image source={require('../../../assets/images/carts.png')} style={styles.image} />
            </View>
            <View style={styles.cartAmount}>
              <Text style={styles.amountTitle}>{commande.ITEMS}</Text>
              <Text style={styles.amount}>Produits</Text>
            </View>
          </View>
          <View style={styles.prices}>
            <Text style={styles.amountTitle}> {commande.TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}  Fbu</Text>
            <Text style={[styles.amount, { textAlign: "right" }]}>Total</Text>
          </View>
        </View>
        <View style={styles.cardStatus}>
          <View style={styles.navigation}>
            <TouchableNativeFeedback useForeground onPress={() => {
              // navigation.navigate('EcommerceHomeScreen')
              navigation.goBack()
            }}>
              <View style={styles.cancelBtn}>
                <Ionicons name="close" size={30} color="#777" />
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => handleCommandePress(commande)}>

              <View style={[styles.nextBtn]}>
                <Text style={[styles.navigationBtnText]}>
                  Voir le statut
                </Text>    
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
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

  navigation: {
    flexDirection: "row",
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginVertical: 25,
    marginBottom: 10
  },
  nextBtn: {
    paddingVertical: 20,
    minWidth: 200,
    overflow: "hidden",
    backgroundColor: COLORS.ecommerceOrange,
    borderRadius: 30,
    marginLeft: 10
  },
  navigationBtnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF"
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
  cancelBtn: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ddd',
    overflow: "hidden"
  },
})