import { configureStore } from '@reduxjs/toolkit';
import { targetReducers } from 'pages/Target/lib/store/targetSlice';
import { categoriesReducer } from 'pages/Chart/lib/store/categorySlice';
import { countReducers } from 'pages/Count/lib/store/countSlice';
import thunk from 'redux-thunk';

// import { cashReducer } from '../../../pages/Accounts/lib/store/cash.slice';
// import { targetReducer } from '../../../pages/Accounts/lib/store/targets.slice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    count: countReducers,
    target: targetReducers,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export { store };
