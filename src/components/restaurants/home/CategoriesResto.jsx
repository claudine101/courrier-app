import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View, ScrollView, TouchableWithoutFeedback, Image } from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS";

/**
 * composant pour afficher tous les categories
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 24/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function CategoriesResto({categories}) {
        const navigation = useNavigation()
        return (
                <>
                        <TouchableNativeFeedback onPress={() => navigation.navigate("CategorieMenuScreen", { categories })}
                                accessibilityRole="button"
                                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                        >
                                <View style={styles.header}>
                                        <Text style={styles.title}>Les catégories</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="black" />
                                </View>
                        </TouchableNativeFeedback>
                        <ScrollView
                                style={styles.shops}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                        >
                                {categories.map((categorie, index) => {
                                        return (
                                                <TouchableWithoutFeedback
                                                        onPress={() => navigation.navigate('MenuScreen', {
                                                                categorie
                                                        })} key={index}>
                                                        <View style={[styles.category]}>
                                                                <View style={styles.categoryPhoto}>
                                                                        <Image source={{ uri: categorie.IMAGE }} style={styles.image} />
                                                                </View>
                                                                <Text style={styles.categoryName}>{categorie.NOM}</Text>
                                                        </View>
                                                </TouchableWithoutFeedback>
                                        )
                                })}
                        </ScrollView>
                </>
        )
}

const styles = StyleSheet.create({
        header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 10
        },
        title: {
                color: COLORS.ecommercePrimaryColor,
                fontSize: 17,
                fontWeight: "bold"
        },
        category: {
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: 'white',
                borderRadius: 10,
        },
        categoryPhoto: {
                width: 80,
                height: 80,
                borderRadius: 8,
        },
        image: {
                width: '100%',
                height: '100%',
                borderRadius: 8,
        },
        categoryName: {
                marginTop: 2
        }
})