import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { useRoute } from "@react-navigation/native";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import Shop from "../../components/ecommerce/main/Shop";
import Restaurant from "../../components/restaurants/main/Restaurant";

export default function RestaurantScreen() {
    const route = useRoute()
    const { selectedCategorie: defautSelectedCategorie, selectedsousCategories: defautSelectedsousCategories } = route.params

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(defautSelectedCategorie)

    const [loadingSubCategories, setLoadingSubCategories] = useState(false)
    const [sousCategories, SetSousCategories] = useState([])
    const [selectedsousCategories, setSelectedsousCategories] = useState(defautSelectedsousCategories)

    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [products, setProducts] = useState([])

    const navigation = useNavigation()
    const { restaurants } = route.params
    // console.log(shops)


    return (
        <View style={styles.container}>

            <View style={styles.cardHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>

                        <View style={styles.productsHeader}>
                            <Ionicons name="arrow-back-sharp" size={24} color="black" /><Text>   </Text>
                            <Text style={styles.title}>Les restaurants</Text>

                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "bold", color: '#777', fontSize: 16, marginLeft: 10 }}>
                        {selectedCategorie ? selectedCategorie.NOM : products.NOM_ORGANISATION}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                        <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                    </TouchableOpacity>
                    <RestaurantBadge />
                </View>
            </View>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[1]}>
                <Text style={styles.titlePrincipal}></Text>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 10 }}>
                    </View>
                </View>
                <View style={styles.products}>
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

                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontWeight: 'bold'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

        marginTop: StatusBar.currentHeight,
        height: 60
    },
    menuOpener: {
        marginTop: 25
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5
    },
    shopsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },


    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    titlePrincipal: {
        fontSize: 0,
        fontWeight: "bold",
        marginBottom: 0,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
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
    DataImageCategorie: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: 10,
    },
})