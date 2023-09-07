import React from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { getWaqfs } from "../(waqfs)/waqfsSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { callSmsEmailUrl } from "../../utils/callSmsEmailUrl";
import { getTotalWaqfDonation } from "./donationsSlice";

export default function WaqfDonation({ donations }: { donations: any }) {

    const WAQF_DETAILS: string = "/(waqfs)/ViewWaqf";

    const totalWaqfDonation = useSelector(getTotalWaqfDonation);
    const router = useRouter();

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        donationId: data[index].donationId,
        name: data[index].name,
        amount: data[index]?.amount,
        category: data[index]?.category,
        status: data[index]?.status,
        waqfId: data[index]?.waqfId,
        email: data[index]?.email,
    });

    const renderItem = (item: any) => {

        return <View style={styles.row}>
            <Text
                numberOfLines={1}
                lineBreakMode='head'
                onPress={() => router.push({
                    pathname: WAQF_DETAILS,
                    params: { waqfId: item.waqfId }
                })}
                style={{ ...styles.cell, color: "blue" }}>{item.name}</Text>
            <Text style={{ ...styles.cell }}>{item.amount}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={{ ...styles.cell, fontSize: 13, color: 'green', textAlign:"center" }}>
                <MaterialCommunityIcons name="email" onPress={() => callSmsEmailUrl(`mailto:` + item.email)} size={28} />
            </Text>
        </View>
    };

    const renderListHeaderComponent = () => {

        return (
            <>
                <Text style={styles.amount}>TOTAL WAQF DONATION: {totalWaqfDonation}</Text>
                <View style={styles.header}>
                    <Text style={[styles.cell, styles.headerCell]}>Name</Text>
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
                    <Text style={[styles.cell, styles.headerCell]}>{totalWaqfDonation}</Text>
                    <Text style={[styles.cell, styles.headerCell]}></Text>
                    <Text style={[styles.cell, styles.headerCell]}></Text>
                </View>
                <Pressable style={styles.viewAllBtn} onPress={() => router.push({ pathname: "ViewWaqfDonations" })}>
                    <Text style={styles.viewAll}>View All</Text>
                </Pressable>
            </>

        )
    }

    return (
        <View style={styles.table}>
            <VirtualizedList
                data={donations?.slice(0, 2)}
                keyExtractor={(item) => item.donationId}
                initialNumToRender={2}
                renderItem={({ item }: { item: any }) => renderItem(item)}
                getItem={getItem}
                getItemCount={getItemCount}
                showsVerticalScrollIndicator={true}
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