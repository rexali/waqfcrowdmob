import { useRouter } from "expo-router";
import React from "react";
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    SafeAreaView
} from "react-native";

export default function ResetPassword() {

    const [email, setEmail] = React.useState('');
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.label, { textAlign: "center", }]}>FORGET PASSWORD</Text>

            <View style={styles.row}>
                <Text style={styles.label}>EMAIL:</Text>
                <TextInput
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                    secureTextEntry
                />
            </View>

            <View style={styles.row}>
                <Button
                    title="Submit"
                    color={'green'}
                />
            </View>
            <Text/>
            <View style={styles.row}>
                {<Button
                    title="Reset Now"
                    color={'green'}
                    onPress={() => router.push({pathname:"Reset Password", params:{ email }})}
                />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    label: {
        fontWeight: "bold",
    },
    row: {
        marginVertical: 10
    }
})