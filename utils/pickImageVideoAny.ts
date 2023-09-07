import * as DocumentPicker from 'expo-document-picker';
// import { fileAPI } from '../api/fileAPI';
import { Alert, PermissionsAndroid } from 'react-native';
import FormData from 'form-data';

export const pickImageVideoAny = async (type: string) => {
    try {
        const result = await checkPermissions();

        // let formData = new FormData();

        if (result) {

            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: true,
                type: type,
            });

            if (result.type === 'success') {

                // let namesParts = result.name.split('.');
                // let fileType = namesParts[namesParts.length-1]
              
                // formData.append('my_picture', {
                //      uri: result.uri, 
                //      type: "application/"+fileType, 
                //      name: result.name 
                //     });

                // const res = await fileAPI.sendFile(formData);

                return result;   //.uri;
            } 
        }

    } catch (err) {
        console.warn(err);
    }
}


const checkPermissions = async () => {
    try {
        const result = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        if (!result) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title:
                        'You need to give storage permission to download and save the file',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
                return true;
            } else {
                Alert.alert('Error', ('PERMISSION_ACCESS_FILE'));

                console.log('Camera permission denied');
                return false;
            }
        } else {
            return true;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
};

const uploadImage = async () => {

    const BASE_URL = 'xxxx';
    let result: any;
    // Check if any file is selected or not
    if (result != null) {
        // If file selected then create FormData
        const data = new FormData();

        data.append('file_attachment', {
            uri: result.uri,
            name: result.name,
            type: result.mimeType,
        });

        // return
        try {
            let res = await fetch(BASE_URL + 'tutorial/upload.php', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            let result = await res.json();
            console.log('result', result);
            if (result.status == 1) {
                Alert.alert('Info', result.msg);
            }
        } catch (error) {
            // Error retrieving data
            // Alert.alert('Error', error.message);
            console.log('error upload', error);
        }
    } else {
        // If no file selected the show alert
        Alert.alert('Please Select File first');
    }
};

async function selectFile() {
    try {
        const result = await checkPermissions();

        if (result) {
            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                type: 'image/*',
            });

            if (result.type === 'success') {
                // Printing the log realted to the file
                console.log('res : ' + JSON.stringify(result));
                // Setting the state to show single file attributes
                //   setSingleFile(result);
            }
        }
    } catch (err) {
        //   setSingleFile(null);
        console.warn(err);
        return false;
    }
}