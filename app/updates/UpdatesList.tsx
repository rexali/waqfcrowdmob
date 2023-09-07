import React from 'react';
import { VirtualizedList } from 'react-native';
import UpdateItem from './UpdateItem';

const UpdatesList = ({ updatesData }: { updatesData: any }) => {

    const renderUpdateItem = ({ item }: { item: any }) => {
        return (
            <UpdateItem updateItem={item} />
        )
    };

    const getItemCount = (data: any) => data.length;
    const getItem = (data: any, index: any) => ({
        updateId: data[index].updateId,
        title: data[index].title,
        body: data[index].body
    })

    return (
        <VirtualizedList
            data={updatesData}
            renderItem={renderUpdateItem}
            getItemCount={getItemCount}
            getItem={getItem}
            keyExtractor={(item:any)=>item.waqfId}
        />
    )
}

export default UpdatesList