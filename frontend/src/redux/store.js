import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice"
import authReducer from "./authSlice"
const store = configureStore({
    reducer:{
        userData:userReducer,
        productData:productReducer,
        auth:authReducer
    }
});

export default store