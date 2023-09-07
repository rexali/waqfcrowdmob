import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../constants/Url';

export const newsAPI = ({

   async getNews(): Promise<any> {
      try {
         let response = await fetch(`https://almubarakwaqf.org/wp-json/wp/v2/posts`, {
            method: "GET", 
            mode: 'no-cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': await SecureStore.getItemAsync("jwtoken") as string
            }
         });
         return await response.json();
      } catch (error) {
         console.log(error);
      }
   },
   async addPost(data: any): Promise<any> {
      try {
         let response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            mode:"cors",
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': await SecureStore.getItemAsync("jwtoken") as string
            },
            body:JSON.stringify(data)
         });
         return await response.json();
      } catch (error) {
         console.log(error);
      }
   },
})