import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Label() {
        return (
                <View style={styles.root} >
                        <Text style={styles.text}>Montant</Text>
                </View>
        );
}

const styles = StyleSheet.create({
        root: {
                alignItems: 'center',
                padding: 8,
                backgroundColor: '#4499ff',
                borderRadius: 4,
        },
        text: {
                fontSize: 16,
                color: '#fff',
        },
});
