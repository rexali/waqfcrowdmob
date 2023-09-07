import FormData from "form-data";
import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";
import axios from "axios";

export const waqfsAPI = {
   // waqfs

   getWaqfs: async () => {
      try {
         let token = await getToken('jwtoken') as string;
         let waqfs = await fetch(`${BASE_URL}/waqfs?page=1`, {
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

   // getUserWaqfs: async (userId: any) => {
   //    try {
   //       let token = await getToken('jwtoken') as string;
   //       let waqfs = await fetch(`${BASE_URL}/waqfs/${userId}/users`, {
   //          method: "GET",
   //          mode: 'cors',
   //          headers: {
   //             'Accept': 'application/json',
   //             'Content-Type': 'application/json',
   //             'Authorization': token
   //          },
   //       });

   //       return await waqfs.json();
   //    } catch (error) {
   //       console.log(error);
   //    }
   // },

   // getUserFavouritesWaqfs: async (userId: any) => {
   //    try {
   //       let token = await getToken('jwtoken') as string;
   //       let waqfs = await fetch(`${BASE_URL}/waqfs/${userId}/favourites`, {
   //          method: "GET",
   //          mode: 'cors',
   //          headers: {
   //             'Accept': 'application/json',
   //             'Content-Type': 'application/json',
   //             'Authorization': token
   //          },
   //       });

   //       return await waqfs.json();
   //    } catch (error) {
   //       console.log(error);
   //    }
   // },

   // deleteUserWaqfs: async (data: any) => {
   //    try {
   //       let token = await getToken('jwtoken') as string;
   //       let waqfs = await fetch(`${BASE_URL}/waqfs/${data.userId}`, {
   //          method: "POST",
   //          mode: 'cors',
   //          headers: {
   //             'Accept': 'application/json',
   //             'Content-Type': 'application/json',
   //             'Authorization': token
   //          },
   //          body: JSON.stringify(data)
   //       });

   //       return await waqfs.json();
   //    } catch (error) {
   //       console.log(error);
   //    }
   // },

   deleteWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let waqfs = await fetch(`${BASE_URL}/waqfs`, {
            method: "delete",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await waqfs.json();
      } catch (error) {
         console.log(error);
      }
   },

   // updateWaqf: async (data: FormData) => {
   //    try {
   //       let token = await getToken('jwtoken') as string;
   //       let res = await fetch(`${BASE_URL}/waqfs/update`, {
   //          method: "patch",
   //          mode: 'cors',
   //          headers: {
   //             'Accept': 'application/json',
   //             'Content-Type': 'multipart/form-data',
   //             boundary: data.getBoundary(),
   //             'Authorization': token
   //          },
   //          body: data as any
   //       });

   //       return await res.json();
   //    } catch (error) {
   //       console.log(error);
   //    }
   // },

   updateWaqf: async (data: FormData) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await axios.patch(`${BASE_URL}/waqfs/update`, data, {
            headers: {
               Authorization: token,
               'Content-Type': 'multipart/form-data'
            }
         });

         return res.data;
      } catch (error) {
         console.log(error);
      }
   },

   updateWaqfFile: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await axios.patch(`${BASE_URL}/waqfs/file`, data, {
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            }
         });

         return res.data;
      } catch (error) {
         console.log(error);
      }
   },

   approveWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let waqfs = await fetch(`${BASE_URL}/waqfs`, {
            method: "patch",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await waqfs.json();
      } catch (error) {
         console.log(error);
      }
   },

   removeUserFavouriteWaqf: async (data: any) => {
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
            body: JSON.stringify(data)
         });

         return await waqfs.json();
      } catch (error) {
         console.log(error);
      }
   },

   addWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let result = await fetch(`${BASE_URL}/waqfs`, {
            method: "post",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await result.json();
      } catch (error) {
         console.log(error);
      }
   },

   shareWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await fetch(`${BASE_URL}/shares`, {
            method: "POST",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await res.json();
      } catch (error) {
         console.log(error);
      }
   },

   likeWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await fetch(`${BASE_URL}/likes`, {
            method: "POST",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await res.json();
      } catch (error) {
         console.log(error);
      }
   },

   rateWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await fetch(`${BASE_URL}/ratings`, {
            method: "POST",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await res.json();
      } catch (error) {
         console.log(error);
      }
   },

   donateWaqf: async (data: any) => {
      try {
         let token = await getToken('jwtoken') as string;
         let res = await fetch(`${BASE_URL}/donations`, {
            method: "POST",
            mode: 'cors',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Authorization': token
            },
            body: JSON.stringify(data)
         });

         return await res.json();
      } catch (error) {
         console.log(error);
      }
   },


}