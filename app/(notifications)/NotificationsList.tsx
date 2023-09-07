import React from 'react';
import { VirtualizedList } from 'react-native';
import NotificationItem from './NotificationItem';

const NotificationsList = ({notificationsData }: {notificationsData: any }) => {

    const renderNotificationItem = ({ item }: { item: any }) => {
        return (
            <NotificationItem notificationItem={item} />
        )
    };

    const getItemCount = (data: any) => data.length;
    const getItem = (data: any, index: any) => ({
        notificationId: data[index].notificationId,
        subject: data[index].subject,
        body: data[index].body
    })

    return (
        <VirtualizedList
            data={notificationsData}
            renderItem={renderNotificationItem}
            getItemCount={getItemCount}
            keyExtractor={(item:any)=>item.notificationId}
            getItem={getItem}
        />
    )
}

export default NotificationsList