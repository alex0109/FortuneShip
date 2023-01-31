import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import { cashReducer } from '../../../pages/Accounts/lib/store/cash.slice';
import { targetReducer } from '../../../pages/Accounts/lib/store/targets.slice';

const store = configureStore({
  reducer: {
    cash: cashReducer,
    targets: targetReducer,
  },
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export { store };
