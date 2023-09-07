import React from "react";
import { View, Text, ScrollView, TextInput, StyleSheet, Button, SafeAreaView, Alert } from "react-native";
import { MultilineTextInput } from "../../components/common/MultilineTextInput";
import { SelectPicker } from "../../components/SelectPicker";
import { DateTimePickers } from "../../components/DateTimePickers";
import DisplayImage from "../../components/DisplayImage";
import { pickImageVideoAny } from "../../utils/pickImageVideoAny";
import DisplayVideo from "../../components/DisplayVideo";
import Form from 'form-data';
import { fileAPI } from "../../api/fileAPI";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteFileData,
    getStatus,
    getUpdateResult,
    getWaqfData,
    getWaqfs,
    setStatus,
    updateFileData,
    updateWaqfData
} from "./waqfsSlice";
import { isLargeFile } from "../../utils/isLargeFile";
import { getFileType } from "../../utils/getFileType";
import { getToken } from "../../utils/getToken";
import { Stack, useSearchParams } from "expo-router";
import { renameFile } from "../../utils/renameFile";
import { BASE_URL } from "../../constants/Url";


export default function EditWaqf() {

    const dispatch = useDispatch<any>();
    // clear the status
    // dispatch(setStatus({}));

    const waqfs = useSelector(getWaqfs);

    const { waqfId } = useSearchParams<any>();

    const waqf = waqfs.find((item: { waqfId: any }) => parseInt(item.waqfId) === parseInt(waqfId));

    const [startAt, setStartDate] = React.useState<any>(waqf?.startAt?.split("T")[0]);
    const [type, setType] = React.useState(waqf?.type);
    const [image, setImage] = React.useState({ uri: "", type: "", name: "" });
    const [imageUrl, setImageUrl] = React.useState<any>("");
    const [imageUrl2, setImageUrl2] = React.useState<any>(waqf?.image);
    const [video, setVideo] = React.useState("");
    const [video2, setVideo2] = React.useState(waqf?.video);
    const [planPDF, setPlanPDF] = React.useState({ uri: "", type: "", name: "" });
    const [planPDFUrl, setPlanPDFUrl] = React.useState<any>("");
    const [planPDFUrl2, setPlanPDFUrl2] = React.useState<any>(waqf?.planPDFUrl);
    const [name, setName] = React.useState(waqf?.name);
    const [problem, setProblem] = React.useState(waqf?.problem);
    const [goal, setGoal] = React.useState(waqf?.goal);
    const [purpose, setPurpose] = React.useState(waqf?.purpose);
    const [target, setTarget] = React.useState(waqf?.target);
    const [description, setDescription] = React.useState(waqf?.description);
    const [collectedAmount, setCollectedAmount] = React.useState(waqf?.collectedAmount);
    const [expectedAmount, setExpectedAmount] = React.useState(waqf?.expectedAmount);
    const [beneficiary, setBeneficiary] = React.useState(waqf?.beneficiary);
    const [partner, setPartner] = React.useState(waqf?.partner);
    const [deedPDFUrl, setDeedPDFUrl] = React.useState<any>("");
    const [deedPDFUrl2, setDeedPDFUrl2] = React.useState<any>(waqf?.deedPDFUrl);
    const [deedPDF, setDeedPDF] = React.useState({ uri: "", type: "", name: "" });
    const [address, setAddress] = React.useState(waqf?.address);
    const [localGovt, setLocalGovt] = React.useState(waqf?.localGovt);
    const [state, setState] = React.useState(waqf?.state);
    const [country, setCountry] = React.useState(waqf?.country);
    const [endAt, setEndAt] = React.useState(waqf?.endAt?.split("T")[0]);
    const [userId, setUserId] = React.useState<any>('');

    const status = useSelector(getStatus);


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
    ];
    // add purpose at start causes
    causes.filter((item: any, index) => item !== purpose).unshift(purpose);
    // add type to first position of waqfTypes
    waqfTypes.filter((item: any, index) => item !== type).unshift(type);

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
            image: renameFile(image.name ?? imageUrl ?? ""),
            video,
            deedPDF: renameFile(deedPDF.name ?? deedPDFUrl ?? ""),
            planPDF: renameFile(planPDF.name ?? planPDFUrl ?? ""),
            address,
            localGovt,
            state,
            country,
            waqfId
        };

        let formData = new Form();

        formData.append("waqfId", waqfId);
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("type", type);
        formData.append("problem", problem);
        formData.append("goal", goal);
        formData.append("target", target);
        formData.append("purpose", purpose);
        formData.append("description", description);
        formData.append("expectedAmount", expectedAmount);
        formData.append("collectedAmount", collectedAmount);
        formData.append("beneficiary", beneficiary);
        formData.append("partner", partner);
        formData.append("startAt", startAt);
        formData.append("endAt", endAt);
        formData.append("image", waqfData.image);
        formData.append("video", video);
        formData.append("deedPDF", waqfData.deedPDF);
        formData.append("planPDF", waqfData.planPDF);
        formData.append("address", address);
        formData.append("localGovt", localGovt);
        formData.append("state", state);
        formData.append("country", country);

        if (image.uri) {
            formData.append('my_photo', {
                uri: image?.uri,
                type: "application/" + getFileType(image),
                name: waqfData.image
            });
        }

        if (deedPDF.uri) {
            formData.append('my_deed_pdf', {
                uri: deedPDF?.uri,
                type: "application/" + getFileType(deedPDF),
                name: waqfData.deedPDF
            });
        }

        if (planPDF.uri) {
            formData.append('my_plan_pdf', {
                uri: planPDF?.uri,
                type: "application/" + getFileType(planPDF),
                name: waqfData.planPDF
            });
        }

        try {
            // dispatch(updateWaqfData(formData)).unwrap();
            await fileAPI.sendFiles(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFileFromServer = (filename: any, column: any, waqfId: any, callback: any) => {

        Alert.alert("DELETE", "Want to really delete this?",
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(deleteFileData({ filename: filename })).unwrap();
                        callback("");
                        setTimeout(() => {
                            dispatch(getWaqfData()).unwrap();
                            dispatch(updateFileData({ filename: "", column, waqfId })).unwrap();
                            Alert.alert("Success", "File removed from the server")
                        }, 1000);
                    },
                    style: 'default',
                },
            ],
        );
    };

    const handleStartAt = (val: any) => {
        let result = val.toLocaleDateString().split("/").reverse();
        let result2 = result[0] + "-" + result[1] + "-" + result[2];
        setStartDate(result2);
    };

    const handleEndAt = (val: Date) => {
        let result = val.toLocaleDateString().split("/").reverse();
        let result2 = result[0] + "-" + result[1] + "-" + result[2];
        setEndAt(result2);
    };

    const handleType = (val: any) => {
        setType(val);
    };

    const handlePartner = (val: any) => {
        setPartner(val);
    };

    var handlePurpose = (val: any) => {
        setPurpose(val);
    };

    const handleImage = (val: any) => {
        if (!isLargeFile(val?.size)) {
            setImageUrl(val?.uri);
            setImageUrl2("");
            setImage(val);
        } else {
            alert('Image size is large. Less than 50 KB required');
        }
    };

    const handlePlanPDF = (val: any) => {
        if (!isLargeFile(val?.size)) {
            if (val?.uri.endsWith('.pdf')) {
                setPlanPDFUrl(val?.uri);
                setPlanPDFUrl2("");
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
                setDeedPDFUrl2("");
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
            <Stack.Screen options={{ title: "Edit Waqf", }} />

            <Text style={styles.title}>Edit Waqf Project</Text>

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
                            defaultValue={name}
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
                            defaultValue={problem}
                            onChangeText={setProblem}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Goal</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Goal of the waqf Project"
                            keyboardType='default'
                            defaultValue={goal}
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
                            defaultValue={target}
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
                            defaultValue={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Collected Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount you have collected before now"
                            keyboardType='default'
                            defaultValue={collectedAmount?.toString()}
                            onChangeText={setCollectedAmount}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Expected Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Amount you have collected before now"
                            keyboardType='default'
                            defaultValue={expectedAmount?.toString()}
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
                            defaultValue={beneficiary}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Trustee/Partner: {partner}</Text>
                        <View style={styles.select}>
                            <SelectPicker callback={handlePartner} data={waqfPartners} />
                        </View>
                    </View>

                    <View>
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Waqf's Deed (optional)</Text>
                                {deedPDFUrl2 && <Button title="delete deed" onPress={() => deleteFileFromServer(deedPDFUrl2, "deedPDF", waqfId, setDeedPDFUrl)} />}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Upload waqf deedPDF or contract you registered with court"
                                keyboardType='default'
                                value={deedPDFUrl || deedPDFUrl2}
                            />
                        </View>

                        <View>
                            <Button title="Pick DeedPDF" color='green' onPress={async () => handleDeedPDF(await pickImageVideoAny('*/*') as any)} />
                            <Text />

                        </View>
                    </View>

                    <View>
                        <Text>Waqf's Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            defaultValue={address}
                            onChangeText={setAddress}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Local Government</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            defaultValue={localGovt}
                            onChangeText={setLocalGovt}
                        />
                    </View>

                    <View>
                        <Text>Waqf's State</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            defaultValue={state}
                            onChangeText={setState}
                        />
                    </View>

                    <View>
                        <Text>Waqf's Country</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Place you want to site Waqf Project."
                            defaultValue={country}
                            onChangeText={setCountry}
                        />
                    </View>

                    <View>
                        {
                            imageUrl && (
                                <View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                                    <DisplayImage file={imageUrl} />
                                </View>)
                        }
                        {
                            imageUrl2 && (
                                <View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                                    <DisplayImage file={BASE_URL + "/uploads/" + imageUrl2} />
                                </View>)
                        }

                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Waqf's Image</Text>
                                {imageUrl2 && <Button title="delete image" onPress={() => deleteFileFromServer(imageUrl2, "image", waqfId, setImageUrl2)} />}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Photo you want to display for the project profile "
                                defaultValue={imageUrl || imageUrl2}
                            />
                        </View>
                        <View>
                            <Button title="Pick Image" color='green' onPress={async () => handleImage(await pickImageVideoAny('image/*'))} />
                            <Text />
                        </View>
                    </View>

                    <View>
                        {
                            video && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                                <DisplayVideo url={video} />
                            </View>)
                        }
                        {
                            video2 && (<View style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', }}>
                                <DisplayVideo url={BASE_URL + "/uploads/" + video2} />
                                <Text />
                            </View>)
                        }
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Waqf's Video Link</Text>
                                {/* <Button title="delete video" /> */}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Link to uploaded Youtube video of the waqf project "
                                defaultValue={video}
                                onChangeText={setVideo}
                            />
                        </View>
                    </View>

                    <View>
                        <Text>Waqf's Start Date: {startAt}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Waqf Project Start Date (DD/MM/YYYY)"
                            defaultValue={startAt}
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
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Waqf's Plan (optional)</Text>
                                {planPDFUrl && <Button title="delete plan" onPress={() => deleteFileFromServer(planPDFUrl2, "planPDF", waqfId, setPlanPDFUrl2)} />}
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Upload your Waqf project plan"
                                value={planPDFUrl || planPDFUrl2}
                                aria-disabled
                            />
                        </View>

                        <View>
                            <Button title="Pick Plan PDF" color='green' onPress={async () => handlePlanPDF(await pickImageVideoAny('*/*') as any)} />
                            <Text />
                        </View>
                    </View>

                    <Text />

                    <View style={styles.btn}>
                        {status === "succeeded" && <Text> {status}</Text>}
                        <Button title='Update' onPress={handleWaqfSubmit} color={'green'} />
                    </View>
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