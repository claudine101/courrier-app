import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";
import { RestaurantSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import Menu from "../../components/restaurants/main/Menu";
import fetchApi from "../../helpers/fetchApi";
import { COLORS } from "../../styles/COLORS";

/**
 * screen de top tabs pour afficher tous les menus en integrant la recherche de menus
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 3/2/2023
 * @returns 
 */

export default function MenusResearchScreen() {
        const route = useRoute()
        const { search } = route.params

        const [menus, setMenus] = useState([])
        const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
        const [IsLoadingMore, setIsLoadingMore] = useState(false)
        const [offset, setOffset] = useState(0)

        const LIMIT = 10

        const navigation = useNavigation()

        const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }) => {
                const paddingToBottom = 20;
                return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        }, []);

        const onLoadMore = async () => {
                try {
                        setIsLoadingMore(true)
                        const newOffset = offset + LIMIT
                        const men = await getMenus(newOffset)
                        setOffset(newOffset)
                        setMenus(m => [...m, ...men.result])
                } catch (error) {
                        console.log(error)
                } finally {
                        setIsLoadingMore(false)
                }
        }

        const getMenus = useCallback(async (offset = 0) => {
                try {
                        var url = `/resto/restaurant_menus?limit=${LIMIT}&offset=${offset}&q=${search}&`
                        return await fetchApi(url)
                }
                catch (error) {
                        console.log(error)
                }
        })

        useFocusEffect(useCallback(() => {
                (async () => {
                        try {
                                setOffset(0)
                                const menus = await getMenus(0)
                                setMenus(menus.result)
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setFirstLoadingMenus(false)
                        }
                })()
        }, []))

        return (
                <View style={styles.container}>
                        <ScrollView style={styles.cardOrginal}
                                onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent) && !IsLoadingMore && offset <= 40) {
                                                onLoadMore()
                                        }
                                }}
                        >
                                {firstLoadingMenus ? <RestaurantSkeletons /> :
                                        <View style={styles.products}>
                                                {menus.length > 0 ?
                                                        <>
                                                                {menus.map((menu, index) => {
                                                                        return (
                                                                                <Menu
                                                                                        menu={menu}
                                                                                        index={index}
                                                                                        totalLength={menus.length}
                                                                                        key={index}
                                                                                        fixMargins

                                                                                />
                                                                        )
                                                                })}
                                                        </> :
                                                        <View style={styles.cardImages}>
                                                                <Image source={require("../../../assets/images/not-found.png")} style={styles.imagesNotFound} />
                                                                <Text style={styles.emptyFeedback}>Aucun menus trouvez</Text>
                                                        </View>}
                                        </View>}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, opacity: IsLoadingMore ? 1 : 0 }}>
                                        <ActivityIndicator animating={true} size="large" color={"#000"} />
                                </View>
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardOrginal: {
                marginBottom: "1%"
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