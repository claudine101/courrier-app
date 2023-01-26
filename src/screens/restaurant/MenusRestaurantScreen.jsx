import React, { useCallback, useRef, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback, TextInput } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { useRoute } from "@react-navigation/native";
// import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import MenuPartenaire from "../../components/restaurants/main/MenuPartenaire";
import LottieView from 'lottie-react-native';
import Restaurant from "../../components/restaurants/main/Restaurant";
import { Linking } from "react-native";
import ImageView from "react-native-image-viewing";
import * as Location from 'expo-location';
import { Modalize } from "react-native-modalize";
import { useForm } from "../../hooks/useForm";

import { CategoriesMenuSkeletons, CategoriesSkeletons, HomeMenuSkeletons, HomeProductsSkeletons, RestaurantSkeletons, restaurantSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import RestaurantHome from "../../components/restaurants/main/RestaurantHome";
import Menu from "../../components/restaurants/main/Menu";

export default function MenusRestaurantScreen() {
    const route = useRoute()
    const navigation = useNavigation()
    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [restaurants, setRestaurants] = useState([])
    const [wishlist, setWishlists] = useState(false)
    const [wishlistNumber, setWishlistsNumber] = useState(null)
    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [menus, setMenus] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [showImageModal, setShowImageModal] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)

    const modalizeRef = useRef(null)
    const CategoriemodalizeRef = useRef(null)
    const MenumodalizeRef = useRef(null)

    const { restaurant } = route.params
    var IMAGES = [
        restaurant.LOGO ? restaurant.LOGO : undefined,
        restaurant.BACKGROUND_IMAGE ? restaurant.BACKGROUND_IMAGE : undefined,
    ]
    const [data, handleChange, setValue] = useForm({
        resto: "",
        menu: ""
    })
    const onCartPress = () => {

        modalizeRef.current?.open()
    }

    const plusCategories = () => {

        CategoriemodalizeRef.current?.open()
    }
    const menuPress = () => {

        MenumodalizeRef.current?.open()
    }
    const Addishlist = async (id) => {
        if (wishlist) {
            try {

                const newWishlist = await fetchApi(`/wishlist/partenaire/suppression/${id}`, {
                    method: "DELETE",
                })
                setWishlists(false)


            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const form = new FormData()
                const newWishlist = await fetchApi('/wishlist/partenaire', {
                    method: 'POST',
                    body: JSON.stringify({
                        ID_PARTENAIRE_SRVICE: id,

                    }),
                    headers: { "Content-Type": "application/json" },
                })
                setWishlists(true)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        (async () => {

            try {
                if (firstLoadingMenus == false) {
                    // setLoadingMenus(true)
                }
                var url = "/partenaire/service/resto"
                const restaurant = await fetchApi(url)
                setRestaurants(restaurant.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
            }
        })()
    }, [])

    useEffect(() => {
        const fecthRestos = async (lat, long) => {
            try {
                // if (firstLoadingMenus == false) {
                //     setLoadingMenus(true)
                // }

                if (lat && long) {
                    return await fetchApi(`/partenaire/service/resto?lat=${lat}&long=${long}`)
                }
                return await fetchApi('/partenaire/service/resto')

            }
            catch (error) {
                throw error
            } finally {
                setFirstLoadingMenus(false)
            }
        }
        const askLocationFetchRestos = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                const restaurants = await fecthRestos()
                setLoadingRestos(false)
                setRestaurants(restaurants.result)
                return;
            }
            var location = await Location.getCurrentPositionAsync({});
            const restaurants = await fecthRestos(location.coords.latitude, location.coords.longitude)
            // setLoadingRestos(false)
            setRestaurants(restaurants.result)

        }
        askLocationFetchRestos()
    }, [])

    const fecthCategories = async () => {
        try {
            const response = await fetchApi(`/resto/menu/categories/${restaurant.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategories(response.result)
            // console.log(response)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingCatagories(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthCategories()
    }, []))

    const onCategoryPress = (categorie) => {

        // if (loadingSubCategories || loadingMenus) return false
        if (categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        CategoriemodalizeRef.current?.close()
    }

    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                var url = `${restaurant.ID_PARTENAIRE_SERVICE} `
                const menu = await fetchApi(url)
                setMenus(menu.result)

            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        })()
    }, [])



    const fecthWishlist = async () => {
        try {
            const wishlists = await fetchApi(`/wishlist/partenaire/verification/${restaurant.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            if (wishlists.result) {
                setWishlists(true)
            }
            else {
                setWishlists(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthWishlist()
    }, [restaurant]))

    const fecthNombreWishlist = async () => {
        try {
            const wishlists = await fetchApi(`/wishlist/partenaire/${restaurant.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setWishlistsNumber(wishlists.result)

        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthNombreWishlist()
    }, [wishlist]))
    return (
        <>
            <ScrollView>
                <TouchableWithoutFeedback key={1} onPress={() => {
                    setImageIndex(1)
                    setShowImageModal(true)
                }}>
                    <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                        <  Image source={{ uri: restaurant.LOGO }} style={{ ...styles.imagePrincipal }} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
                    <Ionicons name="ios-arrow-back-outline" size={40} color="white" style={{ ...styles.icon, marginTop: 20, marginHorizontal: 10 }} />
                </TouchableWithoutFeedback>

                <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "column", marginTop: 15 }}>
                        <Text style={{ fontWeight: "bold" }}>{restaurant.NOM_ORGANISATION}</Text>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <SimpleLineIcons name="location-pin" size={15} color="black" />
                            <Text style={{ fontSize:17 }}> {restaurant.ADRESSE_COMPLETE} </Text>
                        </View>
                    </View>

                    <View style={styles.carre}>
                        <Text style={{ fontSize:10, marginLeft: 12, color: "#797E9A", right: 15 }}>à {restaurant.DISTANCE ? restaurant.DISTANCE.toFixed(1) : null} Km</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        {wishlistNumber ?
                            <AntDesign name="star" size={20} color="#EFC519" /> :
                            <AntDesign name="star" size={20} color="#EFC519" />}
                        <Text style={{ fontSize: 17, marginLeft: 15, color: "#797E9A", right: 15 }}>{wishlistNumber?.Nbre}.0</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                        <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                        {restaurant.OUVERT ? <Text style={{ fontSize: 12, marginLeft: 2, color: "#797E9A" }}>{restaurant.OUVERT}</Text> : <Text style={{ color: "#797E9A" }}>7h-18h</Text>}
                    </View>
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${restaurant.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                        <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                        <Text style={{ fontSize: 17, marginLeft: 20, color: "#797E9A", right: 15 }}>{restaurant.TELEPHONE}</Text>
                    </TouchableOpacity>

                </View>
                <View style={{ marginTop: 10, marginHorizontal: 10 }} >

                    {restaurant.PRESENTATION ? <Text style={{ color: "#797E9A" }}>{restaurant.PRESENTATION}</Text> :
                        <Text style={{ color: "#797E9A" }}>
                            the best hotel for me, I stayed there for two weeks I really enjoyed its great location. I loved the character of the hotel. The restaurant was fantastic and the staff was friendly. Well maintained rooms, comfortable bed, and great Cafe.
                        </Text>}
                </View>

                <TouchableOpacity onPress={plusCategories} style={styles.plus1}>
                    <View>
                        <Text style={styles.plusText}>Categories</Text>
                    </View>
                    <View style={{ marginLeft: 100 }}>
                        <View>
                            <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <CategoriesMenuSkeletons /> : */}
                <ScrollView
                    style={styles.shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.categories}>
                        {categories.map((categorie, index) => {
                            return (

                                <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                    <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                        <Image source={{ uri: categorie.IMAGE }} style={[styles.DataImageCategorie, , { opacity: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? 0.2 : 1 }]} />
                                    </View>
                                    <Text style={[{ fontSize: 15, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                    {categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU && <View style={[styles.categoryChecked, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU }]}>
                                        <AntDesign style={{ marginTop: 20, marginLeft: 20, color: COLORS.ecommercePrimaryColor }} name="check" size={40} color='#000' />
                                    </View>}
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                {/* } */}
                <TouchableOpacity onPress={menuPress} style={styles.plus}>

                    <View>
                        <Text style={styles.plusText}>Menus</Text>
                    </View>
                    <View style={{ marginLeft: 100 }}>
                        <View>
                            <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{}}>
                    {(firstLoadingProducts || loadingProducts) ? <HomeProductsSkeletons wrap /> :
                        menus.length != 0 ?
                            <ScrollView
                                style={styles.shops}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {menus.map((menu, index) => {
                                    
                                    return (
                                        <MenuPartenaire
                                            menu={menu}
                                            menus={menus}
                                            index={index}
                                            totalLength={menus.length}
                                            key={index}
                                            fixMargins
                                        />
                                    )
                                })}
                            </ScrollView> :
                            <>
                                <LottieView style={{ marginVertical: -20, width: 100, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/123725-box-empty.json')} autoPlay loop={false} />
                                {/* <LottieView style={{ width: 100, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/10000-empty-box.json')} autoPlay loop={false} /> */}
                                <Text style={styles.emptyFeedback}>Aucun menu</Text>
                            </>
                    }
                </View>
                <TouchableOpacity onPress={onCartPress} style={styles.plus}>
                    <View>
                        <Text style={styles.plusText}>Les plus proches</Text>
                    </View>
                    <View style={{ marginLeft: 100 }}>
                        <View>
                            <AntDesign name="arrowright" size={24} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                {(firstLoadingProducts) ? <HomeProductsSkeletons wrap /> :
                    restaurants.length != 0 &&
                    <ScrollView
                        style={styles.shops}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            restaurants.map((restaurant, index) => {
                                return (
                                    <Restaurant
                                        restaurant={restaurant}
                                        restaurants={restaurants}
                                        index={index}
                                        totalLength={restaurants.length}
                                        key={index}
                                        note={wishlistNumber}

                                    />
                                )
                            })}
                    </ScrollView>
                }
                {showImageModal &&
                    <ImageView
                        images={IMAGES.map(img => ({ uri: img }))}
                        imageIndex={imageIndex}
                        visible={showImageModal}
                        onRequestClose={() => setShowImageModal(false)}
                        swipeToCloseEnabled
                        keyExtractor={(_, index) => index.toString()}
                    />
                }

            </ScrollView>
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
                // handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    // paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}

            >
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, marginBottom: 40, textAlign: 'center', opacity: 0.7 }}>Nos restaurants</Text>
                <View style={styles.searchSection1}>
                    <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                    <TextInput
                        style={styles.input}
                        value={data.resto}
                        onChangeText={(newValue) => handleChange('resto', newValue)}
                        placeholder="Rechercher "
                    />
                </View>
                <ScrollView >

                    <View style={styles.resto}>
                        {restaurants.map((restaurant, index) => {
                            return (

                                <RestaurantHome
                                    restaurant={restaurant}
                                    index={index}
                                    totalLength={restaurants.length}
                                    key={index}
                                />
                            )
                        })}
                    </View>
                </ScrollView>
            </Modalize>
            <Modalize
                ref={CategoriemodalizeRef}
                adjustToContentHeight
                handlePosition='inside'
                modalStyle={{
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    paddingVertical: 20
                }}
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}
                onClosed={() => {
                    setIsOpen(false)
                    // setLoadingForm(true)
                }}
            >
                <ScrollView>
                    <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Nos catégories</Text>
                    <View style={styles.resto}>
                        {categories.map((categorie, index) => {
                            return (
                                <View style={{ ...styles.categoryModel, margin: 15 }} >
                                    <View style={styles.actionIcon}>
                                        <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage}>

                                            {/* <View style={styles.disbaledContainer}>
                                                    <View style={styles.checkIndicator}>
                                                        <AntDesign name="check" size={24} color='#000' />
                                                    </View>
                                                </View> */}
                                        </ImageBackground>
                                    </View>
                                    <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </Modalize>
            <Modalize
                ref={MenumodalizeRef}
                adjustToContentHeight
                handleStyle={{ marginTop: 10 }}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "handled"
                }}

            >
                <Text style={{ marginBottom: 10, marginBottom: 30, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Nos menus</Text>
                <View style={styles.searchSection1}>
                    <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                    <TextInput
                        style={styles.input}
                        value={data.menu}
                        onChangeText={(newValue) => handleChange('menu', newValue)}
                        placeholder="Rechercher "
                    />
                </View>
                {(firstLoadingMenus) ?
                    <>
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                    </> :
                    <ScrollView>

                        <View style={styles.products}>

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
                        </View>
                    </ScrollView>
                }
            </Modalize>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    carre: {
        padding: 15,
        height: 50,
        width: 100,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
    },
    plus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: "-3%"
    },
    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "2%",
        paddingHorizontal: 10,
        marginBottom: "-1 %"
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16
    },
    imageCard: {
        backgroundColor: "white",
        flex: 1,
        // marginTop: 100
    },
    menuCard: {
        backgroundColor: "#D7D9E4",
    },
    imagePrincipal:
    {
        width: '120%',
        height: 280,
        alignSelf: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    resto: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    category: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        marginRight: -12.6,
        backgroundColor: 'white',
        borderRadius: 10
    },
    categoryPhoto: {
        width: 80,
        height: 70,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    categoryChecked: {
        width: 80,
        height: 85,
        borderRadius: 8,
        marginTop: -80

    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryPhotoResto: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    searchSection1: {
        flexDirection: "row",
        marginTop: -20,
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
        width: "84%",
        height: 50,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    icon: {
        width: 50,
        top: 30,
        position: 'absolute',
        marginRight: 10,
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLike: {
        // marginTop: "-65%",
        // maxWidth: 50,
        // left: "80%",
        // backgroundColor: "white",

        // borderRadius: 5,
        // justifyContent: "center",
        // alignItems: "center"
    },
    txtDisplay: {
        color: "#797E9A",
    }
    ,
    serviceIcon: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DataImageCategorie: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
        width: 60,
        height: 60,
        //backgroundColor: "#242F68",
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 2,
        // marginTop:-10
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 1
    },
   
    categoryPhoto: {
        backgroundColor: COLORS.skeleton,
        width: 80,
        height: 70,
        borderRadius: 8,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryChecked: {
        width: 80,
        height: 85,
        borderRadius: 8,
        marginTop: -80

    },
    categoryPhotoResto: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    category: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        marginTop: 5,
        backgroundColor: "#F5F4F1",

    },
    serviceName: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 16
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
    title: {
        fontWeight: 'bold'
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -20
    },
    shops: {
        paddingHorizontal: 10,
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

    

    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "2%",
        paddingHorizontal: 10,
        marginBottom: "-1 %"
    },
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16,
        marginTop: -40,
    },
})