import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Card from "../../components/common/Card";
import { callSmsEmailUrl } from "../../utils/callSmsEmailUrl";
import { getPartners } from "../partners/PartnersSlice";
import { useSelector } from "react-redux";
import { useSearchParams } from "expo-router";

function ViewVolunteer() {
    const volunteers = useSelector(getPartners);
    const { id } = useSearchParams<any>();
    const volunteer = volunteers.find((item: any) => item.partnerId === id);
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView>
                        <ScrollView>
                            <Card>
                                <Image source={{ uri: volunteer.image }} style={styles.image} />
                                <Text />
                                <Text style={styles.title}>Name:  {volunteer.firsName +" "+volunteer.lastName}</Text>
                                <Text />
                                <Text style={styles.status} onPress={()=>callSmsEmailUrl(`mailto:${volunteer.email}`)} ><Text style={styles.statusIn}>Email: </Text> {volunteer.email}</Text>
                                <Text />
                            </Card>
                        </ScrollView>
                    </SafeAreaView>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewVolunteer;

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