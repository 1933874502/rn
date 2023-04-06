import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from '../../utils/request';
//const SIEZ = 10;
type MainState = {
  page: number;
  mainList: ArticleSimple[];
  refreshing: boolean;
};
const mainSlice = createSlice({
  name: 'main',
  initialState: {
    page: 1,
    mainList: [],
    refreshing: false,
  } as MainState,
  reducers: {
    updatePage(state, action) {
      state.page = action.payload;
    },
    updateList(state, action) {
      state.mainList = action.payload;
    },
    updateRefresh(state, action) {
      state.refreshing = action.payload;
    },
  },
});
export const listAction = createAsyncThunk(
  'main/listAction',
  async (payload: any, action) => {
    if ((action.getState() as any)['main']['refreshing']) {
      return;
    }
    try {
      action.dispatch(updateRefresh(true));
      const {data} = await request.get('/home/homeList', payload);

      if (data?.length) {
        if ((action.getState() as any)['main']['page'] === 1) {
          action.dispatch(updateList(data));
        } else {
          action.dispatch(
            updateList([
              ...(action.getState() as any)['main']['mainList'],
              ...data,
            ]),
          );
        }
        action.dispatch(
          updatePage((action.getState() as any)['main']['page'] + 1),
        );
      } else {
        if ((action.getState() as any)['main']['page'] === 1) {
          action.dispatch(updateList([]));
        }
      }
      //return ret.data;
    } catch (error) {
      console.log(error);
    } finally {
      action.dispatch(updateRefresh(false));
    }

    //console.log(ret.data);
  },
);
export const {updatePage, updateList, updateRefresh} = mainSlice.actions;
export default mainSlice.reducer;
