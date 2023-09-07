import {Linking} from 'react-native';

export const callSmsEmailUrl = (url:string)=>{
    Linking.openURL(url);
}