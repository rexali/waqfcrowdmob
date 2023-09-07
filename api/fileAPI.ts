
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

export const fileAPI = {

    postFile: async (formData: any) => {
        try {
            let token = await getToken('jwtoken') as string;
            let fileResponse = await fetch(`${BASE_URL}/files`, {
                method: "post",
                headers: {
                    ...formData.getHeaders(),
                    Authorization: token
                },
                body: JSON.stringify(formData)
            });

            return await fileResponse.json();
        } catch (error) {
            console.log(error);
        }
    },

    uploadFile: async (formData: any) => {
        try {
            let token = await getToken('jwtoken') as string;
            const { data } = await axios({
                baseURL: `${BASE_URL}`,
                url: "/files",
                method: 'post',
                data: formData,
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                }
            });

            return data;
        } catch (error) {
            console.log(error);
        }
    },

    sendFile: async (formData: any) => {

        try {
            let token = await getToken('jwtoken') as string;
            let res = await fetch(BASE_URL + '/files/file', {
                method: 'post',
                body: formData as any,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                },
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    },

    sendFiles: async (formData: any) => {
        try {
            let token = await getToken('jwtoken') as string;
            let res = await fetch(BASE_URL + '/files/files', {
                method: 'post',
                body: formData as any,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                },
            });
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    },

    deleteFile: async (data: any) => {
        try {
            let token = await getToken('jwtoken') as string;
            let notifications = await fetch(`${BASE_URL}/files`, {
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
    }
    
}

