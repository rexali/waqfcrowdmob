import { useRouter } from "expo-router";
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const Search = (): any => {
    const SEARCH_RESULT = '/searchs/SearchResult';
    const { push } = useRouter();


    return (
        <View style={styles.container}>
            <TextInput style={styles.search} placeholder="Search.." keyboardType="web-search" onFocus={() => push(SEARCH_RESULT)} />
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    search: {
        borderRadius: 10,
        borderWidth: 1,
        opacity: 0.4,
        height: 40,
    }

})