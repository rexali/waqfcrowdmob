import React from "react";
import {
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import DisplayVideo from "../../components/DisplayVideo";
import Card from "../../components/Card";
import { BASE_URL } from "../../constants/Url";
import { useSelector } from "react-redux";
import { getWaqfs } from "./waqfsSlice";
import { useSearchParams } from "expo-router";

function ViewWaqf() {
   
    const { waqfId } = useSearchParams<any>();
    const waqfs = useSelector(getWaqfs);
    const waqf = waqfs.find((item: any) => parseInt(item.waqfId) === parseInt(waqfId)); 
    const image = { uri: BASE_URL + "/uploads/" + waqf?.image }; 
    const URI = 'https://via.placeholder.com/50x50.jpg';
    const video = BASE_URL + "/uploads/" + waqf?.video;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Card>
                    <Image source={waqf?.image ? image : { uri: URI }} style={styles.image} />
                    <Text />
                    <Text style={styles.title}>Support:  {waqf?.name}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Status:</Text>  {waqf?.status}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Location: </Text>  {waqf?.state}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Problem: </Text> {waqf?.problem}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Goal: </Text>{waqf?.goal}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Purpose: </Text>{waqf?.purpose}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Description: </Text>  {waqf?.description}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Our tagert: </Text>  {waqf?.target}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Amount Collected so far: </Text>  {waqf?.collectedAmount}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Expected Amount: </Text>  {waqf?.expectedAmount}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Is Donation Allowed: </Text>  {waqf?.isDonationAllowed}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>Start on: </Text>  {waqf?.createdAt}</Text>
                    <Text />
                    <Text style={styles.status}><Text style={styles.statusIn}>End on: </Text>  {waqf?.endAt}</Text>
                    <Text />
                    {waqf?.video && <DisplayVideo url={video} />}
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewWaqf;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        textAlign: 'center'
    },
    image: { width: 100, height: 100, marginRight: "auto", marginLeft: 'auto' },
    status: {},
    statusIn: { fontWeight: "bold" },
    location: {},
    input: {
        height: 40,
        margin: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        maxWidth: '100%',
    },
})