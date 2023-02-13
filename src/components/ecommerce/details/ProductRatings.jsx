import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text } from 'react-native'
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import useFetch from '../../../hooks/useFetch';
import Rating from './Rating';
import { HomeProductsSkeletons } from '../skeletons/Skeletons';
import IDS_SERVICE_CATEGORIES from "../../../constants/IDS_SERVICE_CATEGORIES"
/**
 * Permet d'afficher les notes d'un produit
 * @author Dukizwe Darcie <darcy@mediabox.bi>
 */
export default function ProductRatings({ userRating, productId, SERVICE }) {

    var url
    if (SERVICE == IDS_SERVICE_CATEGORIES.ecommerce) {
        url = `/ecommerce/ecommerce_produits_notes?ID_PRODUIT=${productId}`
    } else if (SERVICE == IDS_SERVICE_CATEGORIES.resto) {
        url = `/resto/restaurant_menus_notes/?ID_RESTAURANT_MENU=${productId}`
    }
    const [loadingReviews, reviews] = useFetch(url)
    const navigation = useNavigation()

    if (loadingReviews) {
        return <HomeProductsSkeletons />
    }
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                accessibilityRole="button"
                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                onPress={() => navigation.navigate('AllNotesScreen', { productId })}
            >
                <View style={styles.productsHeader}>
                    <Text style={styles.title}>Notes et avis</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </View>
            </TouchableNativeFeedback>
            {!userRating.avg ? <Text style={styles.emptyFeedback}>
                Pas encore d'avis
            </Text> :
                <>
                    <View style={styles.overview}>
                        <View style={styles.overviewLeftside}>
                            <View style={styles.overviewTotal}>
                                <Text style={styles.rateRotate}>{userRating.avg.toFixed(1)}</Text>
                                <Text style={styles.total}> / 5</Text>
                            </View>
                            <View style={styles.starts}>
                                {new Array(5).fill(0).map((_, index) => {
                                    return (
                                        <View key={index} style={{ marginLeft: index > 0 ? 5 : 0 }}>
                                            <AntDesign name="star" size={15} color={COLORS.primary} />
                                        </View>
                                    )
                                })}
                            </View>
                            <Text style={styles.reviewsTotal}>({userRating.total})</Text>
                        </View>
                        <View style={styles.noteDetails}>
                            {new Array(5).fill(0).map((_, index) => {
                                return (
                                    <View key={index} style={[styles.noteDetail, { marginTop: index > 0 ? 5 : 0 }]}>
                                        <Text style={styles.detailCount}>{5 - index}</Text>
                                        <View style={styles.noteDetailLigne}>
                                            <View style={[styles.detailProgression, { width: `${userRating.noteGroup[5 - index].pourcentage}%` }]} />
                                        </View>
                                        <Text style={styles.detailCount}>
                                            {userRating.noteGroup[5 - index].nombre}
                                        </Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.reviews}>
                        {reviews.result.map((review, index) => {
                            return <Rating rating={review} key={index} index={index} />
                        })}
                    </View>
                </>}
        </View>
    )
}

const styles = StyleSheet.create({
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    title: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold"
    },
    rateRotate: {
        fontSize: 40,
        fontWeight: "bold"
    },
    moyenn: {
        color: "#7777",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    total: {
        fontSize: 16,
        color: '#777',
    },
    overviewTotal: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 60
    },
    overview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: 10,
    },
    overviewLeftside: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    starts: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5
    },
    noteDetails: {
        width: '100%',
        flex: 1
    },
    noteDetail: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%'
    },
    noteDetailLigne: {
        height: 10,
        flex: 1,
        backgroundColor: "#f1f1f1",
        marginHorizontal: 10,
        borderRadius: 5
    },
    detailProgression: {
        height: "100%",
        width: "0%",
        backgroundColor: COLORS.primary,
        borderRadius: 5
    },
    reviewsTotal: {
        fontSize: 12,
        color: '#777'
    },
    reviews: {
        marginTop: 10
    },
    detailCount: {
        fontSize: 12
    },
    emptyFeedback: {
        color: '#777',
        paddingHorizontal: 10,
        fontSize: 12
    }
})