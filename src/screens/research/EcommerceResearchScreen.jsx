import React, { useCallback } from "react";
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import Product from "../../components/ecommerce/main/Product";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { useContext } from "react";
import SearchContext from "../../context/searchContext";
import LottieView from "lottie-react-native";
import { useState } from "react";
import fetchApi from "../../helpers/fetchApi";

/**
 * screen de top Tabs pour afficher la listes des produits avec une recherche
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 3/2/2023
 * @returns 
 */


export default function EcommerceResearchScreen() {
    const [drawr, setDrawr] = useState(true)
    // const { products, firstLoadingProducts, loadingProducts } = useContext(SearchContext)
    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const route = useRoute()
    const { search } = route.params

    const [products, setProducts] = useState([])
    const [offset, setOffset] = useState(0)
    const [IsLoadingMore, setIsLoadingMore] = useState(false)
    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)

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

    const getProducts = useCallback(async (offset = 0) => {
        try {
            var url = `/ecommerce/ecommerce_produits?limit=${LIMIT}&offset=${offset}&q=${search}&`
            return await fetchApi(url)
        }
        catch (error) {
            console.log(error)
        }

    }, [])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                setOffset(0)
                const produts = await getProducts(0)
                setProducts(produts.result)
            } catch (error) {
                console.log(error)
            }finally{
                setFirstLoadingProducts(false)
            }
        })()
    }, []))

    return (
        <View style={styles.container}>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !IsLoadingMore && offset <= 40) {
                        onLoadMore()
                    }
                }}
            >
                { firstLoadingProducts ? <HomeProductsSkeletons/>:
                <View style={styles.products}>
                    {products.length > 0 ?
                        <>
                            {products.map((product, index) => {
                                return (
                                    <Product
                                        product={product}
                                        index={index}
                                        totalLength={products.length}
                                        key={index}
                                        fixMargins
                                    />
                                )
                            })}
                        </> :
                        <View style={styles.cardImages}>
                            <Image source={require("../../../assets/images/not-found.png")} style={styles.imagesNotFound}/>
                            <Text style={styles.emptyFeedback}>Aucun produits trouvez</Text>
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
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16,
        marginTop: 40,
        marginHorizontal: 40
    },
    cardOrginal: {
        marginBottom: "1%"
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imagesNotFound:{
        width: 160,
        height: 160,
        marginTop: 40,
        marginHorizontal: 110,
        alignItems: "center",
        justifyContent: "center"
    },
    cardImages:{
        flex:1,
        height:"100%",
        justifyContent:"center",
    }
})