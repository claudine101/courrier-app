import React from "react";
import { FlatList, Image, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, ActivityIndicator, TouchableOpacity, View } from "react-native";
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
import moment from 'moment'

export default function DetailCommandeScreen() {
  const products = useSelector(ecommerceCartSelector)
  const navigation = useNavigation()
  const route = useRoute()
  const { commande } = route.params

  const [commandes, setCommandes] = useState([])
  const [commandeEntente, setCommandeEntente] = useState([])
  const [total, setTotal] = useState(null)
  const [code, setCode] = useState(null)
  const [loadingDetailsProducts, setLoadingDetailsProducts] = useState(true)



  let element = 0
  const getStatusColor = idStatus => {
    if (idStatus == 3) {
      return COLORS.ecommercePrimaryColor
    }
    if (idStatus == 4) {
      return COLORS.primary
    }
    return '#B9BDCA'
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
        setCommandeEntente(response.result)
        setTotal(response.result.TOTAL)
        setCode(response.result.CODE_UNIQUE)
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoadingDetailsProducts(false)
      }
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
      <ScrollView>
      <View style={styles.cardCommande}>
        <ScrollView>
        <Text style={{ ...styles.titlePrincipal, fontWeight: "bold" }}>{code}</Text>
        <View style={styles.insertLigne}></View>
        { commandeEntente.N0M ?<>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Nom</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.N0M} {commandeEntente.PRENOM}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}
       {commandeEntente.ADRESSE ? <>
       <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Adresse</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.ADRESSE}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}

        {commandeEntente.ADDRESSE_PICKER ? <>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Depart</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.ADDRESSE_PICKER}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}
        {commandeEntente.ADRESSE_DEST ?<>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Destination</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.ADRESSE_DEST}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}
       {commandeEntente.STATUT_DESCRIPTION ? <>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Status </Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.STATUT_DESCRIPTION}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>: null}
        {commandeEntente.CATEGORIE_DESCRIPTION ?<>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Moyen de transport</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.CATEGORIE_DESCRIPTION}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}
        {commandeEntente.MONTANT ?<>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Montant de transport</Text>
          <Text style={styles.titlePrincipal}>{commandeEntente.MONTANT}</Text>
        </View>
        <View style={styles.insertLigne}></View>
        </>:null}
        {commandeEntente.DATE_LIVRAISON ?<>
        <View style={styles.cardTitleHeader}>
          <Text style={styles.titleName}>Date de livraison</Text>
          <Text style={styles.titlePrincipal}>{moment(commandeEntente.DATE_LIVRAISON).format('DD-MM-YYYY HH:mm:ss')}</Text>
        </View>
        <View style={{ ...styles.insertLigne, marginBottom: 5 }}></View>
        </>:null}
        
        </ScrollView>
      </View>


      {loadingDetailsProducts ? <View style={{ flex: 1, marginTop: 10 }}>
        <ActivityIndicator animating={true} size="large" color={"black"} />
      </View> :
        <View style={styles.products}>
          
            {commandes.map((commande,index)=>{
               return (
                <DetailCart
                  product={commande}
                  index={index}
                  key={index}
                />
              )
            })}
        </View>}
        </ScrollView>
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
            {/* <Text style={[styles.amount, { textAlign: "right" }]}>Total</Text> */}
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
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom:"50%"
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
    marginBottom: 5,
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
  cardCommande: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom:20,
    marginTop:20
  },
  insertLigne: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  titleName: {
    fontWeight: "bold",
    color: COLORS.ecommercePrimaryColor,
  },
  cardTitleHeader: {
    marginTop: 5,
    marginBottom: 5
  }
})