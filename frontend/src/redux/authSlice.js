import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../apis/instance";

    const initialState = {
        user:JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated:JSON.parse(localStorage.getItem('isAuthenticated')) || false,
        loading:false,
        error:null
    }



export const userLoginThunk = createAsyncThunk(
    '/user/login',
    async (userData,{rejectWithValue})=>{
        try {
            const {data} = await instance.post("/user/login",userData,{
                withCredentials:true
            });
                 if(!data.success) {
                return rejectWithValue({ message: data.messagem || "login failled"})
            }
            return data;
        } catch (error) {
              return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const userLogoutThunk = createAsyncThunk(
    '/user/logout',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await instance.post("/user/logout", _,{
                withCredentials:true
            });

            if(!data.success) {
                return rejectWithValue({ message: data.messagem || " failled"})
            }

            return data;
            
        } catch (error) {
              return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const profileUpdateThunk =  createAsyncThunk(
    '/user/profile-update',
    async (userData,{rejectWithValue})=>{
        try {
            const {data} = await instance.put("/user/profile",userData,{
                withCredentials:true
            });
            return data;
        } catch (error) {
              return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
const  authSlice = createSlice({

    name:"authSlice",
    initialState,
    reducers:{
        userAuth:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
            localStorage.setItem("user", JSON.stringify(state.user))
        },
        userLoguot:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))
            localStorage.setItem("user", JSON.stringify(state.user))
        }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(userLoginThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(userLoginThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));
        }).addCase(userLoginThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(profileUpdateThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(profileUpdateThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            localStorage.setItem('user',JSON.stringify(state.user));
        }).addCase(profileUpdateThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message
        }).addCase(userLogoutThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(userLogoutThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('isAuthenticated',JSON.stringify(state.isAuthenticated));
        }).addCase(userLogoutThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})
export const {userAuth,userLoguot} = authSlice.actions;
export default authSlice.reducer;
    