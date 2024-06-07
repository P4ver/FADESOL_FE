import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import productReducer from './productSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import demandeReducer from "./demandeSlice"
import projetReducer from "./projetSlice"
import achatempoReducer from "./achatempoSlice"
import achatReducer from "./achatSlice"
import venteReducer from "./venteSlice"
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  demande: demandeReducer,
  projet: projetReducer,
  achatempo: achatempoReducer,
  vente: venteReducer,
  achat : achatReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
