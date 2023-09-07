import React from "react";
import { Text, View, TextInput, Button, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { 
    addUserData, 
    getStatus 
} from "../(users)/usersSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Stack, useRouter } from "expo-router";
import { isEmail } from "../../utils/isEmail";
import { isEmpty } from "../../utils/isEmpty";
import { isAtLeast8Characters } from "../../utils/isAtLeast8Characters";
import { escapeHTML } from "../../utils/escapeHTML";
import { isProperPassword } from "../../utils/isProperPassword";

export default function SignInScreen() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const [mismatch, setMismatch] = React.useState('');
    const [notEmail, setNotEmail] = React.useState('');
    const [empty, setEmpty] = React.useState('');
    const [notAtLeastEight, setNotAtLeastEight] = React.useState('');
    const [notProperPassword, setNotProperPassword] = React.useState('');
    
    const dispatch = useDispatch<any>();
    const router = useRouter()
    
    let status = useSelector(getStatus);
    
    const clearError = (): void => {
        setMismatch("");
        setEmpty("");
        setNotAtLeastEight("");
        setNotEmail("");
        setNotProperPassword("");
    };

    const handleEmail = (value: string) => {
        setUsername(value);
        clearError();
    };

    const handlePassword = (value: string) => {
        setPassword(value);
        clearError();
    };

    const handleCPassword = (value: string) => {
        setCPassword(value);
        clearError();
    };

    const handleSignUp = () => {

        const newEmail = escapeHTML(username);
        const newPassword = escapeHTML(password);
        const newCpassword = escapeHTML(cPassword);

        if (newEmail) {
            if (newPassword) {
                if (isEmail(newEmail)) {
                    if (!isEmpty(newEmail) && !isEmpty(newPassword)) {
                        if (newPassword === newCpassword) {
                            if (isAtLeast8Characters(newPassword)) {
                                if (isProperPassword(newPassword)) {
                                    const signUpData = {
                                        email: newEmail,
                                        password: newPassword,
                                        role: 'user',
                                        status: "0",
                                        rCode: nanoid(52),
                                        createdAt: "2023-06-03 10:21:47",
                                        updatedAt: "2023-06-03 10:21:47"
                                    };
                                    
                                    dispatch(addUserData(signUpData)).unwrap();
                                } else {
                                    setNotProperPassword("Add special symbol e.g., !, ?, &, @, * to your password");
                                }

                            } else {
                                setNotAtLeastEight("Enter at least than eight (8) characters")
                            }

                        } else {
                            setMismatch("Password mismatch")
                        }

                    } else {
                        setEmpty("Empty password or email")
                    }

                } else {
                    setNotEmail("Not email");
                }

            } else {
                setEmpty("Empty password")
            }
        } else {
            setEmpty("Empty email")
        }
    };

    return (
        <View style={styles.container}>
             <Stack.Screen options={{ title: "Edit",}}/>


            <Image source={require('../../assets/awf-logo.png')} style={styles.logo} />

            <Text style={[styles.label, { textAlign: "center", }]}>SIGN UP</Text>
            <View>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    placeholder="Enter email as username"
                    onChangeText={handleEmail}
                    style={styles.input}
                />
                {notEmail && <Text style={styles.danger}>{notEmail}</Text>}
                {empty && <Text style={styles.danger}>{empty}</Text>}
            </View>

            <View>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    placeholder="Password"
                    onChangeText={handlePassword}
                    secureTextEntry
                    style={styles.input}
                />
                {empty && <Text style={styles.danger}>{empty}</Text>}
                {notProperPassword && <Text style={styles.danger}>{notProperPassword}</Text>}
            </View>

            <View>
                <Text style={styles.label}>Confirm Password:</Text>
                <TextInput
                    placeholder="Password"
                    onChangeText={handleCPassword}
                    secureTextEntry
                    style={styles.input}

                />
                {mismatch && <Text style={styles.danger}>{mismatch}</Text>}
                {notAtLeastEight && <Text style={styles.danger}>{notAtLeastEight}</Text>}
                {status === "loading" && (<Text style={styles.status}>{"Sending data..."}</Text>)}
                {status === "succeeded" && (<Text style={styles.status}>{"Success"}</Text>)}
                {status === "failed" && (<Text style={styles.status}>{"Error"}</Text>)}
            </View>

            <View style={styles.btn}>
                <Button
                    title="Sign Up"
                    onPress={handleSignUp}
                    color={'green'}
                />
            </View>

            <View style={styles.btn}>
                {status === "succeeded" && <Button
                    title="Sign in"
                    onPress={() => router.replace("/(users)/auth/SignIn")}
                    color={'green'}
                />}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
    },
    label: {
        fontWeight: "bold",
    },
    logo: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 10,
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },
    danger: {
        color: 'red',
    },
    status: {
        color: "green",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    btn: {
        marginVertical: 10
    }

})