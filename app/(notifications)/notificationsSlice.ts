import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationAPI } from '../../api/notificationsAPI'; 

export const getNotificationData = createAsyncThunk(
    "notifications/getNotificationData",
    async () => {
        const response = await notificationAPI.getNotifications();

        return response;
    }
);

export const addNotificationData = createAsyncThunk<any, any>(
    "notifications/addNotificationData",
    async (data) => {
        const response = await notificationAPI.addNotification(data);

        return response;
    }
);

export const deleteNotificationData = createAsyncThunk<any, any>(
    "notifications/deleteNotificationData",
    async (data) => {
        const response = await notificationAPI.deleteNotification(data);

        return response;
    }
);

export const updateNotificationData = createAsyncThunk<any, any>(
    "notifications/updateNotificationData",
    async (data) => {
        const response = await notificationAPI.updateNotification(data);

        return response;
    }
);

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: { notifications: [], result: {}, status: 'idle', error: "" },
    reducers: {
        setStatus(state, action) {
            state.status = ""
        }
    },
    extraReducers(builder) {
        // get Auth data
        builder.addCase(getNotificationData.pending, (state: any, action: any) => {
                state.status = 'loading';
            }).addCase(getNotificationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            }).addCase(getNotificationData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // add notice
            .addCase(addNotificationData.pending, (state: any, action: any) => {
                state.status = 'loading';
            }).addCase(addNotificationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(addNotificationData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // delete notice
            .addCase(deleteNotificationData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.result = {};
            }).addCase(deleteNotificationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(deleteNotificationData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // update notification
            .addCase(updateNotificationData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.result = {};
            }).addCase(updateNotificationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(updateNotificationData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getNotifications = (state: any) => state.notifications.notifications;
export const getStatus = (state: any) => state.notifications.status;
export const getError = (state: any) => state.notifications.error;
export const getResult = (state: any) => state.notifications.result;

export const {setStatus} = notificationsSlice.actions;

export default notificationsSlice.reducer;


