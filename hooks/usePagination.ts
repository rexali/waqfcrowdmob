import React from 'react';
import { BASE_URL } from '../constants/Url';
import { getToken } from '../utils/getToken';


export const usePagination = (page: any) => {
    const [isLoading, setIsLoading] = React.useState(true); // Loading state
    const [data, setData] = React.useState<any>(); // Array to hold the fetched data

    const fetchWaqfData = async () => {
        try {
            // Fetch data from an API endpoint using the current page
            const response = await fetch(`${BASE_URL}/waqfs?page=${page}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await getToken("jwtoken") as string
                },
            });
            // parse the response with json
            const json = await response.json();
            // Append the fetched data to the existing data array
            setData([...data, ...json]);
            // Set loading state to false
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    React.useEffect(() => {
       fetchWaqfData();
    }, [])

    return { isLoading, data }
}