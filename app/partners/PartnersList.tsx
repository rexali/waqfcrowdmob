import React from 'react';
import { VirtualizedList } from 'react-native';
import PartnerItem from "./PartnerItem";

const PartnersList = ({ partners }: { partners: any}) => {

    const renderPartnerItem = (item: any) => <PartnerItem partner={item} />;

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        partnerId: data[index].partnerId,
        organisation: data[index]?.organisation,
        email: data[index]?.email,
        firstName: data[index]?.firstName,
        lastName: data[index]?.lastName,
        image: data[index]?.image,


    })

    return (<VirtualizedList
        data={partners}
        keyExtractor={(item) => item.partnerId}
        initialNumToRender={4}
        renderItem={({ item }: { item: any }) => renderPartnerItem(item)}
        getItem={getItem}
        getItemCount={getItemCount}
    />)
}
export default PartnersList;