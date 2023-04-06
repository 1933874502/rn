// import {request} from '../../utils/request';
// import {save} from '../../utils/Storage';

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from '../../utils/request';

// class UserStore {
//   userInfo: any;
//   requestLogin = flow(function* (
//     this: UserStore,
//     phone: string,
//     pwd: string,
//     callback: (success: boolean) => void,
//   ) {
//     try {
//       const params = {
//         name: phone,
//         pwd: pwd,
//       };
//       const {data} = yield request('login', params);
//       if (data) {
//         this.userInfo = data;
//         save('userInfo', JSON.stringify(data));
//         callback?.(true);
//       } else {
//         this.userInfo = null;
//         callback?.(false);
//       }
//     } catch (error) {
//       console.log(error);
//       this.userInfo = null;
//       callback?.(false);
//     }
//   });
// }

// export default new UserStore();
const userSlice = createSlice({
  name: 'users',
  initialState: {
    userInfo: '',
  },
  reducers: {
    updateInfos(state, action) {
      state.userInfo = action.payload;
    },
  },
});
export const loginAction = createAsyncThunk(
  'users/loginAction',
  async (payload: any) => {
    const ret = await request.get('/user/login', payload);
    return ret;
  },
);
export const {updateInfos} = userSlice.actions;
export default userSlice.reducer;
