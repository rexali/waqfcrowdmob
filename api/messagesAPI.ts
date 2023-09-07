import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const messagesAPI = {

   getMessages: async () => {
      try {
         let token = await getToken('jwtoken') as string;
         let notifications = await fetch(`${BASE_URL}/messages`, {
            method: "GET",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
         });

         return await notifications.json();
      } catch (error) {
         console.log(error);
      }
   },

   addMessage: async (data:any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let mes = await fetch(`${BASE_URL}/messages`, {
            method: "post",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body:JSON.stringify(data),
         });

         return await mes.json();
      } catch (error) {
         console.log(error);
      }
   },

   
   deleteMessage: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let notifications = await fetch(`${BASE_URL}/messages`, {
            method: "delete",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await notifications.json();
      } catch (error) {
         console.log(error);
      }
   },

   updateMessage: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/messages`, {
            method: "patch",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await response.json();
      } catch (error) {
         console.log(error);
      }
   },

}