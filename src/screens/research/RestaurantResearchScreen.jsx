import React, { useCallback, useState } from "react";
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback, Image } from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES";
import fetchApi from "../../helpers/fetchApi";
import Restaurant from "../../components/restaurants/main/Restaurant";
import { COLORS } from "../../styles/COLORS";
import { RestaurantSkeletons } from "../../components/ecommerce/skeletons/Skeletons";

/**
 * screen de top tabs pour afficher la listes des restaurants en integrant la recherches
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 3/2/2023
 * @returns 
 */

export default function RestaurantResearchScreen() {
    const route = useRoute()
    const { search } = route.params
    const [restaurants, setRestaurants] = useState([])
    const [loadingResto, setLoadingResto] = useState(true)

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                const response = await fetchApi(`/partenaires/partenaire_service?ID_SERVICE_CATEGORIE=${IDS_SERVICE_CATEGORIES.resto}&q=${search}&`)
                setRestaurants(response.result)
            }
            catch (error) {
                console.log(error)
            } finally {
                setLoadingResto(false)
            }
        })()
    }, []))

    return (
        <View style={styles.container}>
            <ScrollView >
                {loadingResto ? <RestaurantSkeletons /> :
                    <View style={styles.products}>
                        {restaurants.length > 0 ? <>
                            {restaurants.map((restaurant, index) => {
                                return (
                                    <Restaurant
                                        restaurant={restaurant}
                                        index={index}
                                        totalLength={restaurants.length}
                                        key={index}
                                    />
                                )
                            })}
                        </> :
                            <View style={styles.cardImages}>
                                <Image source={require("../../../assets/images/not-found.png")} style={styles.imagesNotFound} />
                                <Text style={styles.emptyFeedback}>Aucun restaurants trouvez</Text>
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
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16,
        marginTop: 40,
        marginHorizontal: 50
    },
    imagesNotFound: {
        width: 160,
        height: 160,
        marginTop: 40,
        marginHorizontal: 110,
        alignItems: "center",
        justifyContent: "center"
    },
    cardImages: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
    }
})