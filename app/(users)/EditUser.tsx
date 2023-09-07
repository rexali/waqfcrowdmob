import React from "react";
import {
    Button,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput
} from "react-native";
import { DateTimePickers } from "../../components/DateTimePickers";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, getUser, getResult, updateUserProfileData, getStatus } from "./usersSlice";
import { getToken } from "../../utils/getToken";
import { useSearchParams, useRouter, Stack } from "expo-router";
import { converToDate } from "../../utils/convertToDate";
import { isLargeFile } from "../../utils/isLargeFile";
import { BASE_URL } from "../../constants/Url";

function EditProfile() {

    const { id } = useSearchParams<any>();

    const dispatch = useDispatch<any>();
    const user = useSelector(getUser);
    const result = useSelector(getResult);
    const profile = useSelector(getProfile);
    const status = useSelector(getStatus)
    const router = useRouter();

    let [date, setDate] = React.useState<any>(profile.dateOfBirth?.split("T")[0]);
    let [photo, setPhoto] = React.useState({ uri: "", type: "", name: "" });
    let [photoUrl, setPhotoUrl] = React.useState('');
    let [photoUrl2, setPhotoUrl2] = React.useState(profile.photo);
    let [firstName, setFirstName] = React.useState(profile.firstName);
    let [lastName, setLastName] = React.useState(profile.lastName);
    let [address, setAddress] = React.useState(profile.address);
    let [age, setAge] = React.useState(profile.age);
    let [phone, setPhone] = React.useState(profile.phone);
    let [email, setEmail] = React.useState(profile.email);
    let [localGovt, setLocalGovt] = React.useState(profile.localGovt);
    let [statez, setState] = React.useState(profile.state);
    let [country, setCountry] = React.useState(profile.country);

    const handleDate = (val: Date) => {
        setDate(converToDate(val));
    };

    const handlePhoto = (val: any) => {
        if (!isLargeFile(val?.size)) {
            setPhotoUrl(val?.uri);
            setPhotoUrl2("");
            setPhoto(val);
        } else {
            alert('Image size is large. Less than 50 KB required');
        }
    };

    const dispatchProfileData = async () => {

        let newProfileData = {
            ...profile,
            dateOfBirth: date,
            photo,
            firstName,
            lastName,
            address,
            age,
            phone,
            email,
            localGovt,
            statez,
            country,
            userId: user.userId || await getToken("userId"),
        };

        dispatch(updateUserProfileData({ ...newProfileData })).unwrap();

    }

    // if (status === "succeeded") {

    //     router.push("/(users)");
    // }

    return (
        <View style={styles.container}>
            {/* update the screen title to "Edit" */}
            <Stack.Screen options={{ title: "Edit Profile", }} />
            <Text style={[styles.label, { marginBottom: 10 }]}>PERSONAL DATA</Text>
            <ScrollView>
                <View>
                    <Text style={styles.label}>Photo</Text>
                    {
                        photoUrl && (
                            <View style={styles.displayImage}>
                                <DisplayImage file={photoUrl} />
                            </View>)
                    }

                    {
                        photoUrl2 ? (
                            <View style={styles.displayImage}>
                                <DisplayImage file={BASE_URL + "/uploads/" + photoUrl2} />
                            </View>
                        ) : !photoUrl ? <MaterialIcons name="person" size={50} /> : <Text />
                    }

                    <View>
                        <Button title="Pick Image" color='green' onPress={async () => handlePhoto(await pickImageVideoAny('image/*'))} />
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        keyboardType='default'
                        defaultValue={profile?.firstName}
                        onChangeText={setFirstName}

                    />
                </View>

                <View>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        keyboardType='default'
                        defaultValue={profile?.lastName}
                        onChangeText={setLastName}

                    />
                </View>

                <View>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        keyboardType='default'
                        defaultValue={profile.age?.toString()}
                        onChangeText={setAge}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        keyboardType='default'
                        defaultValue={profile.phone}
                        onChangeText={setPhone}

                    />
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType='email-address'
                        defaultValue={profile.email}
                        onChangeText={setEmail}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        keyboardType='default'
                        defaultValue={profile.address}
                        onChangeText={setAddress}

                    />
                </View>

                <View>
                    <Text style={styles.label}>Date of Birth: {date}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Date of birth"
                        keyboardType='default'
                        defaultValue={date ?? profile.dateOfBirth}
                    />
                    <DateTimePickers dateCallback={handleDate} />
                </View>

                <View>
                    <Text style={styles.label}>Local Govt.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Local goverment"
                        keyboardType='default'
                        defaultValue={profile.localGovt}
                        onChangeText={setLocalGovt}


                    />
                </View>

                <View>
                    <Text style={styles.label}>State</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="State"
                        keyboardType='default'
                        defaultValue={profile.state}
                        onChangeText={setState}

                    />
                </View>


                <View>
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        keyboardType='default'
                        defaultValue={profile.country}
                        onChangeText={setCountry}
                    />
                </View>

                <View style={styles.btnView}>
                    {status === "succeeded" && <Text style={styles.success}>Success</Text>}
                    <Button title="Update" color={'green'} onPress={() => dispatchProfileData()} />
                </View>

            </ScrollView>
        </View>
    )
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {},
    displayImage: {
        marginRight: 'auto',
        marginLeft: 'auto',
        maxWidth: '100%',
    },

    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },
    btnView: {
        margin: 10,
    },
    success: {
        textAlign: "center"
    }
});