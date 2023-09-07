import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const beneficiariesAPI = {
   // beneficiaries

   getBeneficiaries: async () => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/beneficiaries`, {
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
   
   addBeneficiary: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/beneficiaries`, {
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
   updateBeneficiary: async (data:any) => {
      try {
         let token =  await getToken('jwtoken') as string;
         let response = await fetch(`${BASE_URL}/beneficiaries`, {
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