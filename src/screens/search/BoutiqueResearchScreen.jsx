import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useForm } from "../../hooks/useForm";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES"
import { useFocusEffect, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import Shop from "../../components/ecommerce/main/Shop";
import { COLORS } from "../../styles/COLORS";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";

/**
 * screen de top tabs pour afficher la liste des boutiques en integrant la recherche
 * @author Vanny Boy <vannu@mediabox.bi>
 * @date 3/2/2023
 * @returns 
 */

export default function BoutiqueResearchScreen() {
        const [shops, setShops] = useState([])
        const [loadingShops, setLoadingShops] = useState(true)
        const route = useRoute()
        const { search } = route.params

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                const response = await fetchApi(`/partenaires/partenaire_service?ID_SERVICE_CATEGORIE=${IDS_SERVICE_CATEGORIES.ecommerce}&q=${search}&`)
                                setShops(response.result)
                        }
                        catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingShops(false)
                        }
                })()
        }, []))

        return (
                <View style={styles.container}>
                        <ScrollView>
                                {loadingShops ? <HomeProductsSkeletons /> :
                                        <View style={styles.products}>
                                                {shops.length > 0 ?
                                                        <>
                                                                {shops.map((shop, index) => {
                                                                        return (
                                                                                <Shop
                                                                                        shop={shop}
                                                                                        index={index}
                                                                                        totalLength={shops.length}
                                                                                        key={index}
                                                                                />
                                                                        )
                                                                })}
                                                        </> :
                                                        <View style={styles.cardImages}>
                                                                <Image source={require("../../../assets/images/no-result.png")} style={styles.imagesNotFound} />
                                                                <Text style={styles.emptyFeedback}>Aucun résultat trouvé</Text>
                                                        </View>}
                                        </View>}
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap'
        },
        emptyFeedback: {
                textAlign: "center",
                marginTop: 10,
                color: '#777',
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 16,
                marginTop: 20,
                marginHorizontal: 50
        },
        imagesNotFound: {
                width: 100,
                height: 100,
                marginTop: 40,
                marginHorizontal: 110,
                alignItems: "center",
                justifyContent: "center"
        },
        cardImages: {
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: 'center'
        }
})