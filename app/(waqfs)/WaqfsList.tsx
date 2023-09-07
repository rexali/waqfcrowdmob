import React from 'react';
import { ActivityIndicator, View, VirtualizedList } from 'react-native';
import { BASE_URL } from '../../constants/Url';
import { getToken } from '../../utils/getToken';
import WaqfItem  from './WaqfItem';

const WaqfsList = ({ waqfs, navigation}: { waqfs: any, navigation:any }) => {

    const [isLoading, setIsLoading] = React.useState(true); // Loading state
    const [data, setData] = React.useState<any>([...waqfs]); // Array to hold the fetched data
    const [page, setPage] = React.useState(1); // Current page

    const fetchWaqfData = async () => {
        try {
            // Fetch data from an API endpoint using the current page
            const response = await fetch(`${BASE_URL}/waqfs?page=${page}`,{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': await getToken("jwtoken") as string
                 },
            });
            // parse the response with json
            const json = await response.json();
            // Append the fetched data to the existing data array
            setData([...data, ...json]);
            // Set loading state to false
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const renderWaqfItem = (item: any) => <WaqfItem waqf={item} navigation={navigation}/>;

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        waqfId: data[index].waqfId,
        name: data[index].name,
        problem: data[index]?.problem,
        goal: data[index]?.goal,
        purpose: data[index]?.purpose,
        description: data[index]?.description,
        target: data[index]?.target,
        rating: data[index]?.rating,
        status: data[index]?.status,
        collectedAmount: data[index]?.collectedAmount,
        expectedAmount: data[index]?.expectedAmount,
        isDonationAllowed: data[index]?.isDonationAllowed,
        isFeatured: data[index]?.isFeatured,
        comments: data[index]?.comments,
        commentsNo: data[index]?.commentsNo,
        likesNo: data[index]?.likesNo,
        sharesNo: data[index]?.sharesNo,
        donationsNo: data[index]?.donationsNo,
        ratingsNo: data[index]?.ratingsNo,
        userIds: data[index]?.userIds,
        state: data[index]?.state,
        image: data[index]?.image,
        video: data[index]?.video,
        startAt: data[index]?.startAt,
        endAt: data[index]?.endAt,
        createdAt: data[index]?.createdAt,
        updatedAt: data[index]?.updatedAt,
    });


    const renderFooter = () => {
        // Show a loading indicator at the bottom while fetching data
        return isLoading ? (
            <View>
                <ActivityIndicator size="large" />
            </View>
        ) : null;
    };

    const handleLoadMore = () => {
        // Increment the page number and fetch more data
        setPage(page + 1);
        fetchWaqfData();
    };


    return (<VirtualizedList
        data={waqfs}
        keyExtractor={(item) => item.waqfId}
        initialNumToRender={4}
        renderItem={({ item }: { item: any }) => renderWaqfItem(item)}
        getItem={getItem}
        getItemCount={getItemCount}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={renderFooter}
    />);
}

export default WaqfsList;