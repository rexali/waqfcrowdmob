import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messagesAPI } from '../../api/messagesAPI';

export const getMessagesData = createAsyncThunk(
    "messages/getMessagesData",
    async () => {
        const response = await messagesAPI.getMessages();

        return response;
    }
);

export const addMessageData = createAsyncThunk<any, any>(
    "messages/addMessageData",
    async (initialData) => {
        const response = await messagesAPI.addMessage(initialData);

        return response;
    }
);

export const deleteMessageData = createAsyncThunk<any, any>(
    "messages/deleteMessageData",
    async (data) => {
        const response = await messagesAPI.deleteMessage(data);

        return response;
    }
);

export const updateMessageData = createAsyncThunk<any, any>(
    "messages/updateMessageData",
    async (data) => {
        const response = await messagesAPI.updateMessage(data);

        return response;
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState: { messages: [], result: {}, status: 'idle', error: "" },
    reducers: {
        setStatus(state, action) {
            state.status = ""
        }
    },
    extraReducers(builder) {
        // get message data
        builder.addCase(getMessagesData.pending, (state: any, action: any) => {
            state.status = 'loading';
        }).addCase(getMessagesData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.messages = action.payload;
        }).addCase(getMessagesData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

            // add message
            .addCase(addMessageData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.result = {};
            }).addCase(addMessageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(addMessageData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // delete message
            .addCase(deleteMessageData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.result = {};
            }).addCase(deleteMessageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(deleteMessageData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // update message
            .addCase(updateMessageData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.result = {};
            }).addCase(updateMessageData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(updateMessageData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getMessages = (state: any) => state.messages.messages;
export const getStatus = (state: any) => state.messages.status;
export const getError = (state: any) => state.messages.error;
export const getResult = (state: any) => state.messages.result;

export const {setStatus} = messagesSlice.actions;

export default messagesSlice.reducer;


