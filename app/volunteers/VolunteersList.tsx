import React from 'react';
import { VirtualizedList } from 'react-native';
import VolunteerItem from "./VolunteerItem";

const VolunteersList = ({ volunteers, navigation }: { volunteers: any, navigation: any }) => {

    const renderVolunteerItem = (item: any) => <VolunteerItem volunteer={item}/>;

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        volunteerId: data[index].volunteerId,
        firstName: data[index]?.firstName,
        lastName: data[index]?.lastName,
        email: data[index]?.email,
        image: data[index]?.image,

    })

    return (<VirtualizedList
        data={volunteers}
        keyExtractor={(item) => item.volunteerId}
        initialNumToRender={4}
        renderItem={({ item }: { item: any }) => renderVolunteerItem(item)}
        getItem={getItem}
        getItemCount={getItemCount}
    />)
}
export default VolunteersList;