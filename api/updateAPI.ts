import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const updateAPI = {

   getUpdate: async (id:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let updates = await fetch(`${BASE_URL}/updates/${id}`, {
            method: "GET",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
         });

         return await updates.json();
      } catch (error) {
         console.log(error);
      }
   },
   
   addUpdate: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let res = await fetch(`${BASE_URL}/updates`, {
            method: "post",
            mode: 'cors',
            body:JSON.stringify(data),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
         });

         return await res.json();
      } catch (error) {
         console.log(error);
      }
   },

}