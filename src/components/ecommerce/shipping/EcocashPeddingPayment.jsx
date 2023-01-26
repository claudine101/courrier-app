import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Animated, BackHandler, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Portal } from "react-native-portalize"
import { COLORS } from "../../../styles/COLORS"
import io from 'socket.io-client'
import fetchApi, { API_URL } from "../../../helpers/fetchApi"
import { useDispatch, useSelector } from "react-redux"
import { userSelector } from "../../../store/selectors/userSelector"
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native"
import Loading from "../../app/Loading"
import { resetCartAction } from "../../../store/actions/ecommerceCartActions"

export default function EcocashPeddingPayment({ onClose, idCommande,service }) {
          const socket = useRef(io(API_URL)).current
          const [scale] = useState(new Animated.Value(1.1))
          const user = useSelector(userSelector)
          const [isConfirmed, setIsConfirmed] = useState(false)
          const navigation = useNavigation()
          const [loading, setLoading]  = useState(false)
          const dispatch = useDispatch()
          
          const onNextPress = async () => {
                    try {
                              setLoading(true)
                              // const commande = await fetchApi(`/commandes/${idCommande}`)
                              onClose()
                              navigation.navigate('HomeScreen')
                              dispatch(resetCartAction())
                              // navigation.navigate("SearchLivreurScreen", { commande: commande.result,service:service })
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setLoading(false)
                    }
          }

          useEffect(() => {
                    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                              // onClose()
                              return true
                    })
                    Animated.spring(scale, {
                              toValue: 1,
                              useNativeDriver: true
                    }).start()
                    return () => {
                              backHandler.remove()
                    }
          }, [])
          useEffect(() => {
                    socket.on('connect', () => {
                              console.log('connected')
                              socket.emit('join', { userId: user.ID_USER });
                    })
                    socket.on('ECOCASH_CONFIRMED', message => {
                              console.log(message)
                              setIsConfirmed(true)
                              // onClose()
                    })
                    return () => {
                              socket.disconnect()
                    }
          }, [])
          return (
                    <Portal>
                              {loading && <Loading />}
                              <TouchableWithoutFeedback onPress={() => {}}>
                                        <View style={styles.modalContainer}>
                                                  <TouchableWithoutFeedback onPress={() => {}}>
                                                            <Animated.View style={{ ...styles.modalContent, transform: [{ scale }] }}>
                                                                      <View style={{ borderBottomWidth: 0, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: COLORS.ecommerceOrange }}>
                                                                                <Text style={{ fontWeight: 'bold', color: '#fff', opacity: 0.8, textAlign: 'center' }}>
                                                                                          {isConfirmed ? "Paiement confimé avec succès" : 'Paiement initié avec succès'}
                                                                                </Text>
                                                                      </View>
                                                                      <ScrollView style={{}} keyboardShouldPersistTaps='always'>
                                                                                <View style={styles.content}>
                                                                                          <Image source={require('../../../../assets/images/ecocash.png')} style={styles.methodImage} />
                                                                                          <Text style={styles.successTitle}>
                                                                                                    {isConfirmed ? "Votre paiement a été confirmé" : 'En attente de confirmation'}
                                                                                          </Text>
                                                                                          {/* <LottieView style={{ width: 150, height: 150, marginVertical: -10 }} source={require('../../../../assets/lotties/loadingConfirmation.json')} autoPlay loop={true} /> */}
                                                                                          {isConfirmed ? <LottieView style={{ width: 100, height: 100 }} source={require('../../../../assets/lotties/check.json')} autoPlay loop={false} /> :
                                                                                                    <LottieView style={{ width: 100, height: 100 }} source={require('../../../../assets/lotties/loading.json')} autoPlay loop={true} />}
                                                                                          
                                                                                          {isConfirmed ? <TouchableOpacity onPress={onNextPress}>
                                                                                                    <View style={styles.payBtn} >
                                                                                                              <Text style={styles.payBtnTitle}>CONTINUER</Text>
                                                                                                    </View>
                                                                                          </TouchableOpacity> :
                                                                                          <View style={styles.steps}>
                                                                                                    <Text style={styles.subTitle}>Confirmer le paiement en suivant ces etapes:</Text>
                                                                                                    <View style={styles.step}>
                                                                                                              <View style={styles.peineIndex}>
                                                                                                                        <Text style={styles.peineIndexText}>1</Text>
                                                                                                              </View>
                                                                                                              <Text style={styles.stepTitle}>
                                                                                                                        Tapez
                                                                                                                        <Text style={styles.stepHighlight}> *404#</Text>
                                                                                                              </Text>
                                                                                                    </View>
                                                                                                    <View style={styles.step}>
                                                                                                              <View style={styles.peineIndex}>
                                                                                                                        <Text style={styles.peineIndexText}>2</Text>
                                                                                                              </View>
                                                                                                              <Text style={styles.stepTitle}>
                                                                                                                        Entrez le
                                                                                                                        <Text style={styles.stepHighlight}> code PIN</Text>
                                                                                                              </Text>
                                                                                                    </View>
                                                                                                    <View style={styles.step}>
                                                                                                              <View style={styles.peineIndex}>
                                                                                                                        <Text style={styles.peineIndexText}>3</Text>
                                                                                                              </View>
                                                                                                              <Text style={styles.stepTitle}>
                                                                                                                        Sélectionner
                                                                                                                        <Text style={styles.stepHighlight}> 5. Payer le marchant</Text>
                                                                                                              </Text>
                                                                                                    </View>
                                                                                                    <View style={styles.step}>
                                                                                                              <View style={styles.peineIndex}>
                                                                                                                        <Text style={styles.peineIndexText}>4</Text>
                                                                                                              </View>
                                                                                                              <Text style={styles.stepTitle}>
                                                                                                                        Sélectionner
                                                                                                                        <Text style={styles.stepHighlight}> 3. Approuver le paiement</Text>
                                                                                                              </Text>
                                                                                                    </View>
                                                                                                    <View style={{ ...styles.step, marginBottom: 20 }}>
                                                                                                              <View style={styles.peineIndex}>
                                                                                                                        <Text style={styles.peineIndexText}>5</Text>
                                                                                                              </View>
                                                                                                              <Text style={styles.stepTitle}>
                                                                                                                        Confimer en tapant le
                                                                                                                        <Text style={styles.stepHighlight}> code PIN</Text>
                                                                                                              </Text>
                                                                                                    </View>
                                                                                          </View>}
                                                                                </View>

                                                                      </ScrollView>

                                                            </Animated.View>
                                                  </TouchableWithoutFeedback>
                                        </View>
                              </TouchableWithoutFeedback>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          modalContainer: {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          modalContent: {
                    width: '90%',
                    maxWidth: 400,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    overflow: 'hidden',
                    maxHeight: '90%'
          },
          content: {
                    alignItems: 'center'
          },
          methodImage: {
                    height: 60,
                    width: 150,
                    resizeMode: 'contain',
                    marginLeft: 10,
                    alignSelf: 'center'
          },
          successTitle: {
                    color: '#777',
                    fontWeight: 'bold',
                    fontSize: 17
          },
          steps: {
                    alignSelf: 'flex-start',
                    paddingHorizontal: 20
          },
          subTitle: {
                    color: '#777',
                    marginVertical: 10
          },
          step: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5
          },
          peineIndex: {
                    backgroundColor: '#2358ad',
                    width: 15,
                    height: 15,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
          },
          peineIndexText: {
                    color: '#fff',
                    fontSize: 9,
                    marginTop: -2,
                    fontWeight: 'bold',
                    opacity: 0.8
          },
          stepTitle: {
                    marginLeft: 10,
                    color: '#777'
          },
          stepHighlight: {
                    color: '#2358ad',
                    marginHorizontal: 10,
                    fontWeight: 'bold'
          },
          payBtn: {
                    marginBottom: 10,
                    borderRadius: 8,
                    paddingVertical: 14,
                    paddingHorizontal: 30,
                    backgroundColor: COLORS.ecommerceOrange,
                    marginHorizontal: 20
          },
          payBtnTitle: {
                    textAlign: "center",
                    color: '#fff',
                    fontWeight: "bold"
          },
})