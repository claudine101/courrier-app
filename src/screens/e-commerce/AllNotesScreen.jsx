import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from "moment/moment";
import { COLORS } from "../../styles/COLORS";
import { useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Loading from "../../components/app/Loading";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { useNavigation } from "@react-navigation/native";
import Rating from "../../components/ecommerce/details/Rating";

/**
 * un screen pour afficher tous les commentaires effectuees sur un produits
 * @author Innocent <ndayikenguerukiye.innocent@mediabox.bi>
 * @date 27/1/2023
 * @param {*} param0 
 * @returns 
 */
export default function AllNotesScreen() {
          const route = useRoute()
          const { productId } = route.params
          const navigation = useNavigation()
          const [produitnoteuser, setProduitnoteUser] = useState([])
          const [loading, setLoading] = useState(true)
          moment.updateLocale('fr', {
                    calendar: {
                              sameDay: "[Aujourd'hui]",
                              lastDay: '[Hier]',
                              nextDay: 'DD-M-YYYY',
                              lastWeek: 'DD-M-YYYY',
                              sameElse: 'DD-M-YYYY',
                    },
          })
          useEffect(() => {

                    (async () => {
                              try {
                                        var url = `/ecommerce/ecommerce_produits_notes?ID_PRODUIT=${productId}`
                                        const produitsNotes = await fetchApi(url)
                                        setProduitnoteUser(produitsNotes.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoading(false)
                              }
                    })()
          }, [])

          return (

                    <>
                              <View style={styles.cardHeader}>
                                        <TouchableNativeFeedback
                                                  style={{}}
                                                  onPress={() => navigation.goBack()}
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                  <View style={styles.headerBtn}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                  <TouchableNativeFeedback
                                                            style={{}}
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                                            <View style={styles.headerBtn}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <EcommerceBadge />
                                        </View>
                              </View>
                              {loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                                        <ActivityIndicator animating size="large" color={"#777"} />
                              </View> :
                              <ScrollView>
                                        {produitnoteuser.map((note, index) => {
                                                  return (
                                                            <Rating rating={note} key={index} index={index} />
                                                  )
                                        })
                                        }
                              </ScrollView>}
                    </>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    paddingHorizontal: 10,
          },
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#FFF',
          },
          headerBtn: {
                    padding: 10
          }
})