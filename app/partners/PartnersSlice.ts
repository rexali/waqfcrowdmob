import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { partnersAPI } from '../../api/partnersAPI';

export const getPartnersData = createAsyncThunk(
  'partners/getPartnersData',
  async () => {

    let partners = await partnersAPI.getPartners();
    
    return partners
  }
);

export const addPartnerData = createAsyncThunk<any,any>(
  'partners/AddPartnerData',
  async (data) => {

    let response = await partnersAPI.addPartner(data);
    
    return response
  }
);


export const updatePartnerData = createAsyncThunk<any,any>(
  'partners/updatePartnerData',
  async (data) => {

    let response = await partnersAPI.updatePartner(data);
    
    return response
  }
);

const partnersSlice = createSlice({
  name: 'partners',
  initialState: { partners:[], result:{}, status:"idle", error:"" },
  reducers: {
    setStatus(state, action) {
    state.status = '';
  }},
  extraReducers(builder) {
    // get partners data
    builder.addCase(getPartnersData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(getPartnersData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.partners=action.payload;
    }).addCase(getPartnersData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })
    // add partner data
    .addCase(addPartnerData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(addPartnerData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.result=action.payload;
    }).addCase(addPartnerData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })
     // update a partner data
     .addCase(updatePartnerData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(updatePartnerData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.result=action.payload;
    }).addCase(updatePartnerData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })
  },
});

export const getPartners = (state: any) => state.partners.partners;
export const getStatus = (state: any) => state.partners.status;
export const getResult = (state: any) => state.partners.result;
export const getError = (state: any) => state.partners.error;

export const {setStatus} = partnersSlice.actions;

export default partnersSlice.reducer;


