import { useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

export default function StatusTabScreen(){
        const route = useRoute()
        const {serviceCategory} = route.params
        return(
                <View>
                        <Text>StatusTabScreen</Text>
                </View>
        )
}