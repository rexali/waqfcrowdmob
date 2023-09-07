import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { beneficiariesAPI } from '../../api/beneficiariesAPI';

export const getBeneficiariesData = createAsyncThunk(
  'beneficiaries/getBeneficiariesData',
  async () => {

    let beneficiaries = await beneficiariesAPI.getBeneficiaries();

    return beneficiaries
  }
);

export const addBeneficiaryData = createAsyncThunk<any, any>(
  'beneficiaries/AddBeneficiaryData',
  async (data) => {

    let response = await beneficiariesAPI.addBeneficiary(data);

    return response
  }
);

export const updateBeneficiaryData = createAsyncThunk<any, any>(
  'beneficiaries/updateBeneficiaryData',
  async (data) => {

    let response = await beneficiariesAPI.updateBeneficiary(data);

    return response
  }
);


const beneficiariesSlice = createSlice({
  name: 'beneficiaries',
  initialState: { beneficiaries: [], result: {}, status: "idle", error: "" },
  reducers: {
    setStatus(state, action) {
      state.status = "";
    }
  },
  extraReducers(builder) {

      // get beneficiaries data
      builder.addCase(getBeneficiariesData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(getBeneficiariesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.beneficiaries = action.payload;
      }).addCase(getBeneficiariesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      // add beneficiary data
      .addCase(addBeneficiaryData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(addBeneficiaryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(addBeneficiaryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      // update a beneficiary data
      .addCase(updateBeneficiaryData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(updateBeneficiaryData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(updateBeneficiaryData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
  },
});

export const getBeneficiaries = (state: any) => state.beneficiaries.beneficiaries;
export const getStatus = (state: any) => state.beneficiaries.status;
export const getResult = (state: any) => state.beneficiaries.result;
export const getError = (state: any) => state.beneficiaries.error;

export const { setStatus } = beneficiariesSlice.actions;
export default beneficiariesSlice.reducer;


