import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { waqfsAPI } from '../../api/waqfsAPI';
import { fileAPI } from '../../api/fileAPI';

export const getWaqfData = createAsyncThunk(
  'waqfs/getWaqfData',
  async () => {

    let waqfs = await waqfsAPI.getWaqfs();

    return waqfs
  }
);

export const deleteWaqfData = createAsyncThunk<any, any>(
  'waqfs/deleteWaqfData',
  async (data) => {

    let result = await waqfsAPI.deleteWaqf(data);

    return result;
  }
);

export const deleteFileData = createAsyncThunk<any, any>(
  'waqfs/deleteFileData',
  async (data) => {

    let result = await fileAPI.deleteFile(data);

    return result;
  }
);

export const updateFileData = createAsyncThunk<any, any>(
  'waqfs/updateFileData',
  async (data) => {

    let result = await waqfsAPI.updateWaqfFile(data);

    return result;
  }
);

export const updateWaqfData = createAsyncThunk<any, any>(
  'waqfs/updateWaqfData',
  async (data) => {

    let result = await waqfsAPI.updateWaqf(data);

    return result;
  }
);

export const approveWaqfData = createAsyncThunk<any, any>(
  'waqfs/approveWaqfData',
  async (data) => {

    let result = await waqfsAPI.approveWaqf(data);

    return result;
  }
);

export const addWaqfData = createAsyncThunk<any, any>(
  'waqfs/addWaqfData',
  async (data) => {

    let result = await waqfsAPI.addWaqf(data);

    return result
  }
);

export const shareWaqfData = createAsyncThunk<any, any>(
  'waqfs/shareWaqfData',
  async (data) => {

    let res = await waqfsAPI.shareWaqf(data);

    return res;
  }
);

export const likeWaqfData = createAsyncThunk<any, any>(
  'waqfs/likeWaqfData',
  async (data) => {

    let res = await waqfsAPI.likeWaqf(data);

    return res;
  }
);

export const rateWaqfData = createAsyncThunk<any, any>(
  'waqfs/rateWaqfData',
  async (data) => {

    let res = await waqfsAPI.rateWaqf(data);

    return res;
  }
);

export const donateWaqfData = createAsyncThunk<any, any>(
  'waqfs/donateWaqfData',
  async (data) => {

    let res = await waqfsAPI.donateWaqf(data);

    return res;
  }
);


const waqfsSlice = createSlice({
  name: 'waqfs',
  initialState: {
    waqfs: [],
    result: {},
    fileResult: {},
    updateFileResult:{},
    approveResult: {},
    deleteResult: {},
    shareResult: {},
    likeResult: {},
    rateResult: {},
    donateResult: {},
    updateResult: {},
    status: "idle",
    error: ""
  },
  reducers: {
    setStatus(state, action) {
      state.status = ""
    }
  },
  extraReducers(builder) {
    // Get all general Waqf data
    builder.addCase(getWaqfData.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(getWaqfData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.waqfs = action.payload;
    }).addCase(getWaqfData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message as string;
    })

      // delete a waqf
      .addCase(deleteWaqfData.pending, (state, action) => {
        state.status = 'loading';
        state.result = {};
      }).addCase(deleteWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deleteResult = action.payload;
      }).addCase(deleteWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // update waqf
      .addCase(updateWaqfData.pending, (state, action) => {
        state.status = 'loading';
        state.updateResult = {};
      }).addCase(updateWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updateResult = action.payload;
      }).addCase(updateWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // approve a waqf
      .addCase(approveWaqfData.pending, (state, action) => {
        state.status = 'loading';
        state.approveResult = {};
      }).addCase(approveWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.approveResult = action.payload;
      }).addCase(approveWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // Add waqf data
      .addCase(addWaqfData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(addWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      }).addCase(addWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // share project
      .addCase(shareWaqfData.pending, (state, action) => {
        state.shareResult = {};
        state.status = 'loading';
      }).addCase(shareWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shareResult = action.payload;
      }).addCase(shareWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // save project 
      .addCase(likeWaqfData.pending, (state, action) => {
        state.likeResult = {};
        state.status = 'loading';
      }).addCase(likeWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.likeResult = action.payload;
      }).addCase(likeWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // save project 
      .addCase(rateWaqfData.pending, (state, action) => {
        state.likeResult = {};
        state.status = 'loading';
      }).addCase(rateWaqfData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rateResult = action.payload;
      }).addCase(rateWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // submit project donation
      .addCase(donateWaqfData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(donateWaqfData.fulfilled, (state, action) => {
        state.donateResult = {};
        state.status = 'succeeded';
        state.donateResult = action.payload;
      }).addCase(donateWaqfData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })

      // delete a file
      .addCase(deleteFileData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(deleteFileData.fulfilled, (state, action) => {
        state.fileResult = {};
        state.status = 'succeeded';
        state.donateResult = action.payload;
      }).addCase(deleteFileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      // update a file data
      .addCase(updateFileData.pending, (state, action) => {
        state.status = 'loading';
      }).addCase(updateFileData.fulfilled, (state, action) => {
        state.updateFileResult = {};
        state.status = 'succeeded';
        state.updateFileResult = action.payload;
      }).addCase(updateFileData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const getWaqfs = (state: any) => state.waqfs.waqfs;
export const getStatus = (state: any) => state.waqfs.status;
export const getError = (state: any) => state.waqfs.error;
export const getResult = (state: any) => state.waqfs.result;
export const getDeleteResult = (state: any) => state.waqfs.deleteResult;
export const getUpdateResult = (state: any) => state.waqfs.updateResult;
export const getApproveResult = (state: any) => state.waqfs.approveResult;
export const getShareResult = (state: any) => state.waqfs.shareResult;
export const getLikeResult = (state: any) => state.waqfs.likeResult;
export const getRateResult = (state: any) => state.waqfs.rateResult;
export const getDonateResult = (state: any) => state.waqfs.donateResult;
export const getFileResult = (state: any) => state.waqfs.fileResult;
export const getUpdateFileResult = (state: any) => state.waqfs.updateFileResult;

export const { setStatus } = waqfsSlice.actions;
export default waqfsSlice.reducer;


