import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { donationsAPI } from '../../api/donationsAPI';


export const getDonationsData = createAsyncThunk(
    "donations/getDonationsData",
    async () => {

        const response = await donationsAPI.getDonations();

        return response;
    }
);


const donationsSlice = createSlice({
    name: 'donations',
    initialState: {
        result: {},
        zakats: [],
        waqfs: [],
        status: 'idle',
        error: ""
    },

    reducers: {},

    extraReducers(builder) {
        // get donation data
        builder.addCase(getDonationsData.pending, (state: any, action: any) => {
            state.status = 'loading';
            state.error = "";
            state.result = {};
        }).addCase(getDonationsData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.waqfs = action.payload.waqfDonations;
            state.zakats = action.payload.zakatDonations;
        }).addCase(getDonationsData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        })


    },
});


export const getStatus = (state: any) => state.donations.status;

export const getError = (state: any) => state.donations.error;

export const getResult = (state: any) => state.donations.result;

export const getWaqfDonations = (state: any) => state.donations.waqfs;

export const getZakatDonations = (state: any) => state.donations.zakats;

export const getTotalWaqfDonation = (state: any) => {
    return state.donations.waqfs?.reduce((total: any, item: { amount: any; }) => total + item.amount, 0);
};

export const getTotalZakatDonation = (state: any) => {
    return state.donations.zakats?.reduce((total: any, item: { amount: any; }) => total + item.amount, 0);
};

export default donationsSlice.reducer;