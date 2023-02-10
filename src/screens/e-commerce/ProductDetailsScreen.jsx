import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar, Modal, ActivityIndicator } from "react-native"
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector"
import Product from "../../components/ecommerce/main/Product";
import { useForm } from "../../hooks/useForm";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useRef } from "react";
import AddCart from "../../components/ecommerce/main/AddCart";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { ecommerceProductSelector } from "../../store/selectors/ecommerceCartSelectors";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import ProductImages from "../../components/ecommerce/details/ProductImages";
import moment from "moment/moment";
import Loading from "../../components/app/Loading";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import useFetch from "../../hooks/useFetch";
import NotesEcommerce from "../../components/ecommerce/home/NotesEcommerce";
import NotesUseEcommerceScreen from "../../components/ecommerce/home/NotesUseEcommerceScreen";
moment.updateLocale('fr', {
    calendar: {
        sameDay: "[Aujourd'hui]",
        lastDay: '[Hier]',
        nextDay: 'DD-M-YYYY',
        lastWeek: 'DD-M-YYYY',
        sameElse: 'DD-M-YYYY',
    },
})

export default function ProductDetailsScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const [produitnoteuser, setProduitnoteUser] = useState({})
    const [userNote, setUserNote] = useState([])
    const { product } = route.params
    const [loadingShopProducts, shopProducts] = useFetch(`/ecommerce/ecommerce_produits?partenaireService=${product.produit_partenaire.ID_PARTENAIRE_SERVICE}`)
    const [loadingSimilarProducts, similarProducs] = useFetch(`/ecommerce/ecommerce_produits?category=${product.categorie.ID_CATEGORIE_PRODUIT}`)
    const user = useSelector(userSelector)
    const [loadingRevuesNotes, produtsNotes] = useFetch(`/ecommerce/ecommerce_produits_notes?ID_PRODUIT=${product.produit.ID_PRODUIT}`)
    const modalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [loadingetoiles, setLoadingetoiles] = useState(true)
    const [note, setNote] = useState(null)
    const [commentaire, Setcommentaire] = useState(null)
    const productInCart = useSelector(ecommerceProductSelector(product.produit_partenaire.ID_PARTENAIRE_SERVICE))
    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }
    const onCloseAddToCart = () => {
        modalizeRef.current?.close()
    }
    var IMAGES = [
        product.produit_partenaire.IMAGE_1 ? product.produit_partenaire.IMAGE_1 : undefined,
        product.produit_partenaire.IMAGE_2 ? product.produit_partenaire.IMAGE_2 : undefined,
        product.produit_partenaire.IMAGE_3 ? product.produit_partenaire.IMAGE_3 : undefined,
    ]
    const [data, handleChange] = useForm({

        commentaire: "",

    })
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
    //Fetch les notes du produit par utilisateur
    useEffect(() => {

        (async () => {
            try {
                var url = `/ecommerce/ecommerce_produits_notes/notes?ID_PRODUIT=${product.produit.ID_PRODUIT}`
                const produitsNotes = await fetchApi(url)
                setProduitnoteUser(produitsNotes.result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingetoiles(false)
            }
        })()
    }, [])
    //Fetch notes d'un produit
    useEffect(() => {
        (async () => {
            try {
                var url = `/ecommerce/ecommerce_produits_notes?ID_PRODUIT=${product.produit.ID_PRODUIT}`
                const produtsNotes = await fetchApi(url)
                setUserNote(produtsNotes.result)

            } catch (error) {
                console.log(error)
            } finally {
            }
        })()
    }, [])
    //Fetch pour enregistrer une note du produit
    const onSubmit = async () => {
        try {
            setLoading(true)
            const form = new FormData()
            form.append("COMMENTAIRE", data.commentaire)
            form.append("ID_PRODUIT", product.produit.ID_PRODUIT)
            form.append("NOTE", note)
            const Notes = await fetchApi('/ecommerce/ecommerce_produits_notes', {
                method: "POST",
                body: form
            })
            navigation.navigate('EcommerceHomeScreen')

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {

    }, [])
    //Fetch pour supprimer une note
    const onclick = async () => {
        try {
            setLoading(true)
            const Notes = await fetchApi(`/ecommerce/ecommerce_produits_notes/${produitnoteuser.ID_NOTE}`, {
                method: "DELETE",
            })
            navigation.navigate('EcommerceHomeScreen')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading && <Loading />}
            <View style={{ marginTop: 0, flex: 1 }}>
                <View style={styles.cardHeader}>
                    <TouchableNativeFeedback
                        style={{}}
                        onPress={() => navigation.goBack()}
                        background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                        <View style={styles.headerBtn}>
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableNativeFeedback
                            style={{}}
                            background={TouchableNativeFeedback.Ripple('#c9c5c5', true)}>
                            <View style={styles.headerBtn}>
                                <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                            </View>
                        </TouchableNativeFeedback>
                        <EcommerceBadge />
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    <ProductImages images={IMAGES} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 10 }}>
                        <View>
                            <TouchableOpacity style={styles.category} >
                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                <Text style={styles.categoryName} numberOfLines={2}>{product.categorie.NOM}</Text>
                            </TouchableOpacity>
                            <View style={styles.productNames}>
                                <Text style={styles.productName}>
                                    {product.produit.NOM}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.shareBtn}>
                            <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={styles.productDescription}>{product.produit_partenaire.DESCRIPTION}</Text>
                    </View>

                    <TouchableNativeFeedback onPress={() => navigation.push('ShopScreen', {
                        id: product.partenaire.ID_PARTENAIRE_SERVICE,
                        shop: {
                            ...product.partenaire,
                            categories: [product.categorie]
                        }
                    })}>

                        <View style={styles.shop}>
                            <View style={styles.shopLeft}>
                                <View style={styles.shopIcon}>
                                    {true ? <Entypo name="shop" size={24} color={COLORS.primary} /> :
                                        <FontAwesome name="user" size={24} color={COLORS.primary} />}
                                </View>
                                <View style={styles.shopOwner}>
                                    <Text style={styles.productSeller}>
                                        {product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}`}

                                    </Text>
                                    <Text style={styles.shopAdress}>
                                        {product.partenaire.ADRESSE_COMPLETE ? product.partenaire.ADRESSE_COMPLETE : "Particulier"}
                                    </Text>
                                </View>
                            </View>

                        </View>

                    </TouchableNativeFeedback>
                    {loadingetoiles ? <View></View> : 
                    <View style={styles.moyen}>
                        <View style={styles.revue}>
                            <Text style={styles.moyenne}>{produitnoteuser.avg}</Text>
                            <Text style={styles.total}> / 5</Text>
                        </View>
                        <View style={styles.etoileNote}>
                            {new Array(5).fill(0).map((_, index) => {
                                return (
                                    <View key={index}  >
                                        {
                                            <AntDesign name="star" size={12} color="black" />}
                                    </View>
                                )
                            })}
                        </View>

                        <View>
                            <Text style={styles.moyenn}>({produitnoteuser.total})</Text>
                        </View>
                        <View style={styles.noteDetails}>
                            {new Array(5).fill(0).map((_, index) => {
                                return (
                                    <View key={index} style={styles.noteDetail}>
                                        <Text>{5 - index}</Text>
                                        <View style={styles.noteDetailLigne}>
                                            <View style={[styles.detailProgression,{width:`${produitnoteuser.noteGroup[5 - index].pourcentage}%`}]} />
                                        </View>
                                        <Text>
                                            {produitnoteuser.noteGroup[5 - index].nombre}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>}


                    <TouchableNativeFeedback
                        accessibilityRole="button"
                        background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                        onPress={() => navigation.navigate('AllNotesScreen', {
                            product
                        })}
                    >
                        <View style={styles.productsHeader}>
                            <Text style={styles.title}>Notes et revues</Text>
                            <MaterialIcons name="navigate-next" size={24} color="black" />
                        </View>
                    </TouchableNativeFeedback>

                    {loadingetoiles ? <View></View> :
                        produitnoteuser.userNote ? <View>
                            <NotesUseEcommerceScreen note={produitnoteuser} />
                            <View style={styles.commentaire}>
                                <View>
                                    <TouchableOpacity onPress={() => navigation.navigate('EditRatingScreen', { produitnoteuser })}>
                                        <Text style={styles.editText}>Modifier</Text>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={onclick}>
                                        <Text style={styles.editText1}>Supprimer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View> :
                            <>
                                <View style={styles.notes}>
                                    {new Array(5).fill(0).map((_, index) => {
                                        return (
                                            <TouchableOpacity key={index} onPress={() => setNote(index + 1)} style={styles.etoiles}>
                                                {note < index + 1 ? <AntDesign name="staro" size={25} color="black" /> :
                                                    <AntDesign name="star" size={25} color="black" />}
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>

                                {note ?
                                    <View>
                                        <View style={styles.selectControl}>
                                            <OutlinedTextField
                                                label={"Commentaire"}
                                                fontSize={13}
                                                value={data.commentaire}
                                                onChangeText={e => handleChange("commentaire", e)}
                                                lineWidth={0.5}
                                                activeLineWidth={0.5}
                                                baseColor={COLORS.smallBrown}
                                                tintColor={COLORS.primary}
                                                containerStyle={{ flex: 1, marginTop: 15, }}
                                                inputContainerStyle={{ borderRadius: 10 }}
                                                multiline
                                            />
                                        </View>
                                        <View style={styles.actionContainer}>
                                            <TouchableOpacity onPress={onSubmit} style={[styles.addBtn]}>
                                                <Text style={[styles.addBtnText]}>Enregister Commentaire</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    : null
                                }
                            </>}
                    <NotesEcommerce allNotes={userNote} />


                    {loadingSimilarProducts ? <HomeProductsSkeletons /> : <HomeProducts
                        products={similarProducs.result}
                        title="Similaires"
                        category={product.categorie}
                    />}
                    {loadingShopProducts ? <HomeProductsSkeletons /> : <HomeProducts
                        products={shopProducts.result}
                        title={`Plus à ${product.partenaire.NOM_ORGANISATION}`}
                        category={product.categorie}
                        shop={product.produit_partenaire}
                    />}
                </ScrollView>
            </View>
            <View style={styles.productFooter}>
                {product.produit_partenaire.PRIX ? <Text style={styles.productPrice}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress} >
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
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
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
                        <AddCart product={product} loadingForm={loadingForm} onClose={onCloseAddToCart} />
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
    etoiles: {
        flexDirection: "row",
        flex: 1
    },
    category: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    points: {
        marginTop: 25,
        marginLeft: 10
    },
    userImage: {
        width: "120%",
        height: "120%",
        borderRadius: 50,

    },
    Cardnote: {
        padding: 15,
        height: 20,
        width: 20,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 50,

    },
    etoiles: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 60,
        paddingHorizontal: 10,


    },
    inputCard: {
        marginHorizontal: 20,
        marginTop: 10,
        multiline: true


    },
    notes: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 10


    },

    etoileNote: {

        flexDirection: "row"

    },
    actionContainer: {
        paddingHorizontal: 10
    },
    addBtn: {
        paddingVertical: 10,
        width: "100%",
        alignSelf: "center",
        backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 10,
        marginTop: 10
    },
    noteDetails:{
        width:"100%",
        paddingHorizontal:40
    },
    noteDetail:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        
    },
    noteDetailLigne:{
        height:10,
        width:"100%",
        backgroundColor:"#f1f1f1",
        marginHorizontal:10,
        borderRadius:5
    },
    detailProgression:{
        height:"100%",
        width:"0%",
        backgroundColor:"red",
        
        borderRadius:5
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: "bold",
        textAlign: "center",
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
    shop: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    shopLeft: {
        flexDirection: "row",
        alignItems: 'center'
    },
    shopIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F1F1',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"

    },
    shopOwner: {
        marginLeft: 10,
    },
    productSeller: {
        fontWeight: "bold",
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    commentaire: {
        flexDirection: "row",


    },
    moyenne: {

        fontSize: 45,
        marginHorizontal: 10

    },
    moyenn: {

        color: "#7777",
        justifyContent: "center",
        paddingHorizontal: 20

    },

    total: {

        fontSize: 20,
    },
    revue: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    moyen: {
        justifyContent: 'center',
        alignItems: "center"
    },
    shopAdress: {
        color: '#777',
        fontSize: 13
    },
    text: {
        color: '#646B95',
        fontSize: 20
    },
    carre1: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#242F68',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre2: {
        padding: 15,
        height: 50,
        width: 200,
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    carre3: {
        padding: 10,
        height: 50,
        width: 200,
        backgroundColor: '#EE7526',
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,
        // marginTop: 1,
    },
    shareBtn: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
    },
    productDescription: {
        color: '#777',
        fontSize: 15,
        lineHeight: 22
    },
    selectControl: {
        flex: 1,
        paddingHorizontal: 10
    },
    txtDispla: {
        color: '#646B94',
        fontSize: 15,
        fontWeight: 'bold',
    },
    image: {
        height: "30%",
        width: "30%",
        borderRadius: 8,
        resizeMode: 'contain'
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    title: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
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
    addCartBtnTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    Cardnote: {
        padding: 15,
        height: 40,
        width: 40,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
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
    notecard: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    notecards: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 40,
        marginTop: 7


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
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        paddingHorizontal: 65,

    },
    editText: {
        marginTop: 5,
        paddingHorizontal: 65,
        fontSize: 16,
        color: "green"
    },
    editText1: {
        marginTop: 5,
        paddingHorizontal: 65,
        fontSize: 16,
        color: "green",
        marginLeft: -80
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold",
        paddingHorizontal: 10,
        marginTop: 5,


    },
    title: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold"
    },
    revues: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold",
        paddingHorizontal: 15,
        marginTop: 5,

    },
    headerBtn: {
        padding: 10
    }
})
