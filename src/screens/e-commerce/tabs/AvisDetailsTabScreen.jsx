import React from "react";
import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Tabs } from 'react-native-collapsible-tab-view'

/**
 * Screens pour afficher tous les notes effectue sur un produits par rapport du partenaire
 * @author Vanny Boy <vanny@mediabox.bi>
 * @date 17/2/2023
 * @returns 
 */

export default function AvisDetailsTabScreen() {
        return (
                <Tabs.ScrollView>
                        <View style={styles.container}>
                               <Text>Bonjour</Text>
                        </View>
                </Tabs.ScrollView>

        )
}

const styles = StyleSheet.create({
      
})