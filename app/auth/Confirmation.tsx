import React from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView
} from "react-native";

export default function Confirmation() {

    const [result, setResult] = React.useState('');
    const mountRef = React.useRef(true);

    React.useEffect(() => {
        if (mountRef.current) { setResult("") };
        return () => { mountRef.current = false }
    }, [])

    return (
        <SafeAreaView style={styles.container}>

            <Text style={[styles.label]}>SUCCESS</Text>

            <View style={styles.row}>
                <Text style={styles.label}>{result}</Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    label: {
        fontWeight: "bold",
        textAlign: "center",
    },
    row: {
        marginVertical: 10
    }
})