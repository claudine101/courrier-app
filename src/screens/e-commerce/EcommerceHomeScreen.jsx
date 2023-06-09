import React, { useCallback, useState } from "react";
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesSkeletons, HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import useFetch from "../../hooks/useFetch";
import Categories from "../../components/ecommerce/home/Categories";
import IDS_SERVICE_CATEGORIES from "../../constants/IDS_SERVICE_CATEGORIES";
import { useEffect } from "react";

/**
 * Screen de home pour afficher les boutiques, les categories et les produits recommande pour vous
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 18/01/2023
 * @returns 
 */

export default function EcommerceHomeScreen() {
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [loadingAllProducts, setLoadingAllProducts] = useState(true)
    const [products, setProducts] = useState([])
    const [productsCommande, setProductCommandes] = useState([])

    const [loadingShops, shops] = useFetch(`/partenaires/partenaire_service?ID_SERVICE_CATEGORIE=${IDS_SERVICE_CATEGORIES.ecommerce}`)
    const [loadingCategories, categories] = useFetch('/ecommerce/ecommerce_produits/ecommerce_produit_categorie')
    const [IsLoadingMore, setIsLoadingMore] = useState(false)
    const [offset, setOffset] = useState(0)
    const navigation = useNavigation()
    const route = useRoute()
    const [nombreFiltre, setNombreFiltre] = useState(null)
    const [filtre, setFiltre] = useState({
        order_by: null,
        min_prix: null,
        max_prix: null,
        category: null
    })


    const LIMIT = 10

    const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }, []);
    const onLoadMore = async () => {
        try {
            setIsLoadingMore(true)
            const newOffset = offset + LIMIT
            const pts = await getProducts(newOffset)
            setOffset(newOffset)
            setProducts(p => [...p, ...pts.result])
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingMore(false)
        }
    }
    const getProducts = async (offset = 0) => {
        try {
            var url = `/ecommerce/ecommerce_produits?limit=${LIMIT}&offset=${offset}`
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
                const produts = await getProducts(0)
                setProducts(produts.result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingAllProducts(false)
            }
        })()
    }, [filtre])

    const getProductsCommandes = useCallback(async (offset = 0) => {
        var url = "/products/commande"
        return await fetchApi(url)
    }, [])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                setOffset(0)
                const produts = await getProductsCommandes(0)
                setProductCommandes(produts.result)
            } catch (error) {
                console.log(error)
            }
        })()
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
                <EcommerceBadge />
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !IsLoadingMore && offset <= 40) {
                        onLoadMore()
                    }
                }}
                style={styles.cardOrginal}>

                <Text style={styles.titlePrincipal}>Achat de produits</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 12, paddingHorizontal: 10 }}>
                    <View style={{ width: "84%" }}>
                        <TouchableNativeFeedback useForeground onPress={() => {
                            navigation.navigate("SearchHistoryScreen", { service: 1 })
                        }}>
                            <View style={styles.searchSection} >
                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                <Text style={styles.input}>Rechercher...</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("AllFiltersScreen")}>
                        <View style={styles.cardRecherche}>
                            {(nombreFiltre != null && nombreFiltre != 0) ? <View style={styles.cardNomreFiltre}>
                                <Text style={styles.actionBadgeText}>{nombreFiltre}</Text>
                            </View> : null}
                            <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                        </View>
                    </TouchableOpacity>

                </View>
                {loadingShops ? <HomeProductsSkeletons /> : <Shops shops={shops.result} />}
                {loadingCategories ? <CategoriesSkeletons /> : <Categories categories={categories.result} />}
                {loadingProducts ? <HomeProductsSkeletons /> :
                    productsCommande.length > 0 ? <HomeProducts products={productsCommande} title="Les plus achetés" /> : null
                }
                <View style={styles.section}>
                    <Text style={styles.secionTitle}>Recommandé pour vous</Text>
                </View>
                <View style={styles.products}>
                    {loadingAllProducts ? <HomeProductsSkeletons /> :
                    <>
                        {products.map((product, index) => {
                            return (
                                <Product
                                    product={product}
                                    index={index}
                                    totalLength={products.length}
                                    key={index}
                                    fixMargins
                                    IsLoadingMore={IsLoadingMore}
                                />
                            )
                        })}
                    </>}

                </View>
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
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 2,
        // marginTop:-10
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    actionIcon: {
        borderRadius: 15,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    searchSection1: {
        flexDirection: "row",
        marginTop: -20,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: "white",
        width: "95%",
        height: 50,
        marginHorizontal: 10,
        paddingHorizontal: 10

    },
    bout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    cate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    imgBackground: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    cardOrginal: {
        marginBottom: "1%"
    },
    titlePrincipal: {
        fontSize: 23,
        fontWeight: "bold",
        marginBottom: 12,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
    },

    searchSection: {
        flexDirection: "row",
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: "#D7D9E4",
        width: "100%",
        height: 50,
        paddingHorizontal: 10,
        overflow: 'hidden'
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
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    DataImageCategorie: {
        borderRadius: 10,
        width: '80%',
        height: '80%',
    },
    cardPhoto1: {
        marginTop: 10,
        width: 50,
        height: 50,
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardPhoto: {
        marginTop: 10,
        width: 50,
        height: 50,
        //backgroundColor: "#242F68",
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    title: {
        fontWeight: 'bold'
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
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