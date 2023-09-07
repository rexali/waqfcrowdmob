import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../../components/common/Card";
import { useSearchParams } from "expo-router";

function ViewUpdate() {
    const { updateItem: { title, body } } = useSearchParams<any>();
    return (
        <View style={styles.container}>
            <Card>
                <Text style={styles.title}>{title}</Text>
                <Text>{body}</Text>
            </Card>
        </View>
    )
}
export default ViewUpdate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontWeight: 'bold'
    },
    notification: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textShadowColor: 'green'
    }
});