import React from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Button, SafeAreaView } from "react-native";
import { MultilineTextInput } from "../../components/common/MultilineTextInput";
import { DateTimePickers } from "../../components/DateTimePickers";
import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import { SelectPicker } from "../../components/SelectPicker";
import FormData from 'form-data';
import { getFileType } from "../../utils/getFileType";
import { useDispatch, useSelector } from "react-redux";
import { fileAPI } from "../../api/fileAPI";
import { getResult, getStatus, addPartnerData } from "./PartnersSlice";
import { isLargeFile } from "../../utils/isLargeFile";
import { getToken } from "../../utils/getToken";


export default function AddPartner() {

    const [firstName, setFirstName] = React.useState<any>();
    const [lastName, setLastName] = React.useState<any>();
    const [email, setEmail] = React.useState<any>();
    const [phone, setPhone] = React.useState<any>('');
    const [address, setAddress] = React.useState<any>('');
    const [localGovt, setLocalGovt] = React.useState<any>('');
    const [state, setState] = React.useState<any>('');
    const [country, setCountry] = React.useState<any>('');
    const [purpose, setPurpose] = React.useState<any>('');
    const [dateOfInception, setDateOfInception] = React.useState<any>('');
    const [organisation, setOrganisation] = React.useState<any>('');
    const [image, setImage] = React.useState<any>();
    const [imageUrl, setImageUrl] = React.useState<any>();
    const [role, setRole] = React.useState<any>();
    const [userId, setUserId] = React.useState<any>('');

    ((async () => setUserId(await getToken("userId"))))();

    const dispatch = useDispatch<any>();
    const result = useSelector(getResult);
    const status = useSelector(getStatus);
    const states: string[] = ['Kano', 'Kogi', 'Others'];

    const partnerData = {
        firstName,
        lastName,
        email,
        phone,
        purpose,
        role,
        organisation,
        dateOfInception,
        address,
        localGovt,
        state,
        country,
        image:image?.name,
        userId
    }

    let formData = new FormData();
    
    const handleSubmitBeneficiary = async () => {

        formData.append('my_image', {
            uri: image.uri,
            type: "application/" + getFileType(image),
            name: image.name
        });

        dispatch(addPartnerData(partnerData)).unwrap();

        if (status === 'succeeded') {
            const res = await fileAPI.sendFile(formData);
            if (!res.result) {
                await fileAPI.sendFile(formData);
            }
        }

    }

    const handleDateOfBirth = (val: any) => {
        setDateOfInception(val.toISOString().split("T")[0]);
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
                        <Text>Partner's First Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Partner's Firt Name"
                            keyboardType='default'
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View>
                        <Text>Partner's lastName</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Partner's Firt Name"
                            keyboardType='default'
                            onChangeText={setLastName}
                        />
                    </View>

                    <View>
                        <Text>Partner's email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType='default'
                            onChangeText={setEmail}
                        />
                    </View>
                    <View>
                        <Text>Partner's Role</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Your role in the organisation"
                            keyboardType='default'
                            onChangeText={setRole}
                        />
                    </View>

                    <View>
                        <Text>Partner's Local Government</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Local govt of the Partner"
                            keyboardType='default'
                            onChangeText={setLocalGovt}
                        />
                    </View>


                    <View>
                        <Text>Partner's State: {state}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleState} data={states} />
                        </View>
                    </View>

                    <View>
                        <Text>Partner's Country</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Country"
                            keyboardType='default'
                            onChangeText={setCountry}
                        />
                    </View>

                    <View>
                        <Text>Partner's Purpose</Text>
                        <MultilineTextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Partner Purpose"
                            maxWidth='100%'
                            onChangeText={setPurpose}
                        />
                    </View>


                    <View>
                        <Text>Partner's Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Partner phone"
                            keyboardType='default'
                            onChangeText={setPhone}
                        />
                    </View>

                    <View>
                        <Text>Partner's Organisation</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Partner."
                            onChangeText={setOrganisation}
                        />
                    </View>

                    <View>
                        <Text>Partner's Image</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Partner's logo or picture"
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
                        <Text>Partner's Street Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Street address"
                            onChangeText={setAddress}
                        />
                    </View>

                    <View>
                        <Text>Partner's Date of Inception</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Partner Date of Inception (YYYY-MM-DD)"
                            value={dateOfInception}
                        />
                    </View>

                    <DateTimePickers dateCallback={handleDateOfBirth} />
                    <Text style={styles.status}>{status}</Text>
                    
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
    status: {
        textAlign: "center"
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