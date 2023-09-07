import React from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Button, SafeAreaView } from "react-native";
import { MultilineTextInput } from "../../components/common/MultilineTextInput";
import { SelectPicker } from "../../components/SelectPicker";
import { DateTimePickers } from "../../components/DateTimePickers";
import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import { useDispatch, useSelector } from "react-redux";
import { addBeneficiaryData, getResult, getStatus } from "./beneficiariesSlice";
import FormData from 'form-data';
import { fileAPI } from "../../api/fileAPI";
import { isLargeFile } from "../../utils/isLargeFile";
import { getFileType } from "../../utils/getFileType";
import { getToken } from "../../utils/getToken";


export default function AddBeneficiary() {
    const dispatch = useDispatch<any>();
    const result = useSelector(getResult);
    const status = useSelector(getStatus);
    
    const [firstName, setFirstName] = React.useState<any>();
    const [lastName, setLastName] = React.useState<any>(); 
    const [email, setEmail] = React.useState<any>();
    const [phone, setPhone] = React.useState<any>('');
    const [age, setAge] = React.useState<any>('');
    const [gender, setGender] = React.useState<any>('');
    const [address, setAdress] = React.useState<any>('');
    const [localGovt, setLocalGovt] = React.useState<any>('');
    const [state, setState] = React.useState<any>('');
    const [country, setCountry] = React.useState<any>('');
    const [purpose, setPurpose] = React.useState<any>('');
    const [dateOfBirth, setDateOfBirth] = React.useState<any>('');
    const [occupation, setOccupation] = React.useState<any>('');
    const [amount, setAmount] = React.useState<any>('');
    const [image, setImage] = React.useState<any>();
    const [imageUrl, setImageUrl] = React.useState<any>();
    const [userId, setUserId] = React.useState<any>('');

    ((async () => setUserId(await getToken("userId"))))();
    
    const states: string[] = ['Kano', 'Kogi', 'Others'];

    const genders: string[] = ['MALE', 'FEMALE', 'NEUTRAL'];

    const beneficiaryData = {
        firstName,
        lastName,
        email,
        phone,
        age,
        image:image?.name,
        gender,
        address,
        localGovt,
        state,
        country,
        amount,
        purpose,
        dateOfBirth,
        occupation,
        userId
    }
    let formData = new FormData();

    const handleSubmitBeneficiary = async () => {
        console.log(beneficiaryData);
        

        formData.append('my_image', {
            uri: image.uri,
            type: "application/" + getFileType(image),
            name: image.name
        });

        dispatch(addBeneficiaryData(beneficiaryData)).unwrap();

        if (status === 'succeeded') {
            const res = await fileAPI.sendFile(formData);
            if (!res.result) {
                await fileAPI.sendFiles(formData);
            }
        }
    }

    const handleDateOfBirth = (val: Date) => {
        setDateOfBirth(val.toISOString().split("T")[0]);
    };
    
    const handleGender = (val: any) => {
        setGender(val);
    };

    const handleImage = (val: any) => {
        if (!isLargeFile(val?.size)) {
            setImageUrl(val?.uri);
            setImage(val);
        } else {
            alert('Image size is large. Less than 50 KB required');
        }
    };
    
    const handleState = (val: any) => {
        setState(val);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>APPLY</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <View>
                        <Text>Beneficiary's First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary's Firt Name"
                            keyboardType='default'
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's last Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary's First Name"
                            keyboardType='default'
                            onChangeText={setLastName}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's Age</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary's age"
                            keyboardType='numeric'
                            onChangeText={setAge}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary Gender: {gender}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleGender} data={genders} />
                        </View>
                    </View>

                    <View>
                        <Text>Beneficiary's email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType='default'
                            onChangeText={setEmail}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's Local Government</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Local govt of the Beneficiary"
                            keyboardType='default'
                            onChangeText={setLocalGovt}
                        />
                    </View>


                    <View>
                        <Text>Beneficiary's State: {state}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleState} data={states} />
                        </View>
                    </View>

                    <View>
                        <Text>Beneficiary's Country</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Country"
                            keyboardType='default'
                            onChangeText={setCountry}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's Purpose</Text>
                        <MultilineTextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Beneficiary Purpose"
                            maxWidth='100%'
                            onChangeText={setPurpose}
                        />
                    </View>


                    <View>
                        <Text>Beneficiary Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount required"
                            keyboardType='default'
                            onChangeText={setAmount}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's Occupation</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary Occupation"
                            keyboardType='default'
                            onChangeText={setOccupation}
                        />
                    </View>


                    <View>
                        <Text>Beneficiary's Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary phone"
                            keyboardType='default'
                            onChangeText={setPhone}
                        />
                    </View>

                    <View>
                        <Text>Beneficiary's Image</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Photo you want to display for your profile "
                            defaultValue={imageUrl}
                        />

                    </View>

                    {imageUrl && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                        <DisplayImage file={imageUrl} />
                    </View>)}

                    <View>
                        <Button title="Pick Image" color='green' onPress={async () => handleImage(await pickImageVideoAny('image/*'))} />
                    </View>


                    <View>
                        <Text>Beneficiary's Street Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Street address"
                            onChangeText={setAdress}
                        />
                    </View>  

                    <View>
                        <Text>Beneficiary's Date of Birth</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Beneficiary Date of Birth (YYYY-MM-DD)"
                            value={dateOfBirth}
                        />
                    </View>

                    <DateTimePickers dateCallback={handleDateOfBirth} />
                    <Text/>
                    <View style={styles.btn}><Button title='Submit' onPress={handleSubmitBeneficiary} color={'green'} /></View>
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

    select: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        maxWidth: '100%',
    }
})