import React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

export default function TextButton() {
        return (
                <TouchableWithoutFeedback onPress={onPress}>
                        <View style={{ ...styles.containerStyle, ...containerStyle }}>
                                <Text style={{ ...styles.textStyle, ...textStyle }}>njjj</Text>
                        </View>
                </TouchableWithoutFeedback>
        )
}

const styles = StyleSheet.create({
        containerStyle: {
          backgroundColor: '#4499ff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
        },
        textStyle: {
          color: '#fff',
          fontSize: 20,
        },
      });