import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';

export default function PanierScreen() {
        return (
                <View style={styles.container}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ marginTop: 10 }}>
                                        <TouchableOpacity>
                                                <AntDesign name="arrowleft" size={24} color="black" />
                                        </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Mon panier</Text>
                                </View>
                                <View style={styles.cardPrincipal}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 }}>
                                                <View style={styles.cardImage}>
                                                        <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.image} />
                                                </View>
                                                <View>
                                                        <Text style={styles.TitleItem}>Riz Tropical</Text>
                                                        <Text style={styles.ItemDescription}>12 000 FBU</Text>
                                                </View>
                                                <View style={styles.cardIteration}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>2</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>+</Text>
                                                                </View>
                                                        </View>

                                                </View>
                                        </View>
                                </View>

                                <View style={styles.cardPrincipal}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 }}>
                                                <View style={styles.cardImage}>
                                                        <Image source={require('../../../assets/restaurant/chickenBurger.png')} style={styles.image} />
                                                </View>
                                                <View>
                                                        <Text style={styles.TitleItem}>Riz Tropical</Text>
                                                        <Text style={styles.ItemDescription}>12 000 FBU</Text>
                                                </View>
                                                <View style={styles.cardIteration}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>2</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>+</Text>
                                                                </View>
                                                        </View>

                                                </View>
                                        </View>
                                </View>

                                <View style={styles.cardPrincipal}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 }}>
                                                <View style={styles.cardImage}>
                                                        <Image source={require('../../../assets/restaurant/onboardImage.png')} style={styles.image} />
                                                </View>
                                                <View>
                                                        <Text style={styles.TitleItem}>Riz Tropical</Text>
                                                        <Text style={styles.ItemDescription}>12 000 FBU</Text>
                                                </View>
                                                <View style={styles.cardIteration}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>2</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>+</Text>
                                                                </View>
                                                        </View>

                                                </View>
                                        </View>
                                </View>

                                <View style={styles.cardPrincipal}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10 }}>
                                                <View style={styles.cardImage}>
                                                        <Image source={require('../../../assets/restaurant/sushiMakizushi.png')} style={styles.image} />
                                                </View>
                                                <View>
                                                        <Text style={styles.TitleItem}>Riz Tropical</Text>
                                                        <Text style={styles.ItemDescription}>12 000 FBU</Text>
                                                </View>
                                                <View style={styles.cardIteration}>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>2</Text>
                                                                </View>
                                                                <View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "red" }}>+</Text>
                                                                </View>
                                                        </View>

                                                </View>
                                        </View>
                                </View>
                                <View style={{ justifyContent: "center", alignContent: "center", alignItems: "center", marginTop: 15 }}>
                                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Total : 62 000 Fbu</Text>
                                </View>
                                <TouchableOpacity style={{ ...styles.cardBouton, marginTop: 20 }}>
                                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: "bold" }}>Envoyer la demande</Text>
                                </TouchableOpacity>
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginHorizontal: 20,
                marginTop: 20
        },
        cardPrincipal: {
                borderRadius: 10,
                backgroundColor: '#EFF0F4',
                justifyContent: "center",
                marginTop: 20
        },
        cardImageMenu: {
                width: 50,
                height: 50,
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 10

        },
        image: {
                width: 70,
                height: 70,
        },
        cardImage: {
                marginVertical: 7,
        },
        TitleItem: {
                fontSize: 17,
                fontWeight: "bold"
        },
        ItemDescription: {
                fontSize: 15,
                fontWeight: "bold",
                color: "red"
        },
        cardIteration: {
                height: 30,
                width: 90,
                borderRadius: 10,
                backgroundColor: '#fff',
                justifyContent: "center",
        },
        cardBouton: {
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 25,
                backgroundColor: "#EE7526",
                marginBottom:20
        },
})