import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchsAPI } from '../../api/searchsAPI';

export const getSearchData = createAsyncThunk<any,any>(
  'searchs/getSearchData',
  async (data) => {

    let searchs = await searchsAPI.getSearchs(data);
    
    return searchs
  }
);


const searchsSlice = createSlice({
  name: 'searchs',
  initialState: { searchs:[], result:{}, status:"idle", error:"" },
  reducers: {},
  extraReducers(builder) {
    // get searchs data
    builder.addCase(getSearchData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(getSearchData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.searchs=action.payload;
    }).addCase(getSearchData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })
  },
});

export const getSearchs = (state: any) => state.searchs.searchs;
export const getStatus = (state: any) => state.searchs.status;
export const getResult = (state: any) => state.searchs.result;
export const getError = (state: any) => state.searchs.error;


export default searchsSlice.reducer;


