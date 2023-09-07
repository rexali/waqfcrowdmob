import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import SearchList from './SearchList';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchData, getSearchs, getStatus } from './searchsSlice';
import { Stack } from 'expo-router';

const ViewSearch = () => {

    const [search, setSearch] = React.useState('')
    const waqfs = useSelector(getSearchs);
    const dispatch = useDispatch<any>();

    const handleSearch = (val: string) => {
        setSearch(val);
        dispatch(getSearchData(val)).unwrap();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Search Waqf" }} />
            <TextInput style={styles.search} placeholder="Search.." defaultValue={search} keyboardType="web-search" onChangeText={handleSearch} />
            {
                waqfs.length ? <SearchList waqfs={waqfs} /> : <Text style={{ textAlign: 'center' }}>Nothing found yet</Text>
            }
        </View>
    )
}

export default ViewSearch;

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 50
    },
    search: {
        borderRadius: 10,
        borderWidth: 2,
        height: 40,
        opacity: 0.2,
    }

})