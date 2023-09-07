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
import { useSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { getBeneficiaries } from "./beneficiariesSlice";

function ViewBeneficiary() {
    const beneficiaries = useSelector(getBeneficiaries);
    const { id } = useSearchParams<any>();
    const beneficiary = beneficiaries.find((item: any) => item.partnerId === id);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView>
                        <ScrollView>
                            <Card>
                                <Image source={{ uri: beneficiary.image }} style={styles.image} />
                                <Text />
                                <Text style={styles.title}>Name:  {beneficiary.firstName+" "+beneficiary.lastName}</Text>
                                <Text />
                                <Text onPress={()=>callSmsEmailUrl(beneficiary.email)}><Text style={styles.statusIn}>Email</Text>  {beneficiary.email}</Text>
                                <Text />
                            </Card>
                        </ScrollView>
                    </SafeAreaView>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewBeneficiary;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        textAlign: 'center'
    },
    image: { width: 100, height: 100, marginRight: "auto", marginLeft: 'auto' },
    statusIn: { fontWeight: "bold" },
    input: {
        height: 40,
        margin: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        maxWidth: '100%',
    },
})