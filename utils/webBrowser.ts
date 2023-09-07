import * as WebBrowser from 'expo-web-browser';
import {Linking} from 'react-native';

export const _openBrowser = async (url:string) => {
    await WebBrowser.openBrowserAsync(url);
  };

export const _openBrowserWithLinking = (url:string)=>{
     Linking.openURL(url);
}