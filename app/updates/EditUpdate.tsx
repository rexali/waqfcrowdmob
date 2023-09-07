import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/getToken';
import { addUpdateData, getStatus } from './updatesSlice';

const EditUpdate = ({ update }: { update: any }) => {

    const [userId, setUserId] = React.useState<any>('');

    ((async () => setUserId(await getToken("userId"))))();

    const status = useSelector(getStatus);
    const dispatch = useDispatch<any>()

    const [title, setTitle] = React.useState(update.title);
    const [body, setBody] = React.useState(update.body);

    const updateData = {
        waqfId: update.waqfId,
        title,
        body,
        userId: userId || update.userId
    };

    const handleSubmitUpdate = () => {

        dispatch(addUpdateData(updateData)).unwrap()
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Update</Text>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Subject"
                        keyboardType='default'
                        onChangeText={setTitle}
                    />
                </View>

                <View>
                    <Text>body</Text>
                    <MultilineTextInput
                        multiline
                        numberOfLines={4}
                        placeholder="body"
                        onChangeText={setBody}
                    />
                </View>

                <View style={styles.btnSend}>
                    {status === "succeeded" && <Text style={styles.status}>{status}</Text>}
                    <Button title='Update' color={'green'} onPress={handleSubmitUpdate} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },

    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },

    btnSend: {
        width: 250,
        margin: 10,
        marginBottom: 40,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },
    status: {
        textAlign: 'center'
    }
});

export default EditUpdate