import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import Card from "../../components/common/Card";
import { Link, useRouter } from "expo-router";

const NewsItem = ({ newsItem }: { newsItem: any }) => {

    const NEWS_DETAILS: string = '/news/ViewNews';
    const router = useRouter();
    const { id } = newsItem;

    return (
        <TouchableOpacity onPress={() => router.push({ pathname: NEWS_DETAILS, params: { id: id } })}>
            <Card>
                <View style={styles.content}>
                    <Image source={require('../../assets/awf-logo.png')??{uri:"https://via.placeholder.com/50x50.jpg"}} style={{width:50, height:50}} />
                    <View style={{...styles.content,marginLeft:5}}>
                        <Text numberOfLines={2} style={{...styles.title,maxWidth:170}}>{newsItem.title}</Text>
                        <Text >{newsItem.date}</Text>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )

}

export default NewsItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        width: 250
    },
    notification: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textShadowColor: 'green'
    },
    content: {
        flexDirection: "row", justifyContent: "space-evenly"
    },
    image: {
        width: 50,
        height: 50
    }
});