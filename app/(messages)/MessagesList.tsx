import React from 'react';
import { VirtualizedList } from 'react-native';
import MessageItem from './MessageItem';

const MessagesList = ({messages }: {messages: any }) => {

    const renderMessageItem = ({ item }: { item: any }) => {
        return (
            <MessageItem message={item} />
        )
    };

    const getItemCount = (data: any) => data.length;
    const getItem = (data: any, index: any) => ({
        messageId: data[index].messageId,
        subject: data[index].subject,
        message: data[index].message,
        email:data[index].email,
        firstName:data[index].firstName,
        lastName:data[index].lastName,
        userId:data[index].userId,
    })

    return (
        <VirtualizedList
            data={messages}
            renderItem={renderMessageItem}
            getItemCount={getItemCount}
            keyExtractor={(item:any)=>item.messageId}
            getItem={getItem}
        />
    )
}

export default MessagesList