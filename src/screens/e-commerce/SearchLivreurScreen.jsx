import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { FontAwesome, AntDesign, Ionicons, Zocial } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS"
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import fetchApi from "../../helpers/fetchApi";
import moment from "moment/moment";

/**
 * screen pour afficher les status pour les commandes
 * @author Darcy <darcy@mediabox.bi> modifier par Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function SearchLivreurScreen() {
          const navigation = useNavigation()
          const route = useRoute()
          const { commande } = route.params
          const [status, setStatus] = useState([])
          const [loadingStatus, setLoadingStatus] = useState(true)
          const [currentStatus, setCurrentStatus] = useState(null)
          const [peddingStatus, setPeddingStatus] = useState(null)
          moment.updateLocale('fr', {
                    calendar: {
                              sameDay: "[Aujourd'hui]",
                              lastDay: '[Hier]',
                              nextDay: 'DD-M-YYYY',
                              lastWeek: 'DD-M-YYYY',
                              sameElse: 'DD-M-YYYY',
                    },
          })

          const voirDetails = () =>{
                navigation.navigate("DetailCommandeScreen", {commande:commande})
          }

          useEffect(() => {
                    (async () => {
                              try {
                                        const stts = await fetchApi(`/commandes/status/${commande.ID_COMMANDE}`, {
                                                  cacheData: false,
                                                  checkInCacheFirst: false
                                        })
                                        const current = stts.result.find(st => st.ID_STATUT == commande.ID_STATUT)
                                        const pedding = stts.result.find(st => st.ID_STATUT == current.NEXT_ID_STATUT)
                                        setCurrentStatus(current)
                                        setPeddingStatus(pedding)
                                        setStatus(stts.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingStatus(false)
                              }
                    })()
          }, [])

          if(loadingStatus) {
                    return (
                              <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator
                                                  size={"large"}
                                                  color="#000"
                                        />
                              </View>
                    )
          }

          return (
                    <View style={styles.container}>
                              <View style={styles.header}>
                                        <Text style={styles.titlePrincipal}>
                                                  { currentStatus?.NEXT_STATUS }
                                        </Text>
                                        {currentStatus.ID_STATUT == 4 ? <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/check.json')} autoPlay loop={false} /> :
                                        <LottieView style={{ width: 100, height: 100, alignSelf: "center" }} source={require('../../../assets/lotties/loading.json')} autoPlay loop={true} />}
                              </View>
                              <View style={styles.cardStatus}>
                                        <View style={styles.importantInfos}>
                                                  <View style={styles.importantInfo}>
                                                            <Text style={[styles.importantInfoValue]}>{ commande.CODE_UNIQUE }</Text>
                                                            <Text style={styles.importantInfoTitle}>
                                                                      Code de la commande
                                                            </Text>
                                                  </View>
                                                  <View style={styles.importantInfo}>
                                                            <Text style={[styles.importantInfoValue, { textAlign: "right" }]}>10:46</Text>
                                                            <Text style={[styles.importantInfoTitle, { textAlign: "right" }]}>
                                                                      Heure
                                                            </Text>
                                                  </View>
                                        </View>
                                        {false && <View style={styles.infomations}>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Commande
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      2 chaussures et 1 pantalons
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Destination
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      Kanyosha, 18 avenue ngaha
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Personne
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      Mr, jean claude kaburungu
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Livreur
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      En attente...
                                                            </Text>
                                                  </View>
                                        </View>}
                                        <Text style={[styles.titlePrincipal, { textAlign: "left", marginTop: 10, fontSize: 18, marginBottom: 5 }]}>
                                                  Status de livraisons
                                        </Text>
                                        <View style={styles.statusContainer}>
                                                  <View>
                                                            {!loadingStatus && status.filter(t => t.ID_STATUT != 1).map((status, index) => {
                                                                      return (
                                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }} key={index}>
                                                                                          <View style={{ flexDirection: "row" }}>
                                                                                                    <View style={styles.cardIcon}>
                                                                                                              <Zocial name="statusnet" size={24} color="#777" />
                                                                                                    </View>
                                                                                                    <View style={{ marginLeft: 10 }}>
                                                                                                              <Text style={styles.statutTitle} numberOfLines={1}>
                                                                                                                        { status.DESCRIPTION }
                                                                                                              </Text>
                                                                                                              <Text style={styles.dateStatus}>
                                                                                                                        {status.DATE_INSERTION ? `${moment(status.DATE_INSERTION).calendar()} à ${moment(status.DATE_INSERTION).format('HH:mm')}` : '-'}
                                                                                                              </Text>
                                                                                                    </View>
                                                                                          </View>
                                                                                </View>
                                                                      )
                                                            })}
                                                  </View>
                                                  <View style={styles.statusCheckes}>
                                                            {!loadingStatus && status.filter(t => t.ID_STATUT != 1).map((status, index) => {
                                                                      return (
                                                                                <View style={[styles.statutVue, !status.completed && status.ID_STATUT != peddingStatus.ID_STATUT && { backgroundColor: '#ddd', elevation: 0 }]} key={index}>
                                                                                          {status.completed && <AntDesign name="check" size={15} color="white" />}
                                                                                </View>
                                                                      )
                                                            })}
                                                            <View style={styles.progressIndicator} />
                                                  </View>
                                        </View>
                                        <View style={styles.navigation}>
                                                  <TouchableNativeFeedback useForeground onPress={() => {
                                                            // navigation.navigate('EcommerceHomeScreen')
                                                            navigation.goBack()
                                                  }}>
                                                            <View style={styles.cancelBtn}>
                                                                      <Ionicons name="close" size={30} color="#777" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback useForeground onPress={voirDetails}>
                                                            <View style={[styles.nextBtn]}>
                                                                      <Text style={[styles.navigationBtnText]}>
                                                                                Voir la commande
                                                                      </Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    // marginHorizontal: 10
          },
          header: {
                    marginVertical: 30
          },
          titlePrincipal: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 22,
                    lineHeight: 33,
                    textAlign: "center"
          },
          importantInfos: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
          },
          importantInfoValue: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.ecommercePrimaryColor
          },
          importantInfoTitle: {
                    color: '#777'
          },
          titleStatus: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 15,
                    paddingLeft: 10,
                    paddingRight: 50,
                    lineHeight: 33,
          },
          cardStatus: {
                    padding: 10,
                    backgroundColor: "#F1F1F1",
                    width: "100%",
                    paddingHorizontal: 20,
                    position: "absolute",
                    bottom: 0,
                    paddingTop: 30,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
          },
          cardIcon: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: COLORS.handleColor,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },
          statutTitle: {
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#000"
          },
          dateStatus: {
                    fontSize: 13,
                    color: "#777"
          },
          statutVue: {
                    width: 22,
                    height: 22,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    elevation: 5,
                    shadowColor: COLORS.ecommercePrimaryColor,
                    marginTop: -30
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
          info: {
                    marginTop: 10
          },
          infoTitle: {
                    fontWeight: "bold",
                    fontSize: 15
          },
          infoValue: {
                    color: '#777'
          },
          statusContainer: {
                    flexDirection: "row",
                    justifyContent: "space-between"
          },
          statusCheckes: {
                    justifyContent: "space-around"
          },
          progressIndicator: {
                    position: 'absolute',
                    width: 1,
                    height: "70%",
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: '#c2baba',
                    top: 0,
                    alignSelf: "center",
                    zIndex: -1,
                    marginTop: 15
          }
})