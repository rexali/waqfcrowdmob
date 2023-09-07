import React, { Ref, useRef } from 'react';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { View, TouchableOpacity, Pressable, StyleSheet, Text, TextInput } from 'react-native';
import Dialog from "react-native-dialog";

export function PayNow({ amount, email, btnTitle, data }: { amount: any, email: any, btnTitle: any, data?: any }) {
    let [show, setShow] = React.useState(false);
    let [input, setInput] = React.useState('');

    const handleCancel = () => {
        setShow(false)
    };

    const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

    const beginTransaction = () => {
        if (input) {
            setShow(false);
            paystackWebViewRef.current?.startTransaction()
        } else {
            alert("Enter amount to donate");

        }
    }

    return (
        <View style={{ flex: 0 }}>
            <Paystack
                paystackKey="pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7"
                billingEmail={email}
                amount={amount}
                onCancel={async (e) => {
                    // handle response here
                }}
                onSuccess={async (res) => {
                    // handle response here
                }}
                ref={paystackWebViewRef as Ref<React.ReactNode>}
            />

            {show && (<View >
                <Pressable style={styles.donateBtn} onPress={() => setShow(true)}>
                    <Text style={styles.donateText}>Donate</Text>
                </Pressable>
                <Dialog.Container visible={show}>
                    <Dialog.Title>Enter Amount to Pay</Dialog.Title>
                    {/* <Dialog.Input keyboardType="numeric" onChangeText={setInput} style={styles.input} /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="amount"
                        keyboardType='numeric'
                        onChangeText={setInput}
                    />
                    {/* <Dialog.Button label="Cancel" onPress={handleCancel} /> */}
                    {/* <Dialog.Button label="Pay Now" onPress={beginTransaction} /> */}
                    <Pressable style={styles.commentBtn} >
                        <Text style={styles.commentText} onPress={beginTransaction}>{"Donate Now"}</Text>
                    </Pressable>
                    <Text />
                    <Pressable style={styles.commentBtn} onPress={handleCancel}>
                        <Text style={styles.commentText}>{"Cancel"}</Text>
                    </Pressable>
                </Dialog.Container>
            </View>)}

            <TouchableOpacity style={{
                maxWidth: 220,
                margin: 10,
                marginRight: 'auto', 
                marginLeft: 'auto',
            }}>
                <Pressable style={styles.commentBtn} onPress={() => setShow(true)}>
                    <Text style={styles.commentText}>{btnTitle}</Text>
                </Pressable>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    commentText: {
        color: 'white', textAlign: 'center'
    },
    commentBtn: {
        backgroundColor: 'green',
        minWidth: 80,
        height: 30,
        padding: 4,
        borderRadius: 10
    },

    donateText: {
        color: 'white', textAlign: 'center'
    },
    donateBtn: {
        backgroundColor: 'green',
        maxWidth: 80,
        height: 30,
        padding: 4,
        borderRadius: 10,
        marginTop: 15
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


