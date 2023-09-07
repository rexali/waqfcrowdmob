import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const searchsAPI = {
   // partners

   getSearchs: async (term:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/searchs?term=${term}`, {
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


}