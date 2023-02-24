import React, { useRef, useState } from 'react'
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { COLORS } from '../../styles/COLORS'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Portal } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import EcocashModalize from '../../components/ecommerce/shipping/EcocashModalize';
import { useEffect } from 'react';
import Loading from '../../components/app/Loading';
import { useSelector } from 'react-redux';
import { ecommerceCartSelector } from '../../store/selectors/ecommerceCartSelectors';
import EcocashPeddingPayment from '../../components/ecommerce/shipping/EcocashPeddingPayment';
import { restaurantCartSelector } from '../../store/selectors/restaurantCartSelectors';


export default function PaymentScreen() {
          const METHODS = [{
                    id: 1,
                    name: "ECOCASH",
                    available: true,
                    subTitle: "79878227",
                    image: require('../../../assets/images/ecocash.png')
          }, {
                    id: 2,
                    name: "LUMICAsh",
                    available: false,
                    subTitle: "68345975",
                    image: require('../../../assets/images/lumicash.jpg'),
          }, {
                    id: 3,
                    name: "Bancobu Enoti",
                    available: false,
                    subTitle: "",
                    image: require('../../../assets/images/enoti.png')
          }, {
                    id: 4,
                    name: "IBB M+",
                    available: false,
                    subTitle: "",
                    image: require('../../../assets/images/ibb.png')
          }, {
                    id: 5,
                    name: "VISA / MASTERCARD",
                    available: false,
                    subTitle: "",
                    image: require('../../../assets/images/visa.png')
          }]

          const hash = str => {
                    if (!str || str == '') return str
                    const toHash = str.substr(0, str.length - 2)
                    const hash = toHash.replace(/[a-zA-Z0-9]/g, '*')
                    const rest = str.substr(str.length - 2, 2)
                    return `${hash}${rest}`
          }

          const navigation = useNavigation()
          const route = useRoute()
          const ecocashModalizeRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const [ecocashIsPending, setEcocashIsPending] = useState(false)
          const [commande, setCommande] = useState(null)

          const { shipping_info, service } = route.params

          const products = useSelector(ecommerceCartSelector)
          const restaurants = useSelector(restaurantCartSelector)

          if (products) {
                    var commandes = products.map(product => ({
                              ID_PRODUIT_STOCK: product.stock.ID_PRODUIT_STOCK,
                              QUANTITE: product.QUANTITE,
                              PRIX: product.produit_partenaire.PRIX
                    }))
          }
          if (restaurants) {
                    var resto = restaurants.map(restaurant => ({
                              ID_RESTAURANT_MENU: restaurant.ID_RESTAURANT_MENU,
                              QUANTITE: restaurant.QUANTITE,
                              MONTANT: restaurant.PRIX
                    }))
          }


          const onMethodPress = method => {
                    setIsOpen(true)
                    ecocashModalizeRef.current?.open()
          }

          const onCloseModalize = () => {
                    ecocashModalizeRef.current?.close()
          }

          const onEcocashFinish = (comm) => {
                    setIsOpen(false)
                    ecocashModalizeRef.current?.close()
                    setEcocashIsPending(true)
                    setCommande(comm)
          }

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
                    <View style={styles.container}>
                              {ecocashIsPending && <EcocashPeddingPayment onClose={() => setEcocashIsPending(false)} idCommande={commande?.ID_COMMANDE} service={service} />}
                              <ScrollView keyboardShouldPersistTap="handled">
                                        <View style={styles.cardHeader}>
                                                  <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} onPress={() => navigation.goBack()}>
                                                            <View style={styles.headerBtn}>
                                                                      <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                                        <View style={styles.header}>
                                                  <Text style={styles.title}>
                                                            Payer avec
                                                  </Text>
                                        </View>
                                        <View style={styles.methods}>
                                                  {METHODS.map((method, index) => {
                                                            return (
                                                                      <TouchableNativeFeedback disabled={!method.available} key={method.id} useForeground onPress={() => onMethodPress(method)}>
                                                                                <View style={[styles.method, !method.available && { opacity: 0.3 }, index == 0 && { marginTop: 0 }]} >
                                                                                          <View style={styles.methodRightSide}>
                                                                                                    <View style={styles.methodImage}>
                                                                                                              <Image source={method.image} style={styles.image} />
                                                                                                    </View>
                                                                                                    <View style={styles.methodNames}>
                                                                                                              <Text style={styles.methodTitle}>{method.name.toUpperCase()}</Text>
                                                                                                              {method.available ? <Text style={styles.subTitle}>{hash(method.subTitle)}</Text> :
                                                                                                                        <Text style={styles.unavailableFeedback}>Non disponible</Text>}
                                                                                                    </View>
                                                                                          </View>
                                                                                          <MaterialIcons name="navigate-next" size={24} color="black" style={{ fontWeight: "bold" }} />
                                                                                </View>
                                                                      </TouchableNativeFeedback>
                                                            )
                                                  })}
                                        </View>
                              </ScrollView>
                              <View style={styles.navigation}>
                                        <TouchableNativeFeedback useForeground onPress={() => navigation.goBack()}>
                                                  <View style={styles.cancelBtn}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </View>
                                        </TouchableNativeFeedback>
                              </View>
                              <Portal>
                                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                                  <Modalize
                                                            ref={ecocashModalizeRef}
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
                                                            <EcocashModalize
                                                                      info={METHODS[0]}
                                                                      loadingForm={loadingForm}
                                                                      onClose={onCloseModalize}
                                                                      shipping_info={shipping_info}
                                                                      service={service}
                                                                      onFInish={onEcocashFinish}
                                                            />
                                                  </Modalize>
                                        </GestureHandlerRootView>
                              </Portal>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 22,
                    paddingLeft: 10,
                    paddingRight: 50,
                    lineHeight: 33,
          },
          header: {
                    marginBottom: 20
          },
          method: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 10,
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                    backgroundColor: '#fff',
                    elevation: 10,
                    shadowColor: '#c7bdbd',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderRadius: 10,
                    overflow: "hidden"
          },
          methodRightSide: {
                    flexDirection: "row",
                    alignItems: "center",
          },
          methodImage: {
                    width: 100,
                    height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: "center"
          },
          image: {
                    resizeMode: "center",
                    width: "90%",
                    height: "90%"
          },
          methodNames: {
                    marginLeft: 10
          },
          methodTitle: {
                    fontWeight: "bold"
          },
          subTitle: {
                    color: '#777',
                    fontSize: 13
          },
          unavailableFeedback: {
                    fontWeight: "bold",
                    color: COLORS.error,
                    fontSize: 13
          },
          navigation: {
                    flexDirection: "row",
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 10,
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
})