import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { helpsAPI } from '../../api/helpsAPI';

export const getHelpsData = createAsyncThunk(
    'helps/getHelpsData',
    async () => {
        let response = await helpsAPI.getHelps();

        return response;
    } 
);

export const addHelpData = createAsyncThunk<any, any>(
    'helps/addHelpData',
    async (data) => {
        let response = await helpsAPI.addHelp(data);

        return response;
    }
);

export const updateHelpData = createAsyncThunk<any, any>(
    'helps/updateHelpData',
    async (data) => {
        let response = await helpsAPI.updateHelp(data);

        return response;
    }
);

const helpsSlice = createSlice({
    name: 'helps',
    initialState: { helps: [], result: {}, status: 'idle', error: '' },
    reducers: {
        setStatus(state, action) {
            state.status = "";
        }
    },

    extraReducers(builder) {
        // get helps data
        builder.addCase(getHelpsData.pending, (state: any, action: any) => {
            state.status = 'loading';
        }).addCase(getHelpsData.fulfilled, (state: any, action: any) => {
            state.status = 'Succeeded';
            state.helps = action.payload;
        }).addCase(getHelpsData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
            // add helps data
            .addCase(addHelpData.pending, (state, action) => {
                state.status = 'loading';
            }).addCase(addHelpData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(addHelpData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // add helps data
            .addCase(updateHelpData.pending, (state, action) => {
                state.status = 'loading';
            }).addCase(updateHelpData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(updateHelpData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const getHelps = (state: any) => state.helps.helps;
export const getStatus = (state: any) => state.helps.status;
export const getResult = (state: any) => state.helps.result;

export const { setStatus } = helpsSlice.actions;
export default helpsSlice.reducer;


