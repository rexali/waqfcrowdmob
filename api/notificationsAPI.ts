import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const notificationAPI = {

   getNotifications: async () => {
      try {
         let token = await getToken('jwtoken') as string;

         let notifications = await fetch(`${BASE_URL}/notifications`, {
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

   addNotification: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let notifications = await fetch(`${BASE_URL}/notifications`, {
            method: "POST",
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

   deleteNotification: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let notifications = await fetch(`${BASE_URL}/notifications`, {
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

   updateNotification: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let notifications = await fetch(`${BASE_URL}/notifications`, {
            method: "patch",
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

}