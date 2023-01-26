import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Tabs } from 'react-native-collapsible-tab-view'
import { Entypo, MaterialIcons,FontAwesome   } from '@expo/vector-icons';

/**
 * screens pour afficher les details de la boutiques
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 23/1/2023
 * @param {*} param0 
 * @returns 
 */

export default function DetailsShopTabScreen({ shop }) {
        return (
                <Tabs.ScrollView>
                        <View style={styles.container}>
                                <View style={styles.cardPrincipal}>
                                        <View style={styles.cardItem}>
                                                <View style={styles.cardIcon}>
                                                        <Entypo name="location" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.titleName}>Adresse</Text>
                                                        <Text style={styles.titleDescr}>{shop.ADRESSE_COMPLETE}</Text>
                                                </View>
                                        </View>
                                        <View style={styles.cardItem}>
                                                <View style={styles.cardIcon}>
                                                        <MaterialIcons name="category" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.titleName}>Categories</Text>
                                                        {shop.categories ? <Text style={styles.titleDescr}>{shop.categories[0].NOM}</Text>: <Text>Restaurant</Text>}
                                                </View>
                                        </View>
                                        <View style={styles.cardItem}>
                                                <View style={styles.cardIcon}>
                                                        <MaterialIcons name="email" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.titleName}>E-mail</Text>
                                                        <Text style={styles.titleDescr}>{shop.EMAIL}</Text>
                                                </View>
                                        </View>
                                        <View style={styles.cardItem}>
                                                <View style={styles.cardIcon}>
                                                        <FontAwesome name="phone" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 20 }}>
                                                        <Text style={styles.titleName}>Telephone</Text>
                                                        <Text style={styles.titleDescr}>{shop.TELEPHONE}</Text>
                                                </View>
                                        </View>
                                </View>
                        </View>
                </Tabs.ScrollView>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardPrincipal: {
                padding: 10,
                // backgroundColor: "#FBF3F2",
                marginTop: 10,
                marginHorizontal: 10,
                borderRadius: 10
        },
        cardIcon: {
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center"
        },
        imagePrincipal:
        {
                width: '90%',
                height: "90%",
                borderRadius: 50
                // resizeMode: "cover"
        },
        titleName: {
                fontSize: 18,
        },
        cardItem:{
                flexDirection:"row",
                alignContent:"center",
                alignItems:"center",
                marginBottom:30
        },
        titleDescr:{
                color:"#777"
        }
})