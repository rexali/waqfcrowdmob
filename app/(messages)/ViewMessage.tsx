import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { Stack, useSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { callSmsEmailUrl } from "../../utils/callSmsEmailUrl";

function ViewMessage() {
    const { subject, message } = useSearchParams<any>()
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Details",}}/>
            <Card>
                <Text style={styles.title}>{subject}</Text>
                <Text>{message}</Text>
                <Text/>
                <MaterialCommunityIcons name="email" size={30} style={{textAlign:'right'}} onPress={() => callSmsEmailUrl(`mailto:${message.email}`)} />
            </Card>
        </View>
    )
}

export default ViewMessage;

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