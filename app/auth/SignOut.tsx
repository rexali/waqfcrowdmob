import React from "react";
import { View, Button, } from "react-native";
import { signOut } from "../(users)/usersSlice";
import { useDispatch } from "react-redux";

export default function SignOUtScreen() {

    const dispatch = useDispatch();
    const handleSignOUt = () => {
        const token: string = "";
        dispatch(signOut(token))
    };

    return (
        <View>
            <Button
                title="Sign Out"
                onPress={handleSignOUt}
                color={'green'}
            />
        </View>
    );
}
