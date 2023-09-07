import React from 'react';
import { Button, StyleSheet, View, Text,ScrollView, TextInput } from 'react-native';
import { MultilineTextInput } from '../../components/common/MultilineTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { addNewsData, getStatus, setStatus } from './newsSlice';
import { Stack } from 'expo-router';

const AddPost = () => {

    const status = useSelector(getStatus);
    const dispatch = useDispatch<any>()
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const newsData = {
        title,
        content,
        status:'publish'
    };

    const handleNewsSubmit = () => {
        dispatch(addNewsData(newsData)).unwrap();  
    };

    React.useEffect(() => {
          dispatch(setStatus({}));
      },[]);
 
    return (
        <View style={styles.container}>
      <Stack.Screen options={{ title: "Add Post",}}/>

            <Text style={styles.contact}>Add Post</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Subject</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Subject"
                        keyboardType='default'
                        onChangeText={setTitle}
                    />
                </View>
 
                <View>
                    <Text>Message</Text>
                    <MultilineTextInput
                        multiline
                        numberOfLines={4}
                        placeholder="Message"
                        onChangeText={setContent}
                    />
                </View>

                <View style={styles.btnSend}>
                    {status && <Text style={styles.status}>{status}</Text>}
                    <Button title='Post' color={'green'} onPress={handleNewsSubmit} />
                </View>

            </ScrollView>
        </View>
    );
};

export default AddPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
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
        textAlign:'center',
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
