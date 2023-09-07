import React from "react";
import axios from "axios";
import { BASE_URL } from "../constants/Url";
import { saveToken } from '../utils/saveToken';

export const useJWToken = () => {

    const mountRef = React.useRef(true);

    const fetchData = async () => {
        const {data} = await axios.get(`${BASE_URL}/jwt`);  
        await saveToken("jwtoken",data.jwtoken);      
    };

    React.useEffect(() => {

        if (mountRef.current) {
                 fetchData();
        }

        return () => {
            mountRef.current = false
        }

    }, []);    
}