import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const Table = ({ navigation, data, total }: { navigation: any, data:any, total?:any }) => {

    const WAQF_DETAILS: string = 'Waqf Details'; 

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.row}>  
            <Text numberOfLines={1} lineBreakMode='head' onPress={() => navigation.navigate(WAQF_DETAILS, {waqfData:{}})} style={{...styles.cell,flex:2}}>{item.name}</Text>
            <Text style={{...styles.cell}}>{item.amount}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={{...styles.cell,fontSize:13}}>{item.status}</Text>
        </View>
    );

    return (
        <View style={styles.table}>

            <View style={styles.header}>
                <Text style={[styles.cell, styles.headerCell,{flex:2}]}>Name</Text>
                <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
                <Text style={[styles.cell, styles.headerCell]}>category</Text>
                <Text style={[styles.cell, styles.headerCell]}>Status</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.donationId}
                renderItem={renderItem}
            />

            <View style={styles.header}>
                <Text style={[styles.cell, styles.headerCell, {flex:2}]}>TOTAL</Text>
                <Text style={[styles.cell, styles.headerCell]}>{total}</Text>
                <Text style={[styles.cell, styles.headerCell]}></Text>
                <Text style={[styles.cell, styles.headerCell]}></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    headerCell: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    cell: {
        flex: 1,
        padding: 10,
    },
});

export default Table;
