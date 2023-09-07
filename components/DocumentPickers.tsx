import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, Platform, } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { BASE_URL } from '../constants/constant';
import { getToken } from '../utils/getToken';
import axios from 'axios';
import FormData from 'form-data';

export default class DocumentPickers extends React.Component {

    state = {
        image: null,
    };

    createFormData = (body: any) => {
        const data = new FormData();
        // data.append('photo', photo.file, photo.fileName);
        Object.keys(body).forEach((key) => {
            if (key = 'uri') {
                data.append('uri', Platform.OS === 'ios' ? body[key].replace('file://', '') : body[key]);
            }
            data.append(key, body[key]);
        });
        return data;
    };

    _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });
        alert(result);
        console.log(result);
    }

    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: 'image/*' }) as any;
        const fetchRes = await fetch(result.uri);
        const file = await fetchRes.blob();
        const form = new FormData();
        form.append("photo", file, result.name);
        let token = await getToken('jwtoken') as string;
        try {
            const { data } = await axios.post(`${BASE_URL}/files`,
            {
                headers: {

                    // ...form.getHeaders(),
                    // Accept:"application/json",
                    // "Content-Type": "multipart/form-data",
                    // Authorization: token

                    "Authorization": token
                }
            }
            );
        } catch (error) {
            console.log(error);

        }

        // try {
        // let token =  await getToken('jwtoken') as string;
        // let res = await fetch(`${BASE_URL}/files`, {
        //    method: "POST",
        //    mode: 'cors', 
        //    headers: {
        //       'Accept': 'application/json', 
        //       'Content-Type': 'application/json',
        //       'Authorization': token
        //    },
        //    body:form
        // });
        // console.log(await res.json());

        //  } catch (error) {
        //     console.log(error);
        //  }

        // console.log(result);

        if (!result) {
            this.setState({ image: result });
        }
    };

    _pickAnyDoc = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: '&ast;/*' });
        alert(result);
        console.log(result)

        if (!result) {
            this.setState({ image: result });
        }
    };

    render() {
        let { image } = this.state;

        return (
            <View style={styles.container}>
                <Button
                    title="Select Document"
                    onPress={this._pickDocument}
                />
                {/*Added from forum by Aliyu. It would be awesome to get video support added to Expo’s ImagePicker. 
                 For the time being, we managed to get by using a combination of DocumentPicker.getDocumentAsync({ type: 'video/*' }) for Android and ImagePickerIOS.openSelectDialog({ showVideos: true }, success, cancel) for iOS */}
                <View style={{ 'marginTop': 20 }}>
                    <Button
                        title="Select Image"
                        onPress={this._pickImage}
                    />
                    {image &&
                        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});