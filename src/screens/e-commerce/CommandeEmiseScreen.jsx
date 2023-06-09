import React from "react"
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback, RefreshControl } from "react-native"
import { Feather, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import fetchApi from "../../helpers/fetchApi";
import moment from "moment/moment";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import CommandeSkeletons from "../../components/app/Skeletons";
import { useCallback } from "react";
import LottieView from 'lottie-react-native';
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import AppHeader from "../../components/app/AppHeader";

/**
 * screen pour afficher tous les commandes faites par un utilisateur
 * @author Darcy <darcy@mediabox.bi> modifier par Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function CommandeEmiseScreen() {
          const [commandes, setCommandes] = useState([])
          const navigation = useNavigation()
          const [loading, setLoading] = useState(true)
          const [refreshing, setRefreshing] = useState(false)
          const user = useSelector(userSelector)
          const route = useRoute()
          const {serviceCategory} = route.params

          moment.updateLocale('fr', {
                    calendar: {
                              sameDay: "[Aujourd'hui]",
                              lastDay: '[Hier]',
                              nextDay: 'DD-M-YYYY',
                              lastWeek: 'DD-M-YYYY',
                              sameElse: 'DD-M-YYYY',
                    },
          })

          const getCommandes = async () => {
                    try {
                              return await fetchApi(`/ecommerce/ecommerce_commandes?ID_USER=${user.ID_USER}`, {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                    } catch (error) {
                              throw error
                    }
          }

          const handleCommandePress = (commande, index) => {
                navigation.push('SearchAllLivreurScreen', { commande:commande, index:index, serviceCategory:serviceCategory })
        }
          useFocusEffect(useCallback(() => {
                    (async () => {
                              try {
                                        const response = await getCommandes()
                                        setCommandes(response.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, []))

          const onRefresh = async () => {
                    try {
                              setRefreshing(true)
                              const response = await getCommandes()
                    } catch (error) {
                              console.log(error)
                    } finally {
                              setRefreshing(false)
                    }
          }

          const getStatusColor = idStatus => {
                    if (idStatus == 3) {
                              return COLORS.ecommercePrimaryColor
                    }
                    if (idStatus == 4) {
                              return COLORS.primary
                    }
                    return '#B9BDCA'
          }
          return (
                    <View style={styles.container}>
                              <AppHeader />
                              <Text style={styles.title}>Commandes emises</Text>
                              {loading ? <CommandeSkeletons /> :
                                        <>

                                                  {commandes.length == 0 ?
                                                            <View style={{ marginTop: 30 }}>
                                                                      <LottieView style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
                                                                      <Text style={styles.emptyFeedback}>Aucune commande trouvée</Text>
                                                            </View> :
                                                            <>
                                                                      <FlatList
                                                                                data={commandes}
                                                                                keyExtractor={(item, index) => index}
                                                                                showsVerticalScrollIndicator={false}
                                                                                refreshControl={<RefreshControl
                                                                                          colors={[COLORS.ecommercePrimaryColor]} refreshing={refreshing}
                                                                                          onRefresh={onRefresh} />}
                                                                                renderItem={(({ item: commande, index }) => {
                                                                                          return (
                                                                                                    <TouchableNativeFeedback onPress={() => handleCommandePress(commande, index)}>
                                                                                                              <View style={styles.commande} key={index}>
                                                                                                                        <View style={styles.cardAchat}>
                                                                                                                                  <Image source={{ uri: commande.details[0]?.IMAGE_1 }} style={styles.productImage} />
                                                                                                                        </View>
                                                                                                                        <View style={{ marginLeft: 15, flex: 1 }}>
                                                                                                                                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                                                                            <View>
                                                                                                                                                      <Text style={styles.textRobe}>
                                                                                                                                                                Commande : {commande.CODE_UNIQUE}
                                                                                                                                                      </Text>
                                                                                                                                                      <Text style={styles.date}>
                                                                                                                                                                {moment(commande.DATE_COMMANDE).calendar()} {moment(commande.DATE_COMMANDE).format('HH:mm')}   {commande.ITEMS} produit{commande.ITEMS > 1 && 's'}
                                                                                                                                                      </Text>
                                                                                                                                            </View>
                                                                                                                                            <Text style={styles.montant}>
                                                                                                                                                      {commande.TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu
                                                                                                                                            </Text>
                                                                                                                                  </View>
                                                                                                                                  <View style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}>
                                                                                                                                            {commande.ID_STATUT == 4 ? <AntDesign name="checkcircle" size={10} color={COLORS.primary} /> :
                                                                                                                                                      <Entypo name="circle" size={10} color={getStatusColor(commande.ID_STATUT)} />}
                                                                                                                                            <View style={{ marginLeft: 7 }}>
                                                                                                                                                      <Text style={[styles.textCommande, { color: getStatusColor(commande.ID_STATUT) }]}>
                                                                                                                                                                {commande.NEXT_STATUS}
                                                                                                                                                      </Text>
                                                                                                                                            </View>
                                                                                                                                  </View>
                                                                                                                        </View>
                                                                                                              </View>
                                                                                                    </TouchableNativeFeedback>
                                                                                          )
                                                                                })}
                                                                      />
                                                            </>}
                                        </>}
                    </View>
          )
}
const styles = StyleSheet.create({
          container: {
                    // paddingBottom: 230,
                    flex: 1
          },
          title: {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: COLORS.primary,
                    paddingVertical: 10,
                    paddingBottom: 0,
                    paddingHorizontal: 10
          },
          carre: {
                    borderRadius: 10,
                    padding: 13,
                    width: 150
          },
          commande: {
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "center",
                    padding: 10,
          },
          cardAchat: {
                    width: 75,
                    height: 75,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center"

          },
          productImage: {
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: 10
          },
          cardOK: {
                    width: 10,
                    height: 10,
                    backgroundColor: '#55C869',
                    borderRadius: 9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 3
          },
          textCommande: {
                    color: "#55C869",
                    fontSize: 10,
                    fontWeight: "bold",
          },
          textRobe: {
                    color: "#3e4778",
                    fontSize: 12,
                    fontWeight: "bold",
          },
          date: {
                    color: "#B9BDCA",
                    fontSize: 11,
                    fontWeight: "bold",
          },
          montant: {
                    color: "#EE7526",
                    fontSize: 12,
                    fontWeight: "bold",
                    textAlign: "right",
          },
          ligne: {
                    borderTopWidth: 1,
                    marginTop: 10,
                    borderTopColor: '#B9BDCA',
          },
          emptyFeedback: {
                    textAlign: "center",
                    marginTop: 10,
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    opacity: 0.6,
                    fontSize: 16
          },
})