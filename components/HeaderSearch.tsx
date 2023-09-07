import { useRouter } from "expo-router";
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const HeaderSearch = (): any => {
    const { push } = useRouter();
    const SEARCH_RESULT = '/searchs/SearchResult';

    return (
        <View style={styles.container}>
            <TextInput style={styles.search} placeholder="Search..." keyboardType="web-search" onFocus={() => push(SEARCH_RESULT)} />
        </View>
    )
}

export default HeaderSearch;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    search: {
        borderRadius: 10,
        borderWidth: 1,
        opacity: 0.4,
        height: 30,
        width:200,
    }

})