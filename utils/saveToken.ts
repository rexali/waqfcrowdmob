import * as SecureStore from 'expo-secure-store';

async function saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key,value);
}

export{
    saveToken
}