import React from 'react';
import SearchItem from './SearchItem';
import { SectionList, SafeAreaView, Text, StyleSheet } from 'react-native';

const SearchList = ({ waqfs,}: {waqfs: any }) => {

    const renderSearchItem = ({ item }: { item: any }) => {
        return (
            <SearchItem  waqf={item} />
        )
    };

    return <SectionList
        sections={waqfs}
        keyExtractor={(item, index) => item + index}
        renderItem={renderSearchItem}
        renderSectionHeader={({ section: { purpose } }) => <Text>{purpose}</Text>}
    />
}

export default SearchList;

const styles = StyleSheet.create({
    projectContent: {
        marginLeft: 10
    },
    cause: {
        fontWeight: 'bold',
        margin: 5,
    },
    image: {
        maxWidth: '100%', height: 250, marginRight: 'auto', marginLeft: 'auto'
    },
    btnWrap: {
        justifyContent: 'space-between', flexDirection: 'row', marginTop: 5
    },
    btnView: {},
    title: {
        fontWeight: 'bold',
        margin: 10,
    },
    contentWrap: {
        flexDirection: 'row', justifyContent: 'space-between',
    },

    donateText: {
        color: 'white', textAlign: 'center'
    },
    commentText: {
        color: 'white', textAlign: 'center'
    },
    donateBtn: {
        backgroundColor: 'green',
        width: 80,
        height: 30,
        padding: 4,
        borderRadius: 10
    },
    commentBtn: {
        backgroundColor: 'green',
        width: 80,
        height: 30,
        padding: 4,
        borderRadius: 10
    },
})