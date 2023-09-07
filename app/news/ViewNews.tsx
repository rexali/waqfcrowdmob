import React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import SplashScreen from "../../components/common/SplashScreen";
import { useSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { getNews } from "./newsSlice";

function ViewNews() {
    const {id} =  useSearchParams<any>();
    const news = useSelector(getNews);
    const item = news.find((item:any)=>parseInt(item.id) === parseInt(id));
    return (
        <WebView
            style={styles.container}
            source={{ uri: item?.link }}
            startInLoadingState={true}
            renderLoading={() => <SplashScreen flex={1} />} />
    )
}

export default ViewNews;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
});