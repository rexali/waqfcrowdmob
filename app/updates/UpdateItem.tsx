import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Card from "../../components/common/Card";
import { useRouter } from "expo-router";


const UpdateItem = ({ updateItem }: { updateItem: any }) => {

    const UPDATE_DETAILS: string = 'Details';
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push({pathname: UPDATE_DETAILS, params: { updateItem}})}>
            <Card>
                <View>
                    <Text style={styles.title} >{updateItem.title}</Text>
                    <Text  numberOfLines={1}>{updateItem.body}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )

}

export default UpdateItem;


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