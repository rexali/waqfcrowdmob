import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { newsAPI } from '../../api/newsAPI';

export const getNewsData = createAsyncThunk(
  'news/getNews',
  async () => {
    let response = await newsAPI.getNews();

    return response;
  }
);
export const addNewsData = createAsyncThunk<any, any>(
  'news/addNewsData',
  async (data) => {
    let response = await newsAPI.addPost(data);

    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: { news: [], result: {}, status: 'idle', error: '' },
  reducers: {
    setStatus(state, action) {
      state.status = "";
    }
  },
  extraReducers(builder) {
    // get news data
    builder.addCase(getNewsData.pending, (state: any, action: any) => {
      state.status = 'loading';
    }).addCase(getNewsData.fulfilled, (state: any, action: any) => {
      state.status = 'Succeeded';
      state.news = action.payload;
    }).addCase(getNewsData.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
      // add news data
      .addCase(addNewsData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(addNewsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(addNewsData.rejected, (state: any, action: any) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const getNews = (state: any) => state.news.news;
export const getStatus = (state: any) => state.news.status;

export const { setStatus } = newsSlice.actions;
export default newsSlice.reducer;


