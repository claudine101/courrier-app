import React, { useCallback, useState } from "react";
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
export default function AllFiltersScreen() {
    const navigation = useNavigation()

    return (
        <>
            <ScrollView>
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
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.secionTitle}>Ordonne par</Text>
                    </View>
                    <View style={styles.principal}>
                        <FontAwesome5 name="first-order" size={24} color="black" />
                        <View >
                            <Text style={styles.filtres}>Les moins chers</Text>
                        </View>
                    </View>
                    <View style={styles.principal}>
                        <FontAwesome5 name="first-order" size={24} color="black" />
                        <View>
                            <Text style={styles.filtres}>Les plus chers</Text>
                        </View>
                    </View>
                    <View style={styles.principal}>
                        <FontAwesome5 name="first-order" size={24} color="black" />
                        <View>
                            <Text style={styles.filtres}>Les plus achetes</Text>
                        </View>
                    </View>

                    <View style={styles.principal}>
                        <FontAwesome5 name="first-order" size={24} color="black" />
                        <View >
                            <Text style={styles.filtres}> Les Notes et revues</Text>
                        </View>
                    </View>
                    <View style={styles.principal}>
                        <FontAwesome5 name="first-order" size={24} color="black" />
                        <View>
                            <Text style={styles.filtres}>Les les nouveautes</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.secionTitle}>Ordonne par prix</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Les catégories</Text>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </View>

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        paddingVertical: 10,
    },
    filtres: {
        paddingHorizontal: 10,
        fontSize: 15
    },
     title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontSize: 17,
                    fontWeight: "bold"
          },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10
},
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        backgroundColor: '#FFF',
    },
    headerBtn: {
        padding: 10
    },

    secionTitle: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 17,
        fontWeight: "bold"
    },
    headerBtn: {
        padding: 10
    },
    cardIcon: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: "#777"
    },
    principal: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginVertical: 15
    },
    container: {
        flex: 1,
        marginHorizontal: 15
    }
})








