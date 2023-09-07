import React from "react";

import { 
    Text, 
    View, 
    TextInput, 
    Button, 
    StyleSheet, 
    Image 
} from "react-native";

import {
    getAuth,
    getError,
    getStatus,
    getUserData,
} from "../(users)/usersSlice";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { isEmail } from "../../utils/isEmail";
import { isEmpty } from "../../utils/isEmpty";
import { escapeHTML } from "../../utils/escapeHTML";

export default function SignIn() {

    const dispatch = useDispatch<any>();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [notEmail, setNotEmail] = React.useState('');
    const [emptyEmail, setEmptyEmail] = React.useState('');
    const [emptyPassword, setEmptyPassword] = React.useState('');
    const router = useRouter();

    const SIGN_UP: string = '/auth/SignUp'; 

    const status = useSelector(getStatus);
    const error = useSelector(getError);
    const auth  = useSelector(getAuth);

    const clearError = (): void => {
        setEmptyPassword("");
        setEmptyEmail("");
        setNotEmail("");
    };

    const handleEmail = (value: string) => {
        setUsername(value);
        clearError();
    };

    const handlePassword = (value: string) => {
        setPassword(value);
        clearError();
    };

    const handleSignIn = () => {
        const newEmail = escapeHTML(username);
        const newPassword = escapeHTML(password);
        if (newEmail) {
            if (newPassword) {
                if (isEmail(newEmail)) {
                    if (!isEmpty(newEmail) && !isEmpty(newPassword)) {
                        const signInData = {
                            email: newEmail,
                            password: newPassword,
                        };
                        dispatch(getUserData(signInData)).unwrap();
                    } else {
                        setEmptyPassword("Empty password or email");
                        setEmptyEmail("Empty email or password");
                    }
                } else {
                    setNotEmail("Not an email");
                }
            } else {
                setEmptyPassword("Empty password");
            }
        } else {
            setEmptyEmail("Empty email");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/awf-logo.png')} style={styles.logo} />

            <Text style={[styles.label, { textAlign: "center", margin: 10 }]}>SIGN IN</Text>

            <View>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    placeholder="Email as username"
                    onChangeText={handleEmail}
                    style={styles.input}
                />
                {emptyEmail && <Text style={styles.error}>{emptyEmail}</Text>}
                {notEmail && <Text style={styles.error}>{notEmail}</Text>}
            </View>

            <View>
                <View style={styles.forgetWrap}>
                    <Text style={styles.label}>Password:</Text>
                    <Text onPress={() => router.push("/auth/Forget")}>Forget password?</Text>
                </View>
                <TextInput
                    placeholder="Password"
                    onChangeText={handlePassword}
                    secureTextEntry
                    style={styles.input}
                />
                {status === "loading" && <Text style={styles.status}>{status}</Text>}
                {status === "succeeded" && <Text style={styles.status}>{status}</Text>}
                {status === "failed" && <Text style={styles.status}>{status}</Text>}
                {emptyPassword && <Text style={styles.error}>{emptyPassword}</Text>}
            </View>

            <Button
                title="Sign in"
                onPress={handleSignIn}
                color={'green'}
            />

            <View style={styles.row}>
                <Text>Don't have an account?</Text>
                <Text style={styles.signUp} onPress={() => router.push(SIGN_UP)}> Sign up</Text>
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
    logo: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 200,
        height: 200,
        borderRadius: 100,

    },
    label: {
        fontWeight: "bold",
    },
    signUp: {
        color: 'green',
    },
    row: {
        flexDirection: 'row',
        margin: 10,
        marginTop: 15,
        justifyContent: "center",
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },
    error: {
        color: 'red'
    },
    status: {
        color: "green",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },

    forgetWrap: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})