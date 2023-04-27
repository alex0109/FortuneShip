import { configureStore } from '@reduxjs/toolkit';
import { cashReducers } from 'pages/Accounts/lib/store/cashSlice';
import { targetReducers } from 'pages/Accounts/lib/store/targetSlice';
import { categoriesReducer } from 'pages/Chart/lib/store/categorySlice';
import thunk from 'redux-thunk';

// import { cashReducer } from '../../../pages/Accounts/lib/store/cash.slice';
// import { targetReducer } from '../../../pages/Accounts/lib/store/targets.slice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cash: cashReducers,
    target: targetReducers,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export { store };
