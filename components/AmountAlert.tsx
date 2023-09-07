import React from "react";
import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import Dialog from "react-native-dialog";

export const AmountAlert = ({ startPay, setAmount}: { startPay: any, setAmount: any}) => {
    let [show, setShow] = React.useState(false);
    let [input, setInput] = React.useState('');

    const handleCancel = () => {
        setShow(false)
    };

    const handlePay = () => {
        if (input) {
            setAmount(input);
            startPay();
            setShow(false);
        } else {
            alert('Enter Amount');
        }

    };

    return (
        <View >
            <Pressable style={styles.donateBtn} onPress={() => setShow(true)}>
                <Text style={styles.donateText}>Donate</Text>
            </Pressable>
            <Dialog.Container visible={show}>
                <Dialog.Title>Enter Amount to Pay</Dialog.Title>
                {/* <Dialog.Input keyboardType="numeric" onChangeText={setInput} /> */}
                <TextInput
                    style={styles.input}
                    placeholder="amount"
                    keyboardType='numeric'
                    onChangeText={setInput}
                />
                <Dialog.Button label="Cancel" onPress={handleCancel} style={{ marginRight: 30 }} />
                <Dialog.Button label="Pay Now" onPress={handlePay} />
            </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    donateText: {
        color: 'white', textAlign: 'center'
    },
    donateBtn: {
        backgroundColor: 'green',
        maxWidth: 80,
        height: 30,
        padding: 4,
        borderRadius: 10,
        marginTop:15
    },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        maxWidth: '100%',
    },
})