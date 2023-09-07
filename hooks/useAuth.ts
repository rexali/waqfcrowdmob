import React from "react";
import { restoreToken } from "../app/(users)/usersSlice";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import { getToken } from "../utils/getToken";

const useAuth = (dispatch: any) => {

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {

      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('token');
      } catch (error) {
        // Restoring token failed
        console.log(error);
      }
      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      const jwtoken = await getToken('jwtoken') as string;
      
      try {
        const { data: { result, token } } = await axios.post(`${BASE_URL}/auth/verify`, { token: userToken }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': jwtoken
          }
        });

        if (result) {
          dispatch(restoreToken(token));
        } else {
          dispatch(restoreToken(null));
        }
      } catch (error) {
        console.warn(error);
      }
    };

    bootstrapAsync();
  }, []);
  
}

export { useAuth };
