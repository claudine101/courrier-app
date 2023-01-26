import React, { useEffect, useRef, useState } from "react";
import { Text, View, useWindowDimensions, ImageBackground, TouchableNativeFeedback, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign, Entypo, EvilIcons, Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";

export default function ServicePersonneScreen() {
        const profilRef = useRef(null)

        const ProfilModalize = () => {
                return (
                        <TouchableNativeFeedback style={styles.modalContent} onPress={()=>profilRef.current.close()}>
                                <View style={styles.modalList}>
                                        <View style={styles.modalItem}>
                                                <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", flex: 1 }}>
                                                        
                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Profil du plombier</Text>
                                                </View>
                                                <View style={{ marginBottom: 20, marginTop: 20 }}>
                                                        <Text style={{ color: "#B5B9CD" }}>Nom complet</Text>
                                                        <Text style={{ fontWeight: "bold", color: "#777" }}>Jakson NSENGIYUMVA</Text>
                                                </View>
                                                <View style={{ marginBottom: 20 }}>
                                                        <Text style={{ color: "#B5B9CD" }}>Adresse physique</Text>
                                                        <Text style={{ fontWeight: "bold", color: "#777" }}>23, Avenue de la mission, Rohero, Bujumbura</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <TouchableOpacity >
                                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                        <View >
                                                                        <MaterialCommunityIcons name="map-marker-distance" size={24} color="#EE7526" />
                                                                        </View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B5B9CD" }}>Distance</Text>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>3.4 KM</Text>
                                                                </View>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity >
                                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                        <View >
                                                                                <FontAwesome name="money" size={24} color="#EE7526" />
                                                                        </View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B5B9CD" }}>Tarif Horaire</Text>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>15.000 FBU</Text>
                                                                </View>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity >
                                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                        <View >
                                                                                <Ionicons name="star-half-outline" size={24} color="#EE7526" />
                                                                        </View>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B5B9CD" }}>Notation</Text>
                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>4.5/5</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity>
                                                        <View style={styles.button}>
                                                                <Text style={styles.buttonText}>Envoyer demande de service</Text>
                                                        </View>
                                                </TouchableOpacity>

                                        </View>
                                </View>
                        </TouchableNativeFeedback>
                )
        }
        return (
                <View style={styles.container}>
                        <View style={{ marginHorizontal: 20 }}>
                                <View style={{
                                        backgroundColor: "#fff",
                                        marginTop: 15,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                }}>
                                        <AntDesign name="home" size={24} color="black" />
                                        <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                                        <Entypo name="menu" size={24} color="black" />
                                </View>
                                <View style={styles.cardTitle}>
                                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#9498B5" }}>Service a la personne</Text>
                                </View>

                                <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25 }}>
                                                <View style={styles.searchSection}>
                                                        <EvilIcons name="search" size={24} color="black" />
                                                        <TextInput
                                                                style={styles.input}
                                                                placeholder="Recherche"

                                                        />
                                                </View>
                                                <View style={styles.cardRecherche}>
                                                        <AntDesign name="menuunfold" size={24} color="white" />
                                                </View>
                                        </View>

                                </View>
                                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <View></View>
                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Voir plus</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity >
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <MaterialIcons name="electrical-services" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Electricien</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity >
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <FontAwesome5 name="faucet" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Plombier</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity >
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <MaterialCommunityIcons name="mower" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>coiffeur</Text>
                                                </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity >
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <MaterialCommunityIcons name="hand-saw" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Menuisier</Text>
                                                </View>
                                        </TouchableOpacity>

                                </View>

                                <View>
                                        <TouchableOpacity onPress={() => profilRef.current.open()} style={{ width: 20, height: 20, backgroundColor: "back", marginTop: 50 }}>
                                                <EvilIcons name="location" size={24} color="black" />
                                        </TouchableOpacity>
                                </View>

                        </View>
                        <Portal>
                                <Modalize ref={profilRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                        <ProfilModalize />
                                </Modalize>
                        </Portal>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardTitle: {
                marginTop: 5,
                marginBottom: 5
        },
        searchSection: {
                flexDirection: "row",
                marginTop: 10,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                //justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                backgroundColor: "#D7D9E4",
                width: "84%"
        },
        cardRecherche: {
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#EF4255",
                marginTop: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        cardPhoto: {
                marginTop: 10,
                width: 50,
                height: 50,
                //backgroundColor: "#242F68",
                backgroundColor: "#DFE1E9",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
        },
        modalContent: {
                paddingBottom: 20
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                marginHorizontal: 15
                // flexDirection: 'row',
                // alignItems: 'center',
                // alignContent: 'center'
        },
        cardPhotoModal: {
                marginTop: 10,
                width: 40,
                height: 40,
                //backgroundColor: "#242F68",
                backgroundColor: "#fff",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
        },
        button: {
                marginTop: 15,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: "#EE7526",
        },
        buttonText: {
                color: "#fff",
                fontWeight: "bold",
                // textTransform:"uppercase",
                fontSize: 16,
                textAlign: "center"
        },
})