import React from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Button, SafeAreaView } from "react-native";
import { MultilineTextInput } from "../../components/common/MultilineTextInput";
import { SelectPicker } from "../../components/SelectPicker";
import { DateTimePickers } from "../../components/DateTimePickers";
import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import { isLargeFile } from "../../utils/isLargeFile";
import { getFileType } from "../../utils/getFileType";
import FormData from 'form-data';
import { useDispatch, useSelector } from "react-redux";
import { getResult, getStatus, getVolunteers, updateVolunteerData } from "./VolunteersSlice";
import { fileAPI } from "../../api/fileAPI";
import { getToken } from "../../utils/getToken";
import { useSearchParams } from "expo-router";
import { BASE_URL } from "../../constants/Url";

export default function EditVolunteer() {

    const volunteers = useSelector(getVolunteers);
    const { volunteerId } = useSearchParams<any>();
    const volunteer = volunteers.find((item: { volunteerId: any }) => parseInt(item.volunteerId) === parseInt(volunteerId));

    const [firstName, setFirstName] = React.useState<any>(volunteer.firstName);
    const [lastName, setLastName] = React.useState<any>(volunteer.lastName);
    const [email, setEmail] = React.useState<any>(volunteer.email);
    const [phone, setPhone] = React.useState<any>(volunteer.phone);
    const [age, setAge] = React.useState<any>(volunteer.age);
    const [gender, setGender] = React.useState<any>(volunteer.gender);
    const [address, setAddress] = React.useState<any>(volunteer.address);
    const [localGovt, setLocalGovt] = React.useState<any>(volunteer.localGovt);
    const [state, setState] = React.useState<any>(volunteer.State);
    const [country, setCountry] = React.useState<any>(volunteer.country);
    const [purpose, setPurpose] = React.useState<any>(volunteer.purpose);
    const [dateOfBirth, setDateOfBirth] = React.useState<any>(volunteer.dateOfBirth);
    const [occupation, setOccupation] = React.useState<any>(volunteer.occupation);
    const [education, setEducation] = React.useState<any>(volunteer.education);
    const [image, setImage] = React.useState<any>(volunteer.image);
    const [imageUrl, setImageUrl] = React.useState<any>();
    const [imageUrl2, setImageUrl2] = React.useState<any>(volunteer.imageUrl);
    const [cv, setCv] = React.useState<any>(volunteer.cv);
    const [cvUrl, setCvUrl] = React.useState<any>(volunteer.cvUrl);
    const [userId, setUserId] = React.useState<any>('');

    ((async () => setUserId(await getToken("userId"))))();

    const dispatch = useDispatch<any>();
    const result = useSelector(getResult);
    const status = useSelector(getStatus);

    const states: string[] = ['Kano', 'Kogi', 'Others'];

    const genders: string[] = ['Male', 'Female', 'Neutral'];

    // return new states starting with a partner state
    states.filter((item, i) => item !== volunteer.state).unshift(gender.state);
    // return new states starting with a beneficiary state
    genders.filter((item, i) => item !== volunteer.gender).unshift(volunteer.gender);

    const volunteerData = {
        userId,
        firstName,
        lastName,
        gender,
        purpose,
        email,
        phone,
        age,
        image: image?.name,
        address,
        localGovt,
        state,
        country,
        dateOfBirth,
        occupation,
        education,
        cv: cv?.name,
        volunteerId
    }

    const formData = new FormData();

    const handleUpdateVolunteer = async () => {

        formData.append('my_cv', {
            uri: cv.uri,
            type: "application/" + getFileType(cv),
            name: cv?.name
        });

        formData.append('my_image', {
            uri: image.uri,
            type: "application/" + getFileType(image),
            name: image?.name
        });

        dispatch(updateVolunteerData(volunteerData)).unwrap();

        if (status === "succeeded") {
            const res = await fileAPI.sendFiles(formData);
            if (!res.result) {
                await fileAPI.sendFiles(formData);
            }
        }

        console.log(volunteerData);
    }


    const handleState = (val: any) => {
        setState(val);
    };

    const handleDateOfBirth = (val: any) => {
        let result = val.toLocaleDateString().split("/").reverse();
        let result2 = result[0] + "-" + result[1] + "-" + result[2];
        setDateOfBirth(result2);
    }
    const handleImage = (val: any) => {
        if (!isLargeFile(val?.size)) {
            setImageUrl(val?.uri);
            setImageUrl2("");
            setImage(val);
        } else {
            alert('Image size is large. Less than 50 KB required');
        }

    };

    const handleCvPDF = (val: any) => {
        if (!isLargeFile(val?.size)) {
            if (val?.uri.endsWith('.pdf')) {
                setCvUrl(val?.uri);
                setCv(val);
            } else {
                alert('Select PDF');
            }
        } else {
            alert('File size is large. Less than 50 KB required');
        }
    };

    const handleGender = (val: any) => {
        setGender(val);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>APPLY</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <View>
                        <Text>Volunteer's First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's First Name"
                            keyboardType='default'
                            defaultValue={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's lastName</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's lastt Name"
                            keyboardType='default'
                            defaultValue={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Age</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's age"
                            keyboardType='numeric'
                            defaultValue={age}
                            onChangeText={setAge}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType='default'
                            defaultValue={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's phone"
                            keyboardType='default'
                            defaultValue={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Local Government</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Local govt of the Volunteer"
                            keyboardType='default'
                            defaultValue={localGovt}
                            onChangeText={setLocalGovt}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's State: {state}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleState} data={states} />
                        </View>
                    </View>

                    <View>
                        <Text>Volunteer's Country</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Country"
                            keyboardType='default'
                            defaultValue={country}
                            onChangeText={setCountry}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Purpose</Text>
                        <MultilineTextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Volunteer's Purpose or aim"
                            maxWidth='100%'
                            defaultValue={purpose}
                            onChangeText={setPurpose}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Education</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Area of spcialization"
                            keyboardType='default'
                            defaultValue={purpose}
                            onChangeText={setEducation}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Occupation</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's Occupation"
                            keyboardType='default'
                            defaultValue={occupation}
                            onChangeText={setOccupation}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Gender: {gender}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleGender} data={genders} />
                        </View>
                    </View>


                    <View>
                        <Text>Waqf's CV or resume in PDF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Upload your cv"
                            value={cvUrl}
                            aria-disabled
                        />
                    </View>

                    <View>
                        <Button title="Pick CV" color='green' onPress={async () => handleCvPDF(await pickImageVideoAny('*/*') as any)} />
                    </View>

                    <View>
                        <Text>Volunteer's photo (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your photo or avatar"
                            defaultValue={imageUrl || imageUrl}
                        />
                    </View>

                    {imageUrl && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                        <DisplayImage file={imageUrl} />
                    </View>)}
                    {imageUrl2 && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                        <DisplayImage file={BASE_URL + "/uploads/" + imageUrl2} />
                    </View>)}

                    <View>
                        <Button title="Pick Image" color='green' onPress={async () => handleImage(await pickImageVideoAny('image/*'))} />
                    </View>

                    <View>
                        <Text>Volunteer's Street Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Street address"
                            defaultValue={address}
                            onChangeText={setAddress}
                        />
                    </View>

                    <View>
                        <Text>Volunteer's Date of Birth</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Volunteer's Date of Birth (YYYY-MM-DD)"
                            defaultValue={dateOfBirth}
                            value={dateOfBirth}
                        />
                    </View>

                    <DateTimePickers dateCallback={handleDateOfBirth} />
                    <Text style={styles.status}>{status}</Text>
                    <View style={styles.btn}><Button title='Submit' onPress={handleUpdateVolunteer} color={'green'} /></View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },

    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },

    btn: {
        width: 250,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 50,
    },

    title: {
        fontWeight: 'bold',
        margin: 10,
    },

    status: {
        textAlign: "center"
    },

    select: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        maxWidth: '100%',
    }
})