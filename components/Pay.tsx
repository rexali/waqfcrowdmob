import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../utils/showToast';
import { donateWaqf } from '../utils/donateWaqf';
import { getDonateResult, getWaqfData } from '../views/waqfs/waqfsSlice';

export function Pay({
  amount,
  email,
  onPayCancel,
  data
}:{amount: any,email: any, onPayCancel:any, data?:any }) {
  const dispatch = useDispatch<any>();
  const donateResult = useSelector(getDonateResult)
  return (
    <View style={{ flex: 0 }}>
      <Paystack  
        paystackKey="pk_live_9522ac67d8f164271cafe16df7fc01b4613af4f7"
        amount={amount}
        billingEmail={email}
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
           donateWaqf(data,dispatch);
           if (donateResult.affectedRows === 1) {
             showToast("Payment successful");
             setTimeout(() => {
              dispatch(getWaqfData());
             }, 300);
         }
          onPayCancel();
        }}
        onSuccess={(res) => {
          // handle response here
          donateWaqf(data,dispatch);
          if (donateResult.affectedRows === 1) {
            showToast("Payment successful");
        }
          onPayCancel();
          console.log(res);
        }}
        autoStart={true}
      />
    </View>
  );
}