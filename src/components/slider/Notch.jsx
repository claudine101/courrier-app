import React from "react";
import { View, StyleSheet } from 'react-native';

export default function Notch(){
        return (
                <View style={styles.root}/>
              );
}

const styles = StyleSheet.create({
        root: {
          width: 8,
          height: 8,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: '#4499ff',
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderTopWidth: 8,
        },
      });