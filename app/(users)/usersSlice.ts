import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/usersAPI';
import { saveToken } from '../../utils/saveToken';

export const getUserData = createAsyncThunk<any, any>(
    "users/getUserData",
    async initialData => {
        const response = await usersAPI.getUser(initialData);
        await saveToken("token", response.token);
        let userId = response.userId.toString();
        let email = response.email.toString();
        await saveToken("userId", userId);
        await saveToken("email", email);
        return response;
    }
);

export const getUserProfileData = createAsyncThunk<any, any>(
    "profiles/getUserProfileData",
    async (data) => {
        const response = await usersAPI.getProfile(data);

        return response;
    }
);

export const updateUserProfileData = createAsyncThunk<any, any>(
    "profiles/updateUserProfileData",
    async (data) => {
        const response = await usersAPI.updateProfile(data);

        return response;
    }
);

export const addUserData = createAsyncThunk<any, any>(
    "users/addUserData",
    async initialData => {
        const response = await usersAPI.addUser(initialData);

        return response;
    }
);

export const getDonationsData = createAsyncThunk<any, any>(
    "users/getDonationsData",
    async (data) => {

        const response = await usersAPI.getUserDonations(data);

        return response;
    }
);

export const getUserZakatDonationData = createAsyncThunk<any, any>(
    "users/getUserZakatDonationData",
    async (data) => {
        const response = await usersAPI.getUserZakatDonations(data);

        return response;
    }
);

export const getUserWaqfData = createAsyncThunk<any, any>(
    'waqfs/getUserWaqfData',
    async (data) => {

        let waqfs = await usersAPI.getUserWaqfs(data);

        return waqfs
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        auth: {
            isLoading: true,
            isSignout: false,
            userToken: null,
        },
        user: {},
        result: {},
        profile: {},
        donations: {
            zakats: [],
            waqfs: []
        },
        status: 'idle',
        error: ""
    },

    reducers: {
        setStatus(state, action) {
            state.status = ""
          },

        signOut(state, action) {
            state.status = "";
            state.auth = {
                ...state.auth,
                isSignout: true,
                userToken: null,
                isLoading: false,
            }
        },

        restoreToken(state, action) {
            state.auth = {
                ...state.auth,
                userToken: action.payload,
                isLoading: false,
            }
        },
    },

    extraReducers(builder) {
        // get authenticate and user token & data
        builder.addCase(getUserData.pending, (state: any, action: any) => {
            state.status = 'loading';
            state.error = "";
            state.result = {};
        }).addCase(getUserData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.auth = {
                ...state.auth,
                userToken: action.payload.token,
                isSignout: false,
                isLoading: false
            };
            state.user = action.payload;
        }).addCase(getUserData.rejected, (state: any, action: any) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

            // Register or add new user
            .addCase(addUserData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.error = "";
                state.result = {};
            }).addCase(addUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.auth = {
                    ...state.auth,
                    isSignout: true,
                }
            }).addCase(addUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message as string;
                console.log(state.error);
            })

            // get user donation data
            .addCase(getDonationsData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.error = "";
                state.result = {};
            }).addCase(getDonationsData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.donations.waqfs = action.payload.waqfDonations;
                state.donations.zakats = action.payload.zakatDonations;
            }).addCase(getDonationsData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // get user zakat donation data
            .addCase(getUserZakatDonationData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.error = "";
                state.result = {};

            }).addCase(getUserZakatDonationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.donations.zakats = action.payload;
            }).addCase(getUserZakatDonationData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // get user profile
            .addCase(getUserProfileData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.error = "";
                state.profile = {};
            }).addCase(getUserProfileData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload[0];
            }).addCase(getUserProfileData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // add profile data
            .addCase(updateUserProfileData.pending, (state: any, action: any) => {
                state.status = 'loading';
                state.error = "";
                state.result = {};
            }).addCase(updateUserProfileData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.result = action.payload;
            }).addCase(updateUserProfileData.rejected, (state: any, action: any) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const getUser = (state: any) => state.users.user;
export const getAuth = (state: any) => state.users.auth;

export const getStatus = (state: any) => state.users.status;
export const getError = (state: any) => state.users.error;

export const getResult = (state: any) => state.users.result;
export const getProfile = (state: any) => state.users.profile;

export const getUserWaqfs = (state: any) => state.users.userWaqfs;

export const getUserWaqfDonations = (state: any) => state.users.donations.waqfs;
export const getUserZakatDonations = (state: any) => state.users.donations.zakats;

export const getTotalWaqfDonation = (state: any) => {
    return state.users.donations.waqfs?.reduce((total: any, item: { amount: any; }) => total + item.amount, 0);
};

export const getTotalZakatDonation = (state: any) => {
    return state.users.donations.zakats?.reduce((total: any, item: { amount: any; }) => total + item.amount, 0);
};

export const {
    signOut,
    restoreToken,
    setStatus
} = usersSlice.actions;
export default usersSlice.reducer;