import React from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { callSmsEmailUrl } from "../../utils/callSmsEmailUrl";
import { getTotalZakatDonation } from "./donationsSlice";
import { useRouter } from "expo-router";

export default function ZakatDonation({ donations }: { donations: any }) {
    const router = useRouter();

    const totalZakatDonation = useSelector(getTotalZakatDonation);

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        donationId: data[index].donationId,
        name: data[index].name,
        amount: data[index]?.amount,
        category: data[index]?.category,
        email: data[index]?.email,
    });

    const renderItem = (item: any) => {
        return <View style={styles.row}>
            <Text numberOfLines={1} lineBreakMode='head' style={{ ...styles.cell, color: "blue" }}>{item.donationId}</Text>
            <Text style={{ ...styles.cell }}>{item.amount}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={{ ...styles.cell, color: 'green', textAlign:"center" }}>
                <MaterialCommunityIcons name="email" onPress={() => callSmsEmailUrl(`mailto:` + item.email)} size={28} />
            </Text>
        </View>
    };

    const renderListHeaderComponent = () => {

        return (
            <>
                <Text style={styles.amount}>TOTAL ZAKAT DONATION: {totalZakatDonation}</Text>
                <View style={styles.header}>
                    <Text style={[styles.cell, styles.headerCell]}>S/N</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Amount</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Category</Text>
                    <Text style={[styles.cell, styles.headerCell]}>Donor Mail</Text>
                </View>
            </>
        )
    }

    const renderListFooterComponent = () => {
        return (
            <>
                <View style={styles.header}>
                    <Text style={[styles.cell, styles.headerCell]}>TOTAL</Text>
                    <Text style={[styles.cell, styles.headerCell]}>{totalZakatDonation}</Text>
                    <Text style={[styles.cell, styles.headerCell]}></Text>
                    <Text style={[styles.cell, styles.headerCell]}></Text>
                </View>
                <Pressable style={styles.viewAllBtn} onPress={() => router.push({ pathname: "ViewZakatDonations" })}>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </>
        )
    }

    return (
        <View style={styles.table}>

            <VirtualizedList
                data={donations.slice(0,3)}
                keyExtractor={(item) => item.donationId}
                initialNumToRender={2}
                renderItem={({ item }: { item: any }) => renderItem(item)}
                getItem={getItem}
                getItemCount={getItemCount}
                ListHeaderComponent={renderListHeaderComponent}
                ListFooterComponent={renderListFooterComponent}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    amount: {
        textAlign: "center",
    },
    table: {
        borderWidth: 1,
        borderColor: 'gray',
        margin: 5,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize:12,
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
    viewAllBtn: {
        backgroundColor: "green",
        marginVertical:2,
        padding: 10,
        borderRadius: 10,
        width: 100,
        marginRight: "auto",
        marginLeft: "auto"
    },
    viewAll: {
        textAlign: "center",
        color: "white"
    }
})