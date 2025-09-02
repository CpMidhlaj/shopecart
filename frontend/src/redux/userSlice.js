import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import instance from "../apis/instance";



const   initialState = {
   loading:false,
   error:null,
   users:[]
}

export const userRegisterThunk = createAsyncThunk(
    '/user/register',
    async (signupData,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.post("/user/register",signupData);
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const ListAllUserThunk = createAsyncThunk(
    '/user/all',
    async (_,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.get("/user/all",{
                withCredentials:true,
             });
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const updateUserRoleThunk= createAsyncThunk(
    '/user/update-user-role',
    async (userData,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.put(`/user/update-user-role/${userData._id}`,{role:userData.role},{
                withCredentials:true,
             });
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const updateUserStatusThunk= createAsyncThunk(
    '/user/update-user-status',
    async (userID,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.put(`/user/update-user-status/${userID}`,{},{
                withCredentials:true,
             });
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const deleteUserThunk= createAsyncThunk(
    '/deleted-user',
    async (userID,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.delete(`/user/deleted-user/${userID}`,{
                withCredentials:true,
             });
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)


const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        createUsers:(state, action)=>{
            state.users = [...state.users,{...action.payload}];

            localStorage.setItem('users',JSON.stringify(state.users));
        } ,
         editUsers:(state,action)=>{
                    const updatedUser = action.payload;
                    const userIndex = state.users.findIndex((us)=>us.id === action.payload.id);

                    if(userIndex !== -1){
                        state.users[userIndex] = updatedUser;
                        localStorage.setItem('users',JSON.stringify(state.users));
                    }
                },
                deleteUsers:(state,action)=>{
                    const userIndex = state.users.findIndex((us)=>us.id === action.payload);
        
                    if(userIndex !== -1){
                        state.users.splice(userIndex ,1)
                        localStorage.setItem('users',JSON.stringify(state.users));
                    }
                }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(userRegisterThunk.pending, (state)=>{
                state.loading = true;
                state.error= null;
            }).addCase(userRegisterThunk.fulfilled, (state,action)=>{
                state.loading = false;
                state.error= null;
                 state.users.push(action.payload.user);
            }).addCase(userRegisterThunk.rejected, (state,action)=>{
                state.loading = false;
                state.error= action.payload.message;
            })
        .addCase(ListAllUserThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(ListAllUserThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error= null;
            state.users= action.payload.users;
        }).addCase(ListAllUserThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error= action.payload.message;
        })
        .addCase(updateUserRoleThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(updateUserRoleThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error= null;
            const updatedUserIndex = state.users.findIndex((user)=> user._id === action.payload.user._id);
            if(updatedUserIndex !== -1){
                state.users[updatedUserIndex] = action.payload.user;
            }
        }).addCase(updateUserRoleThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error= action.payload.message;
        })
        .addCase(updateUserStatusThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(updateUserStatusThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error= null;
            const updatedUserIndex = state.users.findIndex((user)=> user._id === action.payload.user._id);
            if(updatedUserIndex !== -1){
                state.users[updatedUserIndex] = action.payload.user;
            }
        }).addCase(updateUserStatusThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error= action.payload.message;
        })
         .addCase(deleteUserThunk.pending, (state)=>{
            state.loading = true;
            state.error= null;
        }).addCase(deleteUserThunk.fulfilled, (state,action)=>{
            state.loading = false;
            state.error= null;
            state.users = state.users.filter((user) => user._id !== action.payload.user._id);
        }).addCase(deleteUserThunk.rejected, (state,action)=>{
            state.loading = false;
            state.error= action.payload.message;
        })
    }   
});
export const {createUsers,editUsers,deleteUsers} = userSlice.actions;
export default userSlice.reducer;