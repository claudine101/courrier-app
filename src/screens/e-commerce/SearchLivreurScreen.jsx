import React from "react";
import { StatusBar, Text, TouchableNativeFeedback, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Ionicons, Feather, FontAwesome, EvilIcons, AntDesign } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS"
import LottieView from 'lottie-react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import fetchApi from "../../helpers/fetchApi";
import moment from "moment/moment";
import CommandeDetailsTabs from "../../routes/CommandeDetailsTabs";

/**
 * screen pour afficher les status pour les commandes
 * @author Darcy <darcy@mediabox.bi> modifier par Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function SearchLivreurScreen() {
      const navigation = useNavigation()
      const route = useRoute()
      const { commande, index, serviceCategory } = route.params
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

      const voirDetails = () => {
            navigation.navigate("DetailCommandeScreen", { commande: commande })
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

      if (loadingStatus) {
            return (
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
                        <TouchableNativeFeedback
                              accessibilityRole="button"
                              background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}
                              onPress={() => navigation.goBack()}
                        >
                              <View style={styles.headerBtn}>
                                    <Ionicons name="chevron-back" size={24} color="black" />
                              </View>
                        </TouchableNativeFeedback>
                        <Text style={styles.commandeCode}>12345</Text>
                        <View style={styles.endBtns}>
                              <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('#c9c5c5', true)} >
                                    <View style={[styles.headerBtn]}>
                                          <Feather name="more-horizontal" size={24} color="black" />
                                    </View>
                              </TouchableNativeFeedback>
                        </View>
                  </View>
                  <CommandeDetailsTabs commande={commande} serviceCategory={serviceCategory}/>
            </View>
      )
}

const styles = StyleSheet.create({
      container: {
            flex: 1
      },
      header: {
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: StatusBar.currentHeight
      },
      headerBtn: {
            padding: 10
      },
      shopName: {
            fontWeight: "bold"
      },
      endBtns: {
            flexDirection: 'row',
            alignItems: 'center',
      },
      commandeHeader: {
            paddingHorizontal: 10
      },
      commandeCode: {
            fontWeight: "bold",
            color: COLORS.ecommercePrimaryColor,
            fontSize: 16
      }
})