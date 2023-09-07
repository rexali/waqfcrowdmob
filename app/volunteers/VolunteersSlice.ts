import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { volunteersAPI } from '../../api/volunteersAPI';

export const getVolunteersData = createAsyncThunk(
  'volunteers/getVolunteersData',
  async () => {

    let volunteers = await volunteersAPI.getVolunteers();

    return volunteers
  }
);

export const addVolunteerData = createAsyncThunk<any, any>(
  'volunteers/addVolunteerData',
  async (data) => {

    let response = await volunteersAPI.addVolunteer(data);

    return response
  }
);

export const updateVolunteerData = createAsyncThunk<any, any>(
  'volunteers/updateVolunteerData',
  async (data) => {

    let response = await volunteersAPI.updateVolunteer(data);

    return response
  }
);


const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState: { volunteers: [], result: {}, status: "idle", error: "" },
  reducers: {
    setStatus(state, action) {
      state.status = '';
    }
  },
  extraReducers(builder) {
    // get volunteers data
    builder.addCase(getVolunteersData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(getVolunteersData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.volunteers = action.payload;
    }).addCase(getVolunteersData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })
      // add beneficiary data
      .addCase(addVolunteerData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(addVolunteerData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(addVolunteerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      // update a volunteer data
      .addCase(updateVolunteerData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(updateVolunteerData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(updateVolunteerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
  },
});

export const getVolunteers = (state: any) => state.volunteers.volunteers;
export const getStatus = (state: any) => state.volunteers.status;
export const getResult = (state: any) => state.volunteers.result;
export const getError = (state: any) => state.volunteers.error;

export const {setStatus} = volunteersSlice.actions;
export default volunteersSlice.reducer;


