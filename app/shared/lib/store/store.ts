import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { categoriesReducer } from 'pages/Chart/lib/store/categorySlice';
import { countReducers } from 'pages/Count/lib/store/countSlice';
import { targetReducers } from 'pages/Target/lib/store/targetSlice';

import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  count: countReducers,
  target: targetReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type TypeRootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export { store };
