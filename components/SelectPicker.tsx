import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useState } from 'react';

export const SelectPicker = ({callback, data}:{callback:any, data:any}) => {

    const [selectedValue, setSelectedValue] = useState(data[0]);
    
    React.useEffect(()=>{
        callback(selectedValue);
    })

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}   
        >
            {
                data.map((item: string, i:any)=> <Picker.Item label={item} value={item} key={i} />)
            }
        </Picker>

    );
};