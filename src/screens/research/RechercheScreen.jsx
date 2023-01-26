import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import EcommerceBadge from '../../components/ecommerce/main/EcommerceBadge';
import { COLORS } from '../../styles/COLORS';

export default function RechercheScreen() {
    return(
        <View style={styles.button}>
         <Text>Bonjour</Text>

        </View>
    )

}

const styles=StyleSheet.create(
    {
        button:{
            backgroundColor:"#ffffcc"
        }
    
    })





