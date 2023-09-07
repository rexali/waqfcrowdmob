import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const donationsAPI = ({

    
    getDonations: async () => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/donations`, {
              method: "get",
              mode: 'cors',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': token
              },
           });
  
           return await waqfs.json();
        } catch (error) {
           console.log(error);
        }
     },
});