import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useDispatch, useSelector } from 'react-redux';
import { getProfile, getUserProfileData, getStatus, setStatus } from './usersSlice';
import { Link } from 'expo-router';
import { getUser } from './usersSlice';
import { getToken } from '../../utils/getToken';
import SplashScreen from '../../components/common/SplashScreen';
import { converToDate2 } from '../../utils/convertToDate2';

const Profile = () => {

    const EDIT_PROFILE: string = "/(users)/EditUser";

    const profile = useSelector(getProfile);
    const dispatch = useDispatch<any>();
    const mountRef = React.useRef(true);
    const user = useSelector(getUser)

    const dispatchProfileData = async () => {
        dispatch(getUserProfileData(user.userId || await getToken("userId"))).unwrap();
    }

    React.useEffect(() => {
        if (mountRef.current) {
            dispatchProfileData();
        };
        dispatch(setStatus({}));
        return () => {
            mountRef.current = false
        }

    }, []);

    if (!(Object.keys(profile).length)) {

        return <SplashScreen flex={1} />
    }

    return (
        <View style={styles.container}>

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <Text style={styles.label}>PERSONAL DATA</Text>
            </View>

            <View>
                {profile.photo ? <Image source={{ uri: profile?.photo }} style={styles.image} /> : <FontAwesome name='money' size={100} />}
            </View>
            <Text />

            <View style={styles.row}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.value}>{profile?.firstName + " " + profile?.lastName}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{profile?.age}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{profile?.phone}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{profile?.email}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{profile?.address}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>{converToDate2(profile?.dateOfBirth)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Local Govt.:</Text>
                <Text style={styles.value}>{profile?.localGovt}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>State:</Text>
                <Text style={styles.value}>{profile?.state}</Text>
            </View>


            <View style={styles.row}>
                <Text style={styles.label}>Country:</Text>
                <Text style={styles.value}>{profile?.country}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
        marginRight:"auto",
        marginLeft:'auto',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    age: {
        fontSize: 16,
        marginBottom: 10,
    },
    bio: {
        fontSize: 14,
        marginBottom: 10,

    },
    info: {
        fontSize: 14,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {},

    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        maxWidth: '100%',
    },
    edit: {
        color: 'white',
        textAlign: 'center'
    },
    editPressable: {
        backgroundColor: 'green',
        width: 50,
        height: 30,
        padding: 4,
        borderRadius: 10
    }
});

export default Profile;
