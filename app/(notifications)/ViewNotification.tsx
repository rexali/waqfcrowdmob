import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { Stack, useSearchParams } from "expo-router";

function ViewNotification() {
    const { subject, body } = useSearchParams<any>()
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Details",}}/>
            <Card>
                <Text style={styles.title}>{subject}</Text>
                <Text>{body}</Text>
            </Card>
        </View>
    )
}
export default ViewNotification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontWeight: 'bold'
    },
});