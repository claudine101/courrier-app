import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"
import useFetch from "../../hooks/useFetch";
import moment from "moment";
import Loading from "../../components/app/Loading"

export default function StatusTabScreen() {
        const route = useRoute()
        const { serviceCategory, commande } = route.params
        const [laoding, setLoading] = useState(false)
        var url
        if (serviceCategory == 1) {
                url = `/ecommerce/ecommerce_commandes/status_historiques/${commande.ID_COMMANDE}`
        } else if (serviceCategory == 2) {
                url = `/resto/restaurant_commandes/status_historiques/${commande.ID_COMMANDE}`
        }
        const [loadingStatus, status] = useFetch(url)

        const handleStatusPress = (ID_STATUT) => {
                Alert.alert("Changer le statut", "Voulez-vous vraiment changer le statut de cette commande ?",
                        [
                                {
                                        text: "Annuler",
                                        style: "cancel"
                                },
                                {
                                        text: "Oui", onPress: async () => {
                                                try {
                                                        setLoading(true)
                                                        if (serviceCategory == IDS_SERVICE_CATEGORIES.ecommerce) {
                                                                const userData = await fetchApi(`/ecommerce/ecommerce_commandes/update_status/${commande.ID_COMMANDE}`, {
                                                                        method: "PUT",
                                                                        body: JSON.stringify({
                                                                                ID_STATUT
                                                                        }),
                                                                        headers: { "Content-Type": "application/json" },
                                                                });
                                                        } else if (serviceCategory == IDS_SERVICE_CATEGORIES.resto) {
                                                                const userData = await fetchApi(`/resto/restaurant_commandes/update_status/${commande.ID_COMMANDE}`, {
                                                                        method: "PUT",
                                                                        body: JSON.stringify({
                                                                                ID_STATUT
                                                                        }),
                                                                        headers: { "Content-Type": "application/json" },
                                                                });
                                                        }
                                                        navigation.navigate('HomeScreen')
                                                } catch (error) {
                                                        console.log(error)
                                                } finally {
                                                        setLoading(false)
                                                }
                                        }
                                }
                        ])
        }

        return (
                <>
                        {/* {laoding && <Loading />} */}
                        <View style={styles.container}>
                                {loadingStatus ? <View>

                                </View> : <View style={styles.section}>
                                        {status.result.filter(t => t.ID_STATUT != 1).map((statut, index) => {
                                                return (
                                                        <TouchableOpacity style={styles.detail} key={index} onPress={() => handleStatusPress(statut.ID_STATUT)} disabled={statut.DATE_INSERTION ? true : false}>
                                                                <Text style={styles.detailTitle}>{statut.DESCRIPTION}</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {statut.DATE_INSERTION ? moment(statut.DATE_INSERTION).format('DD/MM/YYY HH:mm') : '-'}
                                                                </Text>
                                                        </TouchableOpacity>
                                                )
                                        })}
                                </View>}
                        </View>
                </>
        )
}

const styles = StyleSheet.create({
        container: {
                paddingHorizontal: 10,
                backgroundColor: '#E1EAF3',
                flex: 1
        },
        section: {
                backgroundColor: '#FFF',
                borderRadius: 8,
                marginTop: 10
        },
        sectionHeader: {
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: '#F1F1F1',
                paddingHorizontal: 10
        },
        sectionIcon: {
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#F1F1F1',
                borderRadius: 50
        },
        sectionTitle: {
                fontWeight: 'bold',
                marginLeft: 10
        },
        detail: {
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F1F1',
        },
        detailTitle: {
                fontWeight: 'bold',
                opacity: 0.8
        },
        detailValue: {
                color: '#777',
                fontSize: 12
        }
})