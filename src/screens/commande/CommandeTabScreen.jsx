import React, { useCallback, useRef } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import { AntDesign, Feather, MaterialCommunityIcons, Zocial } from '@expo/vector-icons';
import { Modalize } from "react-native-modalize";
import { COLORS } from "../../styles/COLORS"
import { useRoute } from "@react-navigation/native";
import useFetch from "../../hooks/useFetch";

export default function CommandeTabScreen() {
        const modalizeRef = useRef(null)
        const route = useRoute()
        const { commande, serviceCategory } = route.params
        console.log(commande)
        var url

        if(serviceCategory==1){
                url=`/ecommerce/ecommerce_commandes/livraison/${commande.ID_COMMANDE}`
        }else if(serviceCategory==2){
                url=`/resto/restaurant_commandes/livraison/${commande.ID_COMMANDE}`
        }

        const [loadingDetails, details] = useFetch(url)

        const getPieceTotal = useCallback(() => {
                var PIECES_TOTAL = 0
                commande.details.forEach(commande => {
                        PIECES_TOTAL += commande.QUANTITE
                })
                return PIECES_TOTAL
        }, [commande])

        return (
                <>
                        <ScrollView>
                                {commande.details.map((item, index) => {
                                        return (
                                                <TouchableWithoutFeedback key={index}>
                                                        <View style={styles.product}>
                                                                <View style={styles.productImage}>
                                                                        <Image source={{ uri: item.IMAGE_1 }} style={styles.image} />
                                                                </View>
                                                                <View style={styles.productDetails}>
                                                                        <View style={styles.detailsHeader}>
                                                                                <View style={styles.productNames}>
                                                                                        <Text numberOfLines={2} style={styles.productName}>
                                                                                                {item.NOM}
                                                                                        </Text>
                                                                                </View>
                                                                        </View>
                                                                        {false && <View style={styles.variants}>
                                                                                <View style={styles.variant}>
                                                                                        <Text style={styles.variantName}>Couleur</Text>
                                                                                        <Text style={styles.variantValue}>Jaune</Text>
                                                                                </View>
                                                                                <View style={styles.variant}>
                                                                                        <Text style={styles.variantName}>Taille</Text>
                                                                                        <Text style={styles.variantValue}>M</Text>
                                                                                </View>
                                                                        </View>}
                                                                        <View style={styles.quantityUnitPrice}>
                                                                                <Text style={styles.quantity}>
                                                                                        {item.QUANTITE} pièce{item.QUANTITE > 1 && 's'} ×
                                                                                        {item.MONTANT ? item.MONTANT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : item.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                                                                </Text>
                                                                                <Text style={styles.unitPrice}>{item.SOMME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU</Text>
                                                                        </View>
                                                                </View>
                                                        </View>
                                                </TouchableWithoutFeedback>
                                        )
                                })}
                        </ScrollView>
                        <Modalize
                                ref={modalizeRef}
                                alwaysOpen={110}
                                modalStyle={styles.servicesContainer}
                                handleStyle={{ backgroundColor: '#D6ECEC', marginTop: 5 }}
                                handlePosition="inside"
                                withOverlay
                                modalHeight={420}
                                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                                dragToss={1}>
                                <View style={styles.commandFooter}>
                                        <View style={styles.mainDetails}>
                                                <View style={styles.mainDetail}>
                                                        <Text style={styles.mainDetailValue}>
                                                                {getPieceTotal()}
                                                        </Text>
                                                        <Text style={styles.mainDetailLabel}>
                                                                Pièce{getPieceTotal() > 1 && 's'}
                                                        </Text>
                                                </View>
                                                <View style={[styles.mainDetail, { marginHorizontal: 10 }]}>
                                                        <Text style={styles.mainDetailValue}>

                                                                <View style={styles.mainDetail}>
                                                                        <Text style={styles.mainDetailValue}>
                                                                                {commande.TOTAL.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU
                                                                        </Text>
                                                                        <Text style={styles.mainDetailLabel}>
                                                                                TOTAL
                                                                        </Text>
                                                                        {/* <Text style={styles.mainDetailLabel}>
                                                                                Livraison
                                                                        </Text> */}
                                                                </View>          
                                                        </Text>
                                                </View>
                                        </View>
                                        {!loadingDetails ? <View style={styles.fullDetails}>
                                                <View style={styles.detail}>
                                                        <View style={styles.detailIcon}>
                                                                <AntDesign name="user" size={24} color="#777" />
                                                        </View>
                                                        <View style={styles.titleValue}>
                                                                <Text style={styles.detailTitle}>Client</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {details.result.livraison.CLIENT_NOM} {details.result.livraison.CLIENT_PRENOM}
                                                                </Text>
                                                        </View>
                                                </View>
                                                <View style={styles.detail}>
                                                        <View style={styles.detailIcon}>
                                                                <Feather name="map-pin" size={24} color="#777" />
                                                        </View>
                                                        <View style={styles.titleValue}>
                                                                <Text style={styles.detailTitle}>Adresse du partenaire</Text>
                                                                <Text style={styles.detailValue}>{details.result.livreur.ADDRESSE_PICKER}</Text>
                                                        </View>
                                                </View>
                                                <View style={styles.detail}>
                                                        <View style={styles.detailIcon}>
                                                                <Feather name="map-pin" size={24} color="#777" />
                                                        </View>
                                                        <View style={styles.titleValue}>
                                                                <Text style={styles.detailTitle}>Adresse de destination</Text>
                                                                <Text style={styles.detailValue}>{details.result.livraison.ADRESSE}</Text>
                                                        </View>
                                                </View>
                                                <View style={[styles.detail]}>
                                                        <View style={styles.detailIcon}>
                                                                <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#777" />
                                                        </View>
                                                        <View style={styles.titleValue}>
                                                                <Text style={styles.detailTitle}>Livreur</Text>
                                                                <Text style={styles.detailValue}>
                                                                        {details.result.livreur.NOM} {details.result.livreur.PRENOM}
                                                                </Text>
                                                        </View>
                                                </View>
                                                <View style={styles.detail}>
                                                        <View style={styles.detailIcon}>
                                                                <Zocial name="statusnet" size={24} color="#777" />
                                                        </View>
                                                        <View style={styles.titleValue}>
                                                                <Text style={styles.detailTitle}>Statut actuel</Text>
                                                                <Text style={styles.detailValue}>{commande.NEXT_STATUS}</Text>
                                                        </View>
                                                </View>
                                        </View> : null}
                                </View>
                        </Modalize>
                </>
        )
}

const styles = StyleSheet.create({
        product: {
                flexDirection: 'row',
                height: 120,
                marginTop: 10,
                backgroundColor: '#FFF',
                padding: 10,
                borderRadius: 8
        },
        productImage: {
                height: "100%",
                width: "28%",
                borderRadius: 10,
                backgroundColor: '#F1F1F1'
        },
        image: {
                height: "100%",
                width: "100%",
                borderRadius: 10,
                resizeMode: 'contain'
        },
        productDetails: {
                marginLeft: 10,
                justifyContent: 'space-between',
                flex: 1
        },
        productNames: {
        },
        quantityUnitPrice: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        quantity: {
                color: '#777',
                fontSize: 12
        },
        variant: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        variantName: {
                color: '#777',
                fontSize: 12
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        unitPrice: {
                fontWeight: 'bold'
        },
        commandFooter: {
                marginTop: 10
        },
        fullDetails: {
                backgroundColor: '#f2f6f7',
                borderRadius: 10,
                marginTop: 10,
                paddingHorizontal: 10,
                paddingBottom: 10
        },
        detail: {
                flexDirection: 'row',
                alignItems: "center",
                marginTop: 10
        },
        detailIcon: {
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: '#FFFF'
        },
        titleValue: {
                marginLeft: 10
        },
        detailTitle: {
                fontWeight: 'bold'
        },
        detailValue: {
                color: '#777'
        },
        mainDetails: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        mainDetail: {
                backgroundColor: '#f2f6f7',
                borderRadius: 10,
                padding: 10,
                flex: 1
        },
        mainDetailValue: {
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 12
        },
        mainDetailLabel: {
                textAlign: 'center',
                color: '#777',
                fontSize: 12
        },
        servicesContainer: {
                elevation: 10,
                shadowColor: '#000',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingVertical: 20,
                paddingHorizontal: 10,
                backgroundColor: '#fff'
        },
})