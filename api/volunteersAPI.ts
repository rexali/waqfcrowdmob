import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const volunteersAPI = {
   // volunteers 

   getVolunteers: async () => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/volunteers`, {
            method: "GET",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
         });

         return await response.json();
      } catch (error) {
         console.log(error); 
      }
   },
   
   addVolunteer: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/volunteers`, {
            method: "POST",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body:JSON.stringify(data)
         });

         return await response.json();
      } catch (error) {
         console.log(error);
      }
   },
   
   updateVolunteer: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/volunteers`, {
            method: "patch",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body:JSON.stringify(data)
         });

         return await response.json();
      } catch (error) {
         console.log(error);
      }
   },


}