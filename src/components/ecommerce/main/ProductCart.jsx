import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addProductAction, removeProductAction } from '../../../store/actions/ecommerceCartActions'
import { COLORS } from '../../../styles/COLORS'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback } from 'react'

export default function ProductCart({ product, index }) {
        const [amount, setAmount] = useState(product.QUANTITE)
        const [isFocused, setIsFocused] = useState(false)

        const dispatch = useDispatch()

        var prixUnitaire = 0
        if (product.combinaison) {
                prixUnitaire = product.combinaison.PRIX
        } else {
                prixUnitaire = product.produit_partenaire.PRIX
        }

        var totalPrice = prixUnitaire * product.QUANTITE

        var quantiteRestante = 0
        if (product.combinaison) {
                quantiteRestante = product.combinaison.QUANTITE
        } else {
                quantiteRestante = product.stock.QUANTITE_TOTAL
        }
        const onDecrement = () => {
                if (parseInt(amount) == 1) {
                        return false
                }
                if (parseInt(amount) <= 0) {
                        return 1
                }
                setAmount(l => parseInt(l) - 1)
        }

        const onIncrement = () => {
                if (amount == product.stock.QUANTITE_RESTANTE) {
                        return false
                }
                setAmount(l => parseInt(l) + 1)
        }

        const onChangeText = am => {
                setAmount(am)
        }
        const checkAmount = () => {
                setAmount(parseInt(amount) ? (parseInt(amount) >= quantiteRestante ? quantiteRestante : parseInt(amount)) : 1)
        }

        let isnum = /^\d+$/.test(amount);
        const isValid = useCallback(() => {
                return isnum ? (parseInt(amount) > 0 && parseInt(amount) <= quantiteRestante) : false
        }, [amount])

        const onRemoveProduct = () => {
                Alert.alert("Enlever le produit", "Voulez-vous vraiment enlever ce produit du panier ?",
                        [
                                {
                                        text: "Annuler",
                                        style: "cancel"
                                },
                                {
                                        text: "Oui", onPress: async () => {
                                                dispatch(removeProductAction(product.produit.ID_PRODUIT))
                                        }
                                }
                        ])
        }

        useEffect(() => {
                if (isValid()) {
                        dispatch(addProductAction(product, amount, product.combinaison))
                }
        }, [amount])
        return (
                <View style={[styles.product, index == 0 && { marginTop: 10 }]}>
                        <View style={styles.productImage}>
                                <Image source={{ uri: product.produit.IMAGE }} style={styles.image} />
                        </View>
                        <View style={styles.productDetails}>
                                <View style={styles.detailsHeader}>
                                        <View style={styles.productNames}>
                                                {product ? <Text numberOfLines={2} style={styles.productName}>
                                                        {product.produit.NOM}
                                                </Text> : null}
                                                <TouchableOpacity style={styles.reomoveBtn} onPress={onRemoveProduct}>
                                                        <MaterialCommunityIcons name="delete" size={24} color="#777" />
                                                </TouchableOpacity>
                                        </View>
                                        {/* <Text style={styles.unitPrice}>
                                                            { product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}` }
                                                            <FontAwesome5 name="building" size={10} color={COLORS.primary} style={{ marginLeft: 10 }} />
                                                  </Text> */}
                                        <Text style={styles.unitPrice}>{prixUnitaire.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU</Text>

                                        {product.combinaison ?
                                                <View style={styles.inventoryOption}>
                                                        {product.combinaison.values.map((option, index) => {
                                                                return (
                                                                        <Text key={index} >
                                                                                {index > 0 && ' - '}{option.VALUE_NAME}
                                                                        </Text>
                                                                )
                                                        })}

                                                </View>
                                                : null}
                                </View>
                                <View style={styles.detailsFooter}>
                                        {totalPrice ? <Text numberOfLines={1} style={styles.productPrice}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU</Text> : null}
                                        <View style={styles.amountContainer}>
                                                <TouchableOpacity
                                                        style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]}
                                                        onPress={onDecrement}
                                                        disabled={amount <= 1 || !/^\d+$/.test(amount)}>
                                                        <Text style={styles.amountChangerText}>-</Text>
                                                </TouchableOpacity>
                                                <TextInput
                                                        style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
                                                        value={amount.toString()}
                                                        onChangeText={onChangeText}
                                                        onFocus={() => setIsFocused(true)}
                                                        onBlur={() => {
                                                                setIsFocused(false)
                                                                checkAmount()
                                                        }}
                                                        keyboardType="decimal-pad"
                                                        editable={false}
                                                />
                                                <TouchableOpacity
                                                        style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= quantiteRestante) && { opacity: 0.5 }]}
                                                        onPress={onIncrement}
                                                        disabled={(!/^\d+$/.test(amount) || amount >= quantiteRestante)}>
                                                        <Text style={styles.amountChangerText}>+</Text>
                                                </TouchableOpacity>
                                        </View>
                                </View>
                        </View>
                </View>
        )
}


const styles = StyleSheet.create({
        product: {
                flexDirection: 'row',
                height: 135,
                marginTop: 10,
                backgroundColor: '#FFF',
                padding: 10,
                borderRadius: 8,
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
                borderRadius: 10,
                resizeMode: 'contain'
        },
        productDetails: {
                marginLeft: 10,
                justifyContent: 'space-between',
                flex: 1,
        },
        productNames: {
                flexDirection: 'row',
                alignItems: 'center',
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
                alignItems: 'center',
                flex: 1,
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
        inventoryOption: {
                flexDirection: "row"
        }
})