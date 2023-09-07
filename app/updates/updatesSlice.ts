import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAPI } from '../../api/updateAPI';

export const getUpdatesData = createAsyncThunk<any,any>(
    "updates/getUpdatesData",
    async (initialData) => {
        const response = await updateAPI.getUpdate(initialData);
        
        return response;
    }
);

export const addUpdateData = createAsyncThunk<any,any>(
    "updates/addUpdatesData",
    async (initialData) => {
        const response = await updateAPI.addUpdate(initialData);
        
        return response;
    }
);


const notificationsSlice = createSlice({
    name: 'updates',
    initialState: { updates:[], result:{}, status: 'idle', error: "" },
    reducers: {},

    extraReducers(builder) {
        // get updates data
        builder.addCase(getUpdatesData.pending, (state: any, action: any) => {
            state.status = 'loading';
        }).addCase(getUpdatesData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.updates = action.payload;
        }).addCase(getUpdatesData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
         // add update data
        .addCase(addUpdateData.pending, (state: any, action: any) => {
            state.status = 'loading';
        }).addCase(addUpdateData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.result = action.payload;
        }).addCase(addUpdateData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const getUpdates = (state: any) => state.updates.updates;
export const getStatus = (state: any) => state.updates.status;
export const getError = (state: any) => state.updates.error;

export default notificationsSlice.reducer;


