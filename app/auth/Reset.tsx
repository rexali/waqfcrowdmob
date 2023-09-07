import { useRouter } from "expo-router";
import React from "react";
import {
    Text,
    SafeAreaView,
    TextInput,
    Button,
    StyleSheet,
    View
} from "react-native";

export default function ResetPassword() {
    
    const router = useRouter();
    const [password, setPassword] = React.useState('');
    const [cpassword, setCPassword] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.label, { textAlign: "center", }]}>RESET PASSWORD</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    placeholder="Password"
                    value={cpassword}
                    onChangeText={setCPassword}
                    secureTextEntry
                />
            </View>

            <Button
                title="Reset"
                color={'green'}
            />
            <Text/>

            <View style={styles.row}>
                {<Button
                    title="Sign in now"
                    color={'green'}
                    onPress={() => router.push({pathname:"Sign In", params:{}})}
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
});