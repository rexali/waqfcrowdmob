import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';

const Pagination = () => {
    const [data, setData] = useState<any>([]); // Array to hold the fetched data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [page, setPage] = useState(1); // Current page

    const fetchData = async () => {
        try {
            // Fetch data from an API endpoint using the current page
            const response = await fetch(`https://api.example.com/data?page=${page}`);
            const json = await response.json();
            setData([...data, ...json]); // Append the fetched data to the existing data array
            setIsLoading(false); // Set loading state to false
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        // Render each item in the FlatList
        return (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
            </View>
        );
    };

    const handleLoadMore = () => {
        // Increment the page number and fetch more data
        setPage(page + 1);
        fetchData();
    };

    const renderFooter = () => {
        // Show a loading indicator at the bottom while fetching data
        return isLoading ? (
            <View>
                <ActivityIndicator size="large" />
            </View>
        ) : null;
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

export default Pagination;
