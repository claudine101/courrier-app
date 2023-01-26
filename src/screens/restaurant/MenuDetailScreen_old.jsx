import React, { useCallback, useState, useEffect, useRef } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback, ScrollView, StatusBar } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { Modalize } from "react-native-modalize";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import fetchApi from "../../helpers/fetchApi";
import ProduitRestoPartenaire from "../../components/restaurants/home/ProduitRestoPartenaire";
import Menu from "../../components/restaurants/main/Menu";
import { HomeProductsSkeletons } from "../../components/restaurants/skeletons/SkeletonsResto";
import { restaurantProductSelector } from "../../store/selectors/restaurantCartSelectors"
import AddCart from "../../components/restaurants/main/AddCart"
import Loading from "../../components/app/Loading";
// import ProductImages from "../../components/ecommerce/details/ProductImages";
import ProductImages from "../../components/restaurants/details/ProductImages"
import { FontAwesome } from '@expo/vector-icons';
import moment from "moment/moment";
export default function MenuDetailScreen() {
    const [nombre, setNombre] = useState(0);
    const route = useRoute()
    const navigation = useNavigation()
    const { product } = route.params
    const [loadingPartenaireProducts, setloadingPartenaireProducts] = useState(true)
    const [shopProducts, setShopProducts] = useState([])

    const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true)
    const [similarProducs, setSimilarProducts] = useState([])

    const productInCart = useSelector(restaurantProductSelector(product.ID_RESTAURANT_MENU))

    const modalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)
    const [produitnote, Setproduitnote] = useState([])
    const [note, Setnote] = useState(null)
    const [userNote, SetuserNote] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentaire, Setcommentaire] = useState(null)
    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }
    const onCloseAddToCart = () => {
        modalizeRef.current?.close()
    }
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
    moment.updateLocale('fr', {
        calendar: {
            sameDay: "[Aujourd'hui]",
            lastDay: '[Hier]',
            nextDay: 'DD-M-YYYY',
            lastWeek: 'DD-M-YYYY',
            sameElse: 'DD-M-YYYY',
        },
    })

    var IMAGES = [
        product.IMAGE ? product.IMAGE : undefined,
        product.IMAGE2 ? product.IMAGE2 : undefined,
        product.IMAGE3 ? product.IMAGE3 : undefined,

    ]
    const onetoilePress = (note) => {
        Setnote(note)
    }
    const fecthProduitPartenaires = async () => {
        try {
            const response = await fetchApi(`/resto/menu/restaurant/${product.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setShopProducts(response.result)
            //console.log(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {
            setloadingPartenaireProducts(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthProduitPartenaires()
    }, []))

    const enregistrement = async () => {

        try {

            setLoading(true)
            const res = await fetchApi("/resto/menu/note", {
                method: 'POST',
                body: JSON.stringify({
                    ID_RESTAURANT_MENU: product.ID_RESTAURANT_MENU,
                    NOTE: note,
                    COMMENTAIRE: commentaire,


                }),

                headers: { "Content-Type": "application/json" },

            })

            Setproduitnote(n => [res.result, ...n])

        }

        catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
            Setcommentaire("")

        }


    }
    useEffect(() => {
        (async () => {
            try {
                var url = `/resto/menu/note/liste/${product.ID_RESTAURANT_MENU}`
                const produitsNotes = await fetchApi(url)
                Setproduitnote(produitsNotes.result)
                //console.log(produitsNotes)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                var url = `/resto/menu/note/${product.ID_RESTAURANT_MENU}`
                const userNotes = await fetchApi(url)
                SetuserNote(userNotes.result)
                //console.log(userNotes.result)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    useEffect(() => {
        (async () => {
            try {
                var url = `/resto/menu?category=${product.ID_CATEGORIE_MENU}`
                const produits = await fetchApi(url)
                setSimilarProducts(produits.result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSimilarProducts(false)
            }
        })()
    }, [])


    return (
        <>
            {loading && <Loading />}
            <View style={{ marginTop: 0, flex: 1 }}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ marginRight: 20 }} >
                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    <ProductImages images={IMAGES} />
                    {/* <View style={styles.producHeader} >
                        <Image source={{ uri: product.IMAGE }} style={styles.productImage} />
                    </View> */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <View>
                            <TouchableOpacity style={styles.category} >
                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                <Text style={styles.categoryName} numberOfLines={2}>{product.repas}</Text>
                            </TouchableOpacity>
                            <View style={styles.productNames}>
                                <Text style={styles.productName}>
                                    <Text numberOfLines={2} style={styles.productName}>{product.categorie}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.shareBtn}>
                            <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={styles.productDescription}>{product.DESCRIPTION}</Text>
                    </View>
                    <TouchableNativeFeedback
                        onPress={() => navigation.navigate('MenusRestaurantScreen', { restaurant: product })}>
                        <View style={styles.shop}>
                            <View style={styles.shopLeft}>
                                <View style={styles.shopIcon}>
                                    <Entypo name="shop" size={24} color={COLORS.primary} />
                                    {/* <FontAwesome name="user" size={24} color={COLORS.primary} /> */}
                                </View>
                                <View style={styles.shopOwner}>
                                    <Text style={styles.productSeller}>
                                        {product.NOM_ORGANISATION}
                                    </Text>
                                    <Text style={styles.shopAdress}>Bujumbura</Text>
                                </View>
                            </View>
                            <MaterialIcons name="navigate-next" size={24} color="black" />
                        </View>
                    </TouchableNativeFeedback>
                    {/* <View>
                        <Text>
                            {JSON.stringify({ note })}
                        </Text>
                    </View> */}
                    {!userNote[0] && !produitnote[0] ?
                        <>


                            <View style={styles.etoiles}>
                                {new Array(5).fill(0).map((_, index) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => onetoilePress(index + 1)}>
                                            <View >
                                                {note && note >= index + 1 ? <FontAwesome name="star" size={20} color={COLORS.primaryPicker} /> :

                                                    <FontAwesome name="star-o" size={20} color="black" />}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })}
                            </View>
                            {note && <View style={styles.inputCard}>
                                <View>
                                    <OutlinedTextField
                                        label="Commentaire"
                                        fontSize={14}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                        containerStyle={{ borderRadius: 20 }}
                                        multiline={true}
                                        value={commentaire}
                                        onChangeText={(t) => Setcommentaire(t)}

                                        autoCompleteType='off'
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                    />
                                </View>

                            </View>}
                            {note && <TouchableWithoutFeedback
                                onPress={enregistrement}
                            >
                                <View style={[styles.button,]}>
                                    <Text style={styles.buttonText}>Enregistrer</Text>

                                </View>
                            </TouchableWithoutFeedback>}


                            {produitnote.map((note, index) => {
                                return (
                                    <View key={index} style={{ marginTop: 15 }}>
                                        <View style={styles.notecard}>
                                            <View style={styles.Cardnote} >
                                                <Image source={{ uri: note.utilisateur.IMAGE }} style={styles.userImage} />
                                            </View>
                                            <View style={styles.rateHeader}>
                                                <View style={styles.rateTitles}>
                                                    <Text style={{ fontWeight: 'bold', opacity: 0.6 }}>{note.utilisateur.NOM}  {note.utilisateur.PRENOM}</Text>
                                                    <Text style={{ color: '#777', marginRight: 10 }}>
                                                        {moment(note.restaurant_note.DATE).format('DD-M-YYYY')}
                                                    </Text>
                                                </View>
                                                <View style={[styles.etoiles, { justifyContent: 'flex-start', paddingHorizontal: 0, marginTop: 3 }]}>
                                                    {new Array(5).fill(0).map((_, index) => {
                                                        return (
                                                            <TouchableWithoutFeedback >
                                                                <View >
                                                                    {note.restaurant_note.NOTE >= index + 1 ? <FontAwesome name="star" size={15} color={COLORS.primaryPicker} style={{ marginLeft: 2 }} /> :

                                                                        <FontAwesome name="star-o" size={15} color="black" style={{ marginLeft: 2 }} />}

                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ marginLeft: 60, marginTop: 7 }}>
                                            <Text>{note.restaurant_note.COMENTAIRE}</Text>
                                        </View>
                                    </View>
                                )

                            })}
                        </> :
                        <>
                            {produitnote.map((note, index) => {
                                return (
                                    <View key={index} style={{ marginTop: 15 }}>
                                        <View style={styles.notecard}>
                                            <View style={styles.Cardnote} >
                                                <Image source={{ uri: note.utilisateur.IMAGE }} style={styles.userImage} />
                                            </View>
                                            <View style={styles.rateHeader}>
                                                <View style={styles.rateTitles}>
                                                    <Text style={{ fontWeight: 'bold', opacity: 0.6 }}>{note.utilisateur.NOM}  {note.utilisateur.PRENOM}</Text>
                                                    <Text style={{ color: '#777', marginRight: 10 }}>
                                                        {moment(note.restaurant_note.DATE).format('DD-M-YYYY')}
                                                    </Text>
                                                </View>
                                                <View style={[styles.etoiles, { justifyContent: 'flex-start', paddingHorizontal: 0, marginTop: 3 }]}>
                                                    {new Array(5).fill(0).map((_, index) => {
                                                        return (
                                                            <TouchableWithoutFeedback >
                                                                <View >
                                                                    {note.restaurant_note.NOTE >= index + 1 ? <FontAwesome name="star" size={15} color={COLORS.primaryPicker} style={{ marginLeft: 2 }} /> :

                                                                        <FontAwesome name="star-o" size={15} color="black" style={{ marginLeft: 2 }} />}

                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ marginLeft: 60, marginTop: 7 }}>
                                            <Text>{note.restaurant_note.COMENTAIRE}</Text>
                                        </View>
                                    </View>
                                )

                            })}
                            {/* <TouchableWithoutFeedback style={{ marginLeft: 60, marginTop: 7 }}>
                <Text style={{ color: COLORS.primary, }}>Editer ta Note</Text>
              </TouchableWithoutFeedback> */}
                        </>
                    }

                    {(loadingPartenaireProducts) ? <HomeProductsSkeletons /> :
                        <ProduitRestoPartenaire restaurant={product} productPartenaires={shopProducts} />}

                    {(loadingSimilarProducts) ? <HomeProductsSkeletons wrap /> :
                        <>
                            <TouchableNativeFeedback
                                accessibilityRole="button"
                                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                            >
                                <View style={styles.productsHeader}>
                                    <Text style={styles.title}>Similaires</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <View style={styles.products}>
                                {similarProducs.map((product, index) => {
                                    return (
                                        <Menu
                                            menu={product}
                                            index={index}
                                            totalLength={shopProducts.length}
                                            key={index}
                                            fixMargins
                                        />
                                    )
                                })}
                            </View>
                        </>}
                </ScrollView>
            </View>
            <View style={styles.productFooter}>
                {product.PRIX ? <Text style={styles.productPrice}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress}  >
                    <>
                        <View>
                            <Ionicons name="cart" size={24} color="#fff" />
                        </View>
                        <Text style={styles.addCartBtnTitle}>
                            Ajouter au panier
                        </Text>
                        {productInCart ? <View style={styles.badge}>
                            <Text style={styles.badgeText} numberOfLines={1}>{productInCart.QUANTITE}</Text>
                        </View> : null}

                    </>
                </TouchableOpacity>
            </View>
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
                        <AddCart menu={product} loadingForm={loadingForm} onClose={onCloseAddToCart} />
                    </Modalize>
                </GestureHandlerRootView>
            </Portal>
        </>
    )
}
const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: '#F1F1F1',
    },
    producHeader: {
        backgroundColor: '#F1F1F1',
        paddingBottom: 60,
    },
    productImage: {
        width: '70%',
        minHeight: 150,
        maxHeight: 200,
        alignSelf: 'center',
        resizeMode: "center",
        borderRadius: 10
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    categoryName: {
        fontWeight: "bold",
        fontSize: 13,
        color: COLORS.primary,
        marginLeft: 5
    },
    productNames: {
        marginTop: 5
    },
    productName: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.ecommercePrimaryColor
    },
    shareBtn: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
    },
    userImage: {
        width: "120%",
        height: "120%",
        borderRadius: 50,
        // alignItems:"center",
        // justifyContent:"center"
    },
    shop: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    shopLeft: {
        flexDirection: "row",
        alignItems: 'center'
    },
    shopOwner: {
        marginLeft: 10
    },
    productSeller: {
        fontWeight: "bold"
    },
    shopAdress: {
        color: '#777',
        fontSize: 13
    },
    productFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    productPrice: {
        fontWeight: "bold",
        fontSize: 22
    },
    addCartBtn: {
        borderRadius: 30,
        backgroundColor: COLORS.ecommerceOrange,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    addCartBtnTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10,
        multiline: true


    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        // textTransform:"uppercase",
        fontSize: 16,
        textAlign: "center"
    },
    button: {
        marginTop: 10,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primaryPicker,
        marginHorizontal: 20
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
    etoiles: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 60,
        paddingHorizontal: 10

    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        borderRadius: 20,
        paddingHorizontal: 3,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: -10,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    rateHeader: {
        marginLeft: 10,
        flex: 1
    },
    rateTitles: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between'
    },
    Cardnote: {
        padding: 15,
        height: 40,
        width: 40,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
    },
    notecard: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
    }

})
