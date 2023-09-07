import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const partnersAPI = {
   // partners

   getPartners: async () => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/partners`, {
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
   
   addPartner: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/partners`, {
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
   
   updatePartner: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/partners`, {
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