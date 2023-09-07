import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/getToken';
import { Redirect } from 'expo-router';
import { addHelpData, getStatus } from '../helps/helpsSlice';

const AddHelp = () => {

    const [userId, setUserId] = React.useState<any>('');

    ((async () => setUserId(await getToken("userId"))))();

    const status = useSelector(getStatus);
    const dispatch = useDispatch<any>()
    const [question, setQuestion] = React.useState('');
    const [answer, setAnswer] = React.useState('');

    const helpsData = {
        question,
        answer,
        userId
    };

    const handleHelpSubmit = () => {
        dispatch(addHelpData(helpsData)).unwrap();;
    };
    
    React.useEffect(() => {
        if (status === "succeeded") {
            <Redirect href={'/helptabs'} />
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Question</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Question here"
                        keyboardType='default'
                        onChangeText={setQuestion}
                    />
                </View>

                <View>
                    <Text>Answer</Text>
                    <MultilineTextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Answer here"
                        onChangeText={setAnswer}
                    />
                </View>

                <View style={styles.btnSend}>
                    {status === "succeeded" && <Text style={styles.status}>{status}</Text>}
                    <Button title='ADD' color={'green'} onPress={handleHelpSubmit} />
                </View>

            </ScrollView>
        </View>
    );
};

export default AddHelp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white'
    },
    logo: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 200,
        height: 200,
        borderRadius: 100,
    },

    contact: {
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    btnView: {
        margin: 10,
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
        textAlign: 'center',
        color: "green"
    }
});


