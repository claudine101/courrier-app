import { React, useState } from "react";
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { useNavigation } from "@react-navigation/native";
export default function RechercheScreen() {
    const [search, SetSearch] = useState(null)
    //console.log(search)
    const navigation = useNavigation()
   
    return (

        <View style={{ flexDirection: "row", alignItems: "center",flex:0.14, alignContent: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 5 }}>
            <View style={styles.searchSection}>
                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                <TextInput
                    style={styles.input}
                    placeholder="Recherche..."
                    value={search}
                    onChangeText={(EX) => SetSearch(EX)}
                    onSubmitEditing={() => {
                        navigation.navigate("ResearchTab", { search:search })
                        // handleChange('research',)
                    }}
                    blurOnSubmit={false}
                    returnKeyType="default"
                />
            </View>
            <TouchableOpacity>
            <View  style={styles.cardRecherche}>
                <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHeader: {
        backgroundColor: "red",
        flex: 1

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


})
