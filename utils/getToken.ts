import * as SecureStore from 'expo-secure-store';

async function getToken(key:string) {
    return await SecureStore.getItemAsync(key);
}

export{
    getToken, 
}