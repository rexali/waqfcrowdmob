import React from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Button, SafeAreaView } from "react-native";
import { MultilineTextInput } from "../../components/common/MultilineTextInput";
import { SelectPicker } from "../../components/SelectPicker";
import { DateTimePickers } from "../../components/DateTimePickers";
import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import DisplayVideo from "../../components/DisplayVideo";
import FormData from 'form-data';
import { fileAPI } from "../../api/fileAPI";
import { useDispatch, useSelector } from "react-redux";
import { addWaqfData, getResult } from "./waqfsSlice";
import { isLargeFile } from "../../utils/isLargeFile";
import { getFileType } from "../../utils/getFileType";
import { getToken } from "../../utils/getToken";
import { Stack } from "expo-router";


export default function AddWaqf() {

    const [startAt, setStartDate] = React.useState<any>();
    const [type, setType] = React.useState();
    const [image, setImage] = React.useState<any>();
    const [imageUrl, setImageUrl] = React.useState<any>();
    const [video, setVideo] = React.useState('');
    const [planPDF, setPlanPDF] = React.useState<any>();
    const [planPDFUrl, setPlanPDFUrl] = React.useState<any>();
    const [name, setName] = React.useState('');
    const [problem, setProblem] = React.useState('');
    const [goal, setGoal] = React.useState('');
    const [purpose, setPurpose] = React.useState('');
    const [target, setTarget] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [collectedAmount, setCollectedAmount] = React.useState('');
    const [expectedAmount, setExpectedAmount] = React.useState('');
    const [beneficiary, setBeneficiary] = React.useState('');
    const [partner, setPartner] = React.useState('');
    const [deedPDF, setDeedPDF] = React.useState<any>();
    const [deedPDFUrl, setDeedPDFUrl] = React.useState<any>();
    const [address, setAddress] = React.useState('');
    const [localGovt, setLocalGovt] = React.useState('');
    const [state, setState] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [endAt, setEndAt] = React.useState('');
    const [userId, setUserId] = React.useState<any>('');

    const result = useSelector(getResult);
    const dispatch = useDispatch<any>();

    ((async () => setUserId(await getToken("userId"))))();

    const waqfTypes: string[] = [
        'Land',
        'Business',
        'Cash',
        'stock',
        'fund',
        'Real Estate',
        'Building',
        'Others'
    ];

    const waqfPartners: string[] = [
        'AWF',
        'Other'
    ];

    const causes: string[] = [
        'Provision of Education',
        'Provision of Hospital/Clinic',
        'Provision of Sanitation/Portable Water',
        'Helping the Orphans',
        'Assisting the Widows',
        'Scholarship for Students',
        'Feeding the Needy',
        'Provision of Housing for the Homeless',
        'Provision of Microcredit/Loan',
        'Preservation of Cultural Heritage',
        'Preservation of Enviroment/Climate',
        'Other'
    ]

    const handleWaqfSubmit = async () => {

        const waqfData = {
            userId,
            name,
            type,
            problem,
            goal,
            purpose,
            target,
            description,
            expectedAmount,
            collectedAmount,
            beneficiary,
            partner,
            startAt,
            endAt,
            image: image?.name,
            video,
            deedPDF: deedPDF?.name,
            planPDF: planPDF?.name,
            address,
            localGovt,
            state,
            country
        };

        let formData = new FormData();

        formData.append('my_photo', {
            uri: image.uri,
            type: "application/" + getFileType(image),
            name: image?.name
        });

        formData.append('my_deed_pdf', {
            uri: deedPDF.uri,
            type: "application/" + getFileType(deedPDF),
            name: deedPDF?.name
        });

        formData.append('my_plan_pdf', {
            uri: planPDF.uri,
            type: "application/" + getFileType(planPDF),
            name: planPDF?.name
        });

        dispatch(addWaqfData(waqfData)).unwrap();
        await fileAPI.sendFiles(formData);
        console.log(result);

        // setTimeout(async () => {
        //     if (result.affectedRows === 1) {
        //         const res = await fileAPI.sendFiles(formData);
        //         if (!res.result) {
        //             await fileAPI.sendFiles(formData);
        //         }
        //     } else {
        //         const res = await fileAPI.sendFiles(formData);
        //         if (!res.result) {
        //             await fileAPI.sendFiles(formData);
        //         }
        //     }

        // }, 1000);

    };

    const handleStartAt = (val: any) => {
        setStartDate(val.toISOString().split("T")[0]);
    };

    const handleEndAt = (val: any) => {
        setEndAt(val.toISOString().split("T")[0]);
    };

    const handleType = (val: any) => {
        setType(val);
    };

    const handlePartner = (val: any) => {
        setPartner(val);
    };

    const handlePurpose = (val: any) => {
        setPurpose(val);
    };

    const handleImage = (val: any) => {
        if (!isLargeFile(val?.size)) {
            setImageUrl(val?.uri);
            setImage(val);
        } else {
            alert('Image size is large. Less than 50 KB required');
        }
    };

    const handlePlanPDF = (val: any) => {
        if (!isLargeFile(val?.size)) {
            if (val?.uri.endsWith('.pdf')) {
                setPlanPDFUrl(val?.uri);
                setPlanPDF(val);
            } else {
                alert('Select PDF');
            }
        } else {
            alert('File size is large. Less than 50 KB required');
        }
    };

    const handleDeedPDF = (val: any) => {
        if (!isLargeFile(val?.size)) {
            if (val?.uri.endsWith('.pdf')) {
                setDeedPDFUrl(val?.uri);
                setDeedPDF(val);
            } else {
                alert('Select PDF');
            }
        } else {
            alert('File size is large. Less than 50 KB required');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: "Add Waqf", }} />

            <Text style={styles.title}>CREATE WAQF PROJECT</Text>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.waqf}>
                    <Text >Waqf is an endowment. In other words It is a continuous sadaqat i.e., sadaqatul jarriyah</Text>
                </View>

                <View>
                    <View>
                        <Text>Waqf's Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Waqf Project name"
                            keyboardType='default'
                            onChangeText={setName}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Property or Asset Type:  {type}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handleType} data={waqfTypes} />
                        </View>
                    </View>


                    <View>
                        <Text>Problem to Solve</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Which problem you want to solve with the waqf"
                            keyboardType='default'
                            onChangeText={setProblem}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Goal</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Goal of the waqf Project"
                            keyboardType='default'
                            onChangeText={setGoal}
                        />
                    </View>

                    <View>
                        <Text>Waqf's purpose/Cause: {purpose}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handlePurpose} data={causes} />
                        </View>
                    </View>


                    <View>
                        <Text>Waqf's Target Audience</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Who are you targeting?"
                            keyboardType='default'
                            onChangeText={setTarget}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Description</Text>
                        <MultilineTextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Waqf Project description"
                            maxWidth='100%'
                            onChangeText={setDescription}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Collected Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount you have collected before now"
                            keyboardType='default'
                            onChangeText={setCollectedAmount}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Expected Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount you have collected before now"
                            keyboardType='default'
                            onChangeText={setExpectedAmount}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Beneficiary list (optional)</Text>
                        <MultilineTextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Copy and paste list of your waqf beneficiaries' names & phone no. seperated with hash e.g Ibrahim Abdul # 08067899123"
                            maxWidth='100%'
                            onChangeText={setBeneficiary}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Trustee/Partner: {partner}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handlePartner} data={waqfPartners} />
                        </View>
                    </View>

                    <View>
                        <Text>Waqf's Deed (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Upload waqf deedPDF or contract you registered with court"
                            keyboardType='default'
                            value={deedPDFUrl}
                        />
                    </View>

                    <View>
                        <Button title="Pick Deed PDF" color='green' onPress={async () => handleDeedPDF(await pickImageVideoAny('*/*') as any)} />
                    </View>

                    <View>
                        <Text>Waqf's Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            onChangeText={setAddress}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Local Government</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            onChangeText={setLocalGovt}
                        />
                    </View>

                    <View>
                        <Text>Waqf's State</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            onChangeText={setState}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Country</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            onChangeText={setCountry}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Image</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Photo you want to display for the project profile "
                            defaultValue={imageUrl}
                        />

                    </View>

                    {imageUrl && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                        <DisplayImage file={imageUrl} />
                    </View>)}

                    <View>
                        <Button title="Pick Image" color='green' onPress={async () => handleImage(await pickImageVideoAny('image/*'))} />
                    </View>

                    {video && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                        <DisplayVideo url={video} />
                    </View>)}

                    <View>
                        <Text>Waqf's Video Link</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Link to uploaded Youtube video of the waqf project "
                            onChangeText={setVideo}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Start Date: {startAt}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Waqf Project Start Date (DD/MM/YYYY)"
                            value={startAt}
                        />
                    </View>

                    <DateTimePickers dateCallback={handleStartAt} />

                    <View>
                        <Text>Waqf's End Date: {endAt}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Waqf Project End Date (YYYY-MM-DD)"
                            defaultValue={endAt}
                            onChangeText={setEndAt}
                        />
                    </View>

                    <DateTimePickers dateCallback={handleEndAt} />

                    <View>
                        <Text>Waqf's Plan (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Upload your Waqf project plan"
                            value={planPDFUrl}
                            aria-disabled
                        />
                    </View>

                    <View>
                        <Button title="Pick Plan PDF" color='green' onPress={async () => handlePlanPDF(await pickImageVideoAny('*/*') as any)} />
                    </View>
                    <Text />

                    <View style={styles.btn}><Button title='Submit' onPress={handleWaqfSubmit} color={'green'} /></View>
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
        textAlign:"center"
    },
    waqf: {
        margin: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

    select: {
        height: 50,
        margin: 10,
        borderWidth: 1,
        maxWidth: '100%',
    }
})