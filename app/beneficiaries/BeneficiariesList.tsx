import React from 'react';
import { VirtualizedList } from 'react-native';
import BeneficiaryItem from "./BeneficiaryItem";

const BeneficiariesList = ({ beneficiaries, }: { beneficiaries: any, }) => {

    const renderBeneficiaryItem = (item: any) => <BeneficiaryItem beneficiary={item} />;

    const getItemCount = (data: any) => data.length;

    const getItem = (data: any, index: number) => ({
        beneficiaryId: data[index]?.beneficiaryId,
        firstName: data[index]?.firstName,
        lastName: data[index]?.lastName,
        email: data[index]?.email,
        image: data[index]?.image,
    })

    return (<VirtualizedList
        data={beneficiaries}
        keyExtractor={(item) => item.beneficiaryId}
        initialNumToRender={4}
        renderItem={({ item }: { item: any }) => renderBeneficiaryItem(item)}
        getItem={getItem}
        getItemCount={getItemCount}
    />)
}
export default BeneficiariesList;