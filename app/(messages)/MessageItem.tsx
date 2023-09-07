import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Card from "../../components/Card";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { callSmsEmailUrl } from "../../utils/callSmsEmailUrl";
import { getToken } from "../../utils/getToken";
import { useDispatch } from "react-redux";
import { deleteMessageData, getMessagesData } from "./messagesSlice";

const MessageItem = ({ message }: { message: any }) => {
    const router = useRouter();
    const [userId, setUserId] = React.useState<any>('');
    const dispatch = useDispatch<any>();

    ((async () => setUserId(await getToken("userId"))))();


    const deleteMessage = (id: any) => {
        Alert.alert("DELETE", "Want to really delete this?",
            [
                {
                    text: 'Cancel',
                    onPress: () =>  console.log('canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deleteMessageData({messageId:id})).unwrap()
                        setTimeout(() => {
                            dispatch(getMessagesData()).unwrap()
                        }, 1000);
                    },
                    style: 'default',
                },
            ],
        );
    }
    return (
        <View>
            <Card>
                <TouchableOpacity onPress={() => router.push({ pathname: "ViewMessage", params: { ...message } })}>
                    <View >
                        <View style={{ ...styles.content }}>
                            <Text style={{ ...styles.title }}>{message.subject}</Text>
                           {parseInt(userId) === parseInt(message.userId) && <MaterialCommunityIcons name="pencil" size={30} color={"red"} onPress={() => router.push({pathname:"EditMessage", params:{...message}})} /> }
                        </View>
                        <Text numberOfLines={1}>{message.message}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ ...styles.content }}>
                    <MaterialCommunityIcons name="trash-can" size={30} color={"red"} onPress={() => deleteMessage(message.messageId)} />
                    <MaterialCommunityIcons name="email" size={30} onPress={() => callSmsEmailUrl(`mailto:${message.email}`)} />
                </View>
            </Card>
        </View>
    );
}

export default MessageItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textShadowColor: 'green'
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20
    }
});