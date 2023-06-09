import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StatusBar, StyleSheet, TouchableNativeFeedback, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { CategoriesSkeletons, RestaurantSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import Menu from "../../components/restaurants/main/Menu";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import Restaurants from "../../components/restaurants/home/Restaurants";
import { useForm } from "../../hooks/useForm";
import CategoriesResto from "../../components/restaurants/home/CategoriesResto";
import useFetch from "../../hooks/useFetch";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES";

export default function RestaurantHomeScreen() {
        const [loadingResto, restaurants] = useFetch(`/partenaires/partenaire_service?ID_SERVICE_CATEGORIE=${IDS_SERVICE_CATEGORIES.resto}`)
        const [categories, setCategories] = useState([])
        const [loadingCategories, setLoadingCatagories] = useState(true)
        const [menus, setMenus] = useState([])
        const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
        const [IsLoadingMore, setIsLoadingMore] = useState(false)
        const [offset, setOffset] = useState(0)

        const LIMIT = 10
        const navigation = useNavigation()
        const route = useRoute()

        const [nombreFiltre, setNombreFiltre] = useState(null)
        const [filtre, setFiltre] = useState({
                order_by: null,
                min_prix: null,
                max_prix: null,
                category: null
        })

        const [data, handleChange, setValue] = useForm({
                resto: "",
                menu: ""
        })

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

        const menuPress = () => {
                navigation.navigate("MenuScreen", { onSelectecategorie: false })
        }
        const fecthCategories = async () => {
                try {
                        const response = await fetchApi("/resto/restaurant_menus/restaurant_categorie_menu", {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setCategories(response.result)
                }
                catch (error) {
                        console.log(error)
                } finally {
                        setLoadingCatagories(false)
                }
        }


        const getMenus = async (offset = 0) => {
                try {
                        var url = `/resto/restaurant_menus?limit=${LIMIT}&offset=${offset}&`
                        if (nombreFiltre > 0) {
                                for (let key in filtre) {
                                        if (filtre[key]) {
                                                url += `&${key}=${filtre[key]}`
                                        }
                                }
                        }
                        return await fetchApi(url)
                }
                catch (error) {
                        console.log(error)
                }
        }

        useEffect(() => {
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
        }, [filtre])



        useFocusEffect(useCallback(() => {
                fecthCategories()
        }, []))

        useFocusEffect(useCallback(() => {
                (async () => {
                        const params = route.params || {}
                        const { countFiltre } = params
                        if (countFiltre > 0) {
                                setFiltre(params)
                                setNombreFiltre(countFiltre)
                        }
                })()
        }, [route]))

        return (
                <View style={styles.container}>
                        <View style={styles.cardHeader}>
                                <TouchableNativeFeedback
                                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                                        <View style={styles.menuOpener}>
                                                <View style={styles.menuOpenerLine} />
                                                <View style={[styles.menuOpenerLine, { width: 15 }]} />
                                                <View style={[styles.menuOpenerLine, { width: 25 }]} />
                                        </View>
                                </TouchableNativeFeedback>
                                <RestaurantBadge />
                        </View>
                        <ScrollView
                                onScroll={({ nativeEvent }) => {
                                        if (isCloseToBottom(nativeEvent) && !IsLoadingMore && offset <= 40) {
                                                onLoadMore()
                                        }
                                }}
                                style={styles.cardOrginal}
                        >
                                <Text style={styles.titlePrincipal}>Restauration</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 12, paddingHorizontal: 10, marginTop: 20 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate("SearchHistoryScreen", { service: 2 })} style={styles.searchSection} >
                                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                <Text style={styles.input}>Rechercher...</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.cardRecherche} onPress={() => navigation.navigate("AllFiltersScreen")}>
                                                {(nombreFiltre != null && nombreFiltre != 0) ? <View style={styles.cardNomreFiltre}>
                                                        <Text style={styles.actionBadgeText}>{nombreFiltre}</Text>
                                                </View> : null}
                                                <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                        </TouchableOpacity>
                                </View>

                                {loadingResto ? <RestaurantSkeletons /> : <Restaurants restaurants={restaurants.result} />}
                                {loadingCategories ? <CategoriesSkeletons /> : <CategoriesResto categories={categories} />}

                                {firstLoadingMenus ? <RestaurantSkeletons /> :
                                        <>
                                                <View style={styles.section}>
                                                        <Text style={styles.secionTitle}>Recommandé pour vous</Text>
                                                </View>
                                                <View style={styles.products}>
                                                        {menus.map((menu, index) => {
                                                                return (
                                                                        <Menu
                                                                                menu={menu}
                                                                                index={index}
                                                                                totalLength={menus.length}
                                                                                key={index}
                                                                                fixMargins
                                                                                IsLoadingMore={IsLoadingMore}
                                                                        />
                                                                )
                                                        })}
                                                </View>
                                        </>
                                }
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

        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: StatusBar.currentHeight,
                height: 60,
        },
        menuOpener: {
                padding: 10
        },
        menuOpenerLine: {
                height: 3,
                width: 30,
                backgroundColor: COLORS.ecommercePrimaryColor,
                marginTop: 5,
                borderRadius: 10
        },
        titlePrincipal: {
                fontSize: 23,
                fontWeight: "bold",
                marginBottom: "1%",
                color: COLORS.ecommercePrimaryColor,
                marginHorizontal: 10,
        },
        searchSection: {
                flexDirection: "row",
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: 'center',
                backgroundColor: '#fff',
                backgroundColor: "#D7D9E4",
                width: "84%",
                height: 50,
                paddingHorizontal: 10
        },
        input: {
                flex: 1,
                marginLeft: 10
        },
        cardRecherche: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: COLORS.ecommerceRed,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center'
        },
        emptyFeedback: {
                textAlign: "center",
                marginTop: -50,
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 16
        },
        section: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
                paddingVertical: 10,
                paddingHorizontal: 10
        },
        secionTitle: {
                color: COLORS.ecommercePrimaryColor,
                fontSize: 17,
                fontWeight: "bold"
        },
        cardOrginal: {
                marginBottom: "1%"
        },
        cardNomreFiltre: {
                minWidth: 20,
                minHeight: 18,
                backgroundColor: "#777",
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 3,
                marginLeft: 5
        },
        actionBadgeText: {
                color: '#FFF',
                fontSize: 12,
                marginTop: -2,
                fontWeight: "bold"
        },

})