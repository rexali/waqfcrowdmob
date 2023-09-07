import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function DisplayImage(
    {
        file,
    }: {
        file: any
    }) {

    return (
        <View style={styles.container}><Image source={{ uri: file }} style={styles.image} /></View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    image:{
        width:100,
        height:100  
    }
}); 
