import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import Card from '../../components/common/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HelpItem = ({ title, content }: { title: any, content: any }) => {
    
    const [expanded, setExpanded] = React.useState(false);

    const toggleAccordion = () => {
        setExpanded(!expanded);
    };

    return (
        <View>
            <Card>
                <TouchableOpacity onPress={toggleAccordion}>
                    <View style={{flexDirection:'row', justifyContent:"space-between"}}><Text style={styles.title}>{title}</Text><MaterialCommunityIcons name='arrow-down' /></View>
                    <Text/>
                </TouchableOpacity>
                {expanded && <Text>{content}</Text>}
            </Card>
        </View>
    ); 
}

export default HelpItem;


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