import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from "react-native";
import fetchApi from "../../../helpers/fetchApi";
import useFetch from "../../../hooks/useFetch";
import { COLORS } from "../../../styles/COLORS"

/**
 * composant pour afficher les details de la commandes
 * @Author Vanny Boy <vanny@mediabox.bi>
 * @date 15/2/2023
 * @param {*} param0 
 * @returns 
 */

export default function CommandesDetails({ item, index }) {
        const [loadingVariants, variants] = useFetch(`/ecommerce/ecommerce_produits/ecommerce_produit_variants/${item.ID_PRODUIT}`)
        const [selectedCombinaison, setSelectedCombinaison] = useState([])

        useEffect(() => {
                if (!loadingVariants) {
                        const combinaisons = variants.result.combinaisons
                        if (combinaisons && combinaisons.length > 0) {
                                const combinaison = combinaisons.find(comb => {
                                        const valueIds = comb.values.map(value => value.ID_VALUE);
                                        return valueIds.sort().toString();
                                })
                                const variantsValues = [].concat(...variants.result.variants.map(variant => variant.values));
                                const newValues = combinaison.values.map(value => {
                                        const fullValue = variantsValues.find(v => v.ID_VALUE == value.ID_VALUE)
                                        return {
                                                ...value,
                                                ...fullValue,
                                        }
                                })
                                const newCombinaison = combinaison ? { ...combinaison, values: newValues } : null
                                setSelectedCombinaison(newCombinaison || null)
                        }
                }
        }, [variants, loadingVariants])
        return (
                <TouchableWithoutFeedback key={index}>
                        <View style={styles.product}>
                                <View style={styles.productImage}>
                                        <Image source={{ uri: item.IMAGE_1 }} style={styles.image} />
                                </View>
                                <View style={styles.productDetails}>
                                        <View style={styles.detailsHeader}>
                                                <View style={styles.productNames}>
                                                        <Text numberOfLines={2} style={styles.productName}>
                                                                {item.NOM}
                                                        </Text>
                                                </View>
                                        </View>
                                        {selectedCombinaison.values.length > 0 ?
                                                <View style={styles.inventoryOption}>
                                                        {selectedCombinaison.values.map((option, index) => {
                                                                return (
                                                                        <Text key={index} >
                                                                                {index > 0 && ' - '}{option.VALUE_NAME}
                                                                        </Text>
                                                                )
                                                        })}

                                                </View>
                                                : null}
                                        <View style={styles.quantityUnitPrice}>
                                                <Text style={styles.quantity}>
                                                        {item.QUANTITE} pièce{item.QUANTITE > 1 && 's'} ×
                                                        {item.MONTANT ? item.MONTANT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : item.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                                                </Text>
                                                <Text style={styles.unitPrice}>{item.SOMME.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU</Text>
                                        </View>
                                </View>
                        </View>
                </TouchableWithoutFeedback>

        )
}

const styles = StyleSheet.create({
        product: {
                flexDirection: 'row',
                height: 120,
                marginTop: 10,
                backgroundColor: '#FFF',
                padding: 10,
                borderRadius: 8
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
                flex: 1
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        variant: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        variantName: {
                color: '#777',
                fontSize: 12
        },
        quantityUnitPrice: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        quantity: {
                color: '#777',
                fontSize: 12
        },
        unitPrice: {
                fontWeight: 'bold'
        },
        productImage: {
                height: "100%",
                width: "28%",
                borderRadius: 10,
                backgroundColor: '#F1F1F1'
        },
        inventoryOption: {
                flexDirection: "row"
        }
})