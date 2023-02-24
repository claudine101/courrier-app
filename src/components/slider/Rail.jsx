import React from "react";
import { View, StyleSheet } from 'react-native';

export default function Rail (){
        return (
                <View style={styles.root}/>
              );
}
const styles = StyleSheet.create({
        root: {
          flex: 1,
          height: 7,
          borderRadius: 2,
          backgroundColor: '#7f7f7f',
        },
      });
      