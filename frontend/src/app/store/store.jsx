import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../../features/auth/authSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import storageSelector from "./storageSelector";

// const authPersistConfig = {
//     key: "auth",
//     storage: storageSelector(),
//     whitelist: ["accessToken"]
// };

const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
    devTools: true,
});

// export const persistor = persistStore(store);