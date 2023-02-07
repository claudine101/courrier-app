import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import EcommerceBadge from '../../components/ecommerce/main/EcommerceBadge';
import { COLORS } from '../../styles/COLORS';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RechercheAllScreen() {
    const [search, setSearch] = useState("")
    const navigation = useNavigation()
    const route = useRoute()
    const{service} = route.params
    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                <TextInput
                    style={styles.input}
                    placeholder="Recherche..."
                    value={search}
                    onChangeText={(ex) => setSearch(ex)}
                    onSubmitEditing={() => {
                        navigation.navigate("ResearchTab", { search: search, service:service })
                    }}
                    blurOnSubmit={false}
                    returnKeyType="default"
                />
            </View>
            <TouchableOpacity>
                <View style={styles.cardRecherche}>
                    <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                </View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: "row",
            alignItems: "center",
            flex: 0.14,
            alignContent: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginTop: 10
        },
        searchSection: {
            flexDirection: "row",
            marginTop: 20,
            padding: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#ddd",
            alignItems: 'center',
            backgroundColor: '#fff',
            backgroundColor: "#D7D9E4",
            width: "84%",
            height: 50,
            paddingHorizontal: 10
        },
        input: {
            flex: 1,
            marginLeft: 10
        },
        cardRecherche: {
            width: 50,
            height: 50,
            borderRadius: 10,
            backgroundColor: COLORS.ecommerceRed,
            marginTop: 8,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 20
        },

    })





