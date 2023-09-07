import React from 'react';
import { VirtualizedList} from 'react-native';
import NewsItem from './NewsItem';

const NewsList = ({ newsData }: { newsData: any }) => {

    const renderNewsItem = ({ item }: { item: any }) => {
        return (
            <NewsItem newsItem={item} />
        )
    };

    const getItemCount = (data: any) => data?.length;
    
    const getItem = (data: any, index: any) => ({
        id: data[index].id,
        title: data[index].title?.rendered,
        date: data[index].date?.split('T')[0],
        link: data[index].link,
    });

    return (
            <VirtualizedList
                data={newsData}
                renderItem={renderNewsItem}
                getItemCount={getItemCount}
                getItem={getItem}
                keyExtractor={(item:{id: any})=>item.id+item}
                initialNumToRender={4}
            />

    )
}

export default NewsList