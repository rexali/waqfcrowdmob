import React from 'react';
import { VirtualizedList } from 'react-native';
import HelpItem from './HelpItem';

const HelpsList = ({ helpsData }: { helpsData: any }) => {

    const renderHelpItem = ({ item }: { item: any }) => {
        return (
            <HelpItem title={item.question} content={item.answer} />
        )
    };

    const getItemCount = (data: any) => data?.length;

    const getItem = (data: any, index: any) => ({
        helpId: data[index].helpId,
        question: data[index].question,
        answer: data[index].answer,
        userId: data[index].userId,
    });

    return (
        <VirtualizedList
            data={helpsData}
            renderItem={renderHelpItem}
            getItemCount={getItemCount}
            getItem={getItem}
            keyExtractor={(item: { helpId: any }) => item.helpId + item}
            initialNumToRender={4}
        />

    )
}

export default HelpsList