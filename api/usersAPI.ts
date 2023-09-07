import { BASE_URL } from "../constants/Url";
import * as SecureStore from 'expo-secure-store';
import { getToken } from "../utils/getToken";

export const usersAPI = ({

    async getUser(data: any): Promise<any> {
        try {
            let response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await SecureStore.getItemAsync("jwtoken") as string
                },
                body: JSON.stringify(data),
            });

            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },


    async addUser(data: any): Promise<any> {

        try {
            let response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await SecureStore.getItemAsync("jwtoken") as string
                },
                body: JSON.stringify(data),
            });

            return await response.json();
        } catch (error) {
            console.log(error);
        }
    },
    async getProfile(id: any): Promise<any> {
        try {
           let response = await fetch(`${BASE_URL}/profiles/${id}/locations`, {
              method: "GET",
              mode: 'cors',
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
     // update profile
     async updateProfile(data: any): Promise<any> {
        try {
           let response = await fetch(`${BASE_URL}/profiles/${data.userId}`, {
              method: "POST",
              mode: 'cors',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': await SecureStore.getItemAsync("jwtoken") as string
              },
              body: JSON.stringify(data)
           });
           return await response.json();
        } catch (error) {
           console.log(error);
        }
     },
  
     
     getUserWaqfs: async (userId:any) => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/waqfs/${userId}/users`, {
              method: "GET",
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
  
     deletUserWaqfs: async (data:any) => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/waqfs/${data.userId}`, {
              method: "POST",
              mode: 'cors',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': token
              },
              body:JSON.stringify(data)
           });
  
           return await waqfs.json();
        } catch (error) {
           console.log(error);
        }
     },
  
     getUserDonations: async (userId:any) => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/donations/${userId}/users`, {
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
     
     getUserZakatDonations: async (userId:any) => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/donations/${userId}/zakat`, {
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
     
     removeUserFavouriteWaqf: async (data:any) => {
        try {
           let token = await getToken('jwtoken') as string;
           let waqfs = await fetch(`${BASE_URL}/waqfs/${data.userId}`, {
              method: "POST",
              mode: 'cors',
              headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': token
              },
              body:JSON.stringify(data)
           });
  
           return await waqfs.json();
        } catch (error) {
           console.log(error);
        }
     },
})