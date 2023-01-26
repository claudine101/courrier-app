import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addProductAction, removeProductAction } from '../../../store/actions/ecommerceCartActions'
import { COLORS } from '../../../styles/COLORS'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function DetailCart({ product, index }) {
        const totalPrice = product.PRIX * product.QUANTITE
        const navigation = useNavigation()
        return (
                <View style={[styles.product, index == 0 && { marginTop: 10 }]}>
                        <TouchableOpacity style={styles.productImage} onPress={() => navigation.push('ProductDetailsScreen', { product: product })}>
                                <Image source={{ uri: product.IMAGE_1 }} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.productDetails}>
                                <View style={styles.detailsHeader}>
                                        <View style={styles.productNames}>
                                                <Text numberOfLines={2} style={styles.productName}>{product.NOM} </Text>
                                                <View>
                                                        <Text numberOfLines={2} style={styles.productName}> {product.QUANTITE}</Text>
                                                </View>
                                        </View>
                                        {product.PRIX ? <Text style={styles.unitPrice}>{product.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                </View>
                                <View style={styles.detailsFooter}>
                                        <View></View>
                                        <View style={styles.cardTotal}>
                                                {product.SOMME ? <Text numberOfLines={1} style={styles.productPrice}>{product.SOMME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                        </View>

                                </View>

                        </View>
                </View>
        )
}


const styles = StyleSheet.create({
        product: {
                flexDirection: 'row',
                height: 100,
                marginTop: 20
        },
        productImage: {
                height: "100%",
                width: "30%",
                borderRadius: 10,
                backgroundColor: '#F1F1F1'
        },
        image: {
                height: "100%",
                width: "100%",
                borderRadius: 10
        },
        productDetails: {
                marginLeft: 10,
                justifyContent: 'space-between',
                flex: 1
        },
        productNames: {
                flexDirection: 'row',
                //     alignItems: 'center',
                justifyContent: 'space-between'
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        reomoveBtn: {
                width: 30,
                height: 30,
                backgroundColor: '#F1F1F1',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        unitPrice: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#777'
        },
        detailsFooter: {
                flexDirection: 'row',
                justifyContent: 'space-between',
        },
        productPrice: {
                color: '#000',
                fontWeight: 'bold',
                fontSize: 14,
                maxWidth: "55%"
        },
        amountContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 30,
                marginLeft: 10,
                width: "45%"
        },
        input: {
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
                flex: 1,
                height: "100%",
                marginHorizontal: 5,
                textAlign: 'center',
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        amountChanger: {
                width: 30,
                height: "100%",
                backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        amountChangerText: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16
        },
        cardTotal:{
               padding:5,
               backgroundColor:"#ddd",
               flex:1,
               justifyContent:"center",
               alignItems:"center"
        }
})