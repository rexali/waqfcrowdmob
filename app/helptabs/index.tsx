import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHelps, getHelpsData } from '../helps/helpsSlice';
import HelpsList from '../helps/HelpsList';
import SplashScreen from '../../components/common/SplashScreen';

export default function AddHelp() {
    const dispatch = useDispatch<any>();
    const helps = useSelector(getHelps);
    
    React.useEffect(()=>{
       dispatch(getHelpsData()).unwrap();
    },[])

    if (!helps.length) {
       return <SplashScreen flex={1}/>  
    }
    return (
        <View style={styles.container}>
            <HelpsList helpsData={helps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title:{
        textTransform:'uppercase',
        fontWeight:'bold'
    }
})

