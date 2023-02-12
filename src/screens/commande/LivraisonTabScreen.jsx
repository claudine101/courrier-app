import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"

export default function LivraisonTabScreen() {
        const route = useRoute()
        const { commande, serviceCategory } = route.params
        var url
        if(serviceCategory==1){
                url=`/ecommerce/ecommerce_commandes/livraison/${commande.ID_COMMANDE}`
        }else if(serviceCategory==2)(
                url=`/resto/restaurant_commandes/livraison/${commande.ID_COMMANDE}`
        )
        const [loadingDetails, details] = useFetch(url)
        return (
                <View style={styles.container}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                                {loadingDetails ? <View></View> :
                                        <>
                                                <View style={styles.section}>
                                                        <View style={styles.sectionHeader}>
                                                                <View style={styles.sectionIcon}>
                                                                        <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#000" />
                                                                </View>
                                                                <Text style={styles.sectionTitle}>
                                                                        Adresse
                                                                </Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Adresse du partenaire</Text>
                                                                <Text style={styles.detailValue}>{details.result.livreur.ADDRESSE_PICKER}</Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Adresse de destination</Text>
                                                                <Text style={styles.detailValue}>{details.result.livraison.ADRESSE}</Text>
                                                        </View>
                                                </View>
                                                <View style={styles.section}>
                                                        <View style={styles.sectionHeader}>
                                                                <View style={styles.sectionIcon}>
                                                                        <AntDesign name="user" size={24} color="#000" />
                                                                </View>
                                                                <Text style={styles.sectionTitle}>
                                                                        Client
                                                                </Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Nom du client</Text>
                                                                <Text style={styles.detailValue}>{details.result.livraison.CLIENT_NOM} {details.result.livraison.CLIENT_PRENOM}</Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Destinataire de la commande</Text>
                                                                <Text style={styles.detailValue}>{details.result.livraison.NOM} {details.result.livraison.PRENOM}</Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Sexe</Text>
                                                                <Text style={styles.detailValue}>-</Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Numéro de téléphone</Text>
                                                                <Text style={styles.detailValue}>{details.result.livraison.TELEPHONE}</Text>
                                                        </View>
                                                </View>
                                                <View style={styles.section}>
                                                        <View style={styles.sectionHeader}>
                                                                <View style={styles.sectionIcon}>
                                                                        <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#000" />
                                                                </View>
                                                                <Text style={styles.sectionTitle}>
                                                                        Livreur
                                                                </Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Nom du livreur</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {details.result.livreur.NOM} {details.result.livreur.PRENOM}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Voiture</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {details.result.livreur.MODELE} - {details.result.livreur.MARQUE}
                                                                </Text>
                                                        </View>
                                                        <View style={styles.detail}>
                                                                <Text style={styles.detailTitle}>Numéro de la plque</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {details.result.livreur.NUMERO_PLAQUE}
                                                                </Text>
                                                        </View>
                                                </View>
                                        </>}
                        </ScrollView>
                </View>
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