import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import userReducer from './modules/UserStore';
import mainReducer from './modules/MainStore';
const store = configureStore({
  reducer: {
    users: userReducer,
    main: mainReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
