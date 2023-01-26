import React, { useRef } from 'react'
import { Image, StyleSheet, ImageBackground, Text, TouchableOpacity, useWindowDimensions, TouchableWithoutFeedback, View, TouchableNativeFeedback } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import AddCart from './AddCart';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ecommerceProductSelector } from '../../../store/selectors/ecommerceCartSelectors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { restaurantProductSelector } from '../../../store/selectors/restaurantCartSelectors';
import { useCallback } from 'react';
import fetchApi from '../../../helpers/fetchApi';

export default function Menu({ menu, index, totalLength, fixMargins = false, onRemove }) {
    const navigation = useNavigation()
    const { width } = useWindowDimensions()
    const PRODUCT_MARGIN = 10
    const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 5
    const PRODUCT_HEIGHT = 270
    const additionStyles = {
        width: PRODUCT_WIDTH,
        height: PRODUCT_HEIGHT,
        marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
        marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
    }

    const modalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)
    const [wishlist, setWishlist] = useState(false)
    const fecthWishlist = async () => {
        try {
            const wishliste = await fetchApi(`/wishlist/restaurant/verification/${menu.ID_RESTAURANT_MENU}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            // console.log(wishliste.result)
            if (wishliste.result) {
                setWishlist(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        fecthWishlist()
    }, []))


    const Addishlist = async (id) => {
        //  console.log(id)
        if (wishlist) {
            try {
                const newWishlist = await fetchApi(`/wishlist/restaurant/suppression/${id}`, {
                    method: "DELETE",
                })
                if (onRemove) {
                    onRemove(id)
                }
                setWishlist(false)

            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const form = new FormData()
                const newWishlist = await fetchApi('/wishlist/restaurant', {
                    method: 'POST',
                    body: JSON.stringify({
                        ID_RESTAURANT_MENU: id,

                    }),
                    headers: { "Content-Type": "application/json" },
                })
                setWishlist(true)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }
    const onCloseAddToCart = () => {
        modalizeRef.current?.close()
    }
    const MenuInCart = useSelector(restaurantProductSelector(menu.ID_RESTAURANT_MENU))
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setLoadingForm(false)
            })
            return () => {
                clearTimeout(timer)
            }
        }
    }, [isOpen])
    return (
        <TouchableWithoutFeedback onPress={() => navigation.push('MenuDetailScreen', { product: menu })}>
            <View key={index} style={[styles.product, additionStyles]}>
                <View style={styles.imageCard}>
                    <Image source={{ uri: menu.produit.IMAGE }} style={styles.image} />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            Addishlist(menu.ID_RESTAURANT_MENU)
                            setWishlist(true)
                        }}
                    >
                        <View style={styles.cardLike}>
                            {wishlist ? <AntDesign name="heart" size={24} color="#F29558" /> : <AntDesign name="hearto" size={24} color="#F29558" />}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
                        <>
                            <AntDesign name="shoppingcart" size={24} color="#F29558" />
                            {MenuInCart ? <View style={styles.badge}>
                                <Text style={styles.badgeText} numberOfLines={1}>{MenuInCart.QUANTITE}</Text>
                            </View> : null}
                        </>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "#F29558", fontWeight: "bold" }}>{menu.produit.NOM}</Text>
                {menu.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{menu.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}

                <Portal>
                    <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                        <Modalize
                            ref={modalizeRef}
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
                                setLoadingForm(true)
                            }}
                        >
                            <AddCart 
                                menu={menu} 
                                loadingForm={loadingForm} 
                                onClose={onCloseAddToCart} />
                        </Modalize>
                    </GestureHandlerRootView>
                </Portal>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    productName1: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    serviceBackgound: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',

    },
    product: {
        maxWidth: 240,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#919191',
        borderRadius: 10,
        padding: 5,
        marginTop:10
},
    imageCard: {
        borderRadius: 8,
        height: "60%",
        width: "100%"
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 8,
        resizeMode: 'contain'
    },
    cardLike: {
        marginTop: 10,
        width: 35,
        height: 35,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cartBtn: {
        marginTop: 10,
        width: 35,
        height: 35,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8
    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: -5,
        right: -10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
    },
    productName: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "400",
        fontSize: 13
    }
})