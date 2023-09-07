import React from 'react';
import { Button, StyleSheet, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../utils/getToken';
import { getStatus } from '../news/newsSlice';
import { Stack, useSearchParams } from 'expo-router';
import { updateHelpData } from './helpsSlice';

const EditHelp = () => {


    const status = useSelector(getStatus);
    const dispatch = useDispatch<any>();
    const params = useSearchParams<any>();

    const [question, setQuestion] = React.useState(params.question);
    const [answer, setAnswer] = React.useState(params.animation);
    const [userId, setUserId] = React.useState<any>(params.userId);

    ((async () => setUserId(await getToken("userId"))))();

    const helpsData = {
        question,
        answer,
        userId,
        helpId:params.helpId,
    };

    const handleUpdateSubmit = () => {
        dispatch(updateHelpData(helpsData)).unwrap();
    };
 
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Add Question & Answer", headerTitleAlign:'center'}}/>
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
                    {status && <Text style={styles.status}>{status}</Text>}
                    <Button title='ADD' color={'green'} onPress={handleUpdateSubmit} />
                </View>

            </ScrollView>
        </View>
    );
};

export default EditHelp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor:'white'
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
        textAlign:'center'
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
        textAlign: 'center'
    }
});


