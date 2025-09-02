import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import instance from "../apis/instance";

const findTotalPrice = (cartItems)=>{
   return cartItems.reduce((total,item)=>total+(item.productPrice * item.quantity),0);
}
const initialState = {
    products:JSON.parse( localStorage.getItem("products")) ||[],
    cartItems:JSON.parse( localStorage.getItem("cartItems")) ||[],
    productCost:localStorage.getItem("cartItems") ? findTotalPrice(JSON.parse( localStorage.getItem("cartItems"))) : 0,
    loading:false,
    error:null,
}       

export const addProductThunk = createAsyncThunk(
    '/product/add',
    async (productData,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.post("/product/add",productData,{
                 withCredentials:true,
             });
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const listAllProductThunk = createAsyncThunk(
    '/product/all',
    async (_,{rejectWithValue}) => {
        try {
           
             const {data} = await instance.get("/product/all",{
                 withCredentials:true,
             });
           console.log("dataaaaa-->",data);
           
             return data;
        } catch (error) {
            return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const editProductThunk =  createAsyncThunk(
    '/product/edit-product',
    async (productData,{rejectWithValue})=>{
        try {
            const {data} = await instance.put(`/product/edit-product/${productData._id}`,productData,{
                withCredentials:true
            });
            return data;
        } catch (error) {
              return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)
export const deleteProductThunk =  createAsyncThunk(
    '/product/delete-product',
    async (productID,{rejectWithValue})=>{
        try {
            const {data} = await instance.delete(`/product/delete-product/${productID                                                                                                                               }`,{
                withCredentials:true
            });
            return data;
        } catch (error) {
              return rejectWithValue({message:error?.response?.data?.message || error.message})
        }
    }
)


const productSlice = createSlice({
    name:'productSlice',
    initialState,
    reducers:{
        addProducts:(state,action)=>{
            state.products=[...state.products,{...action.payload}]

            localStorage.setItem('products',JSON.stringify(state.products));
        },
        editProduct:(state,action)=>{
            const productIndex = state.products.findIndex((pr)=>pr.id === action.payload.id);

            if(productIndex !== -1){
                state.products[productIndex] = action.payload;
                localStorage.setItem('products',JSON.stringify(state.products));
            }
        },
        deleteProduct:(state,action)=>{
            const productIndex = state.products.findIndex((pr)=>pr.id === action.payload);

            if(productIndex !== -1){
                state.products.splice(productIndex ,1)
                localStorage.setItem('products',JSON.stringify(state.products));
            }
        },
        addToCart:(state,action)=>{
            const productIndex = state.cartItems.findIndex((pr)=> pr.id === action.payload.id);
            if(productIndex !== -1){
                state.cartItems[productIndex].quantity++;
            }else{
                state.cartItems = [...state.cartItems,{...action.payload, quantity:1}]
            }
            // state.cartItems.push(action.payload);
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            state.productCost = findTotalPrice(state.cartItems);
        },
        handleCartIncrement:(state,action)=>{
            const itemIndex = state.cartItems.findIndex((it)=> it.id === action.payload);
            if(itemIndex !== -1){
                state.cartItems[itemIndex].quantity++;
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            state.productCost = findTotalPrice(state.cartItems);
        },
        handleCartDecrement:(state,action)=>{
            const itemIndex = state.cartItems.findIndex((it)=> it.id === action.payload);
            if(itemIndex !== -1){
                state.cartItems[itemIndex].quantity--;
            }
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            state.productCost = findTotalPrice(state.cartItems);
        },
        deleteCartItem: (state, action) => {
        //   const itemId = action.payload;
          const itemIndex= state.cartItems.filter((item) => item.id !== action.payload);
          if(itemIndex !== -1){
            state.cartItems.splice(itemIndex,1);
          }
          state.productCost = findTotalPrice(state.cartItems);
          localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        }
    },
     extraReducers:(builder)=>{
            builder
            .addCase(addProductThunk.pending, (state)=>{
                state.loading = true;
                state.error= null;
            }).addCase(addProductThunk.fulfilled, (state,action)=>{
                state.loading = false;
                state.error= null;
                state.products = [...state.products,{...action.payload.products}]
                localStorage.setItem('products',JSON.stringify(state.products));
            }).addCase(addProductThunk.rejected, (state,action)=>{
                state.loading = false;
                state.error= action.payload.message;
            })
            .addCase(listAllProductThunk.pending, (state)=>{
                state.loading = true;
                state.error= null;
            }).addCase(listAllProductThunk.fulfilled, (state,action)=>{
                state.loading = false;
                state.error= null;
                state.products = action.payload.products
                localStorage.setItem('products',JSON.stringify(state.products));
            }).addCase(listAllProductThunk.rejected, (state,action)=>{
                state.loading = false;
                state.error= action.payload.message;
            })
             .addCase(editProductThunk.pending, (state)=>{
                        state.loading = true;
                        state.error= null;
                    }).addCase(editProductThunk.fulfilled, (state,action)=>{
                        state.loading = false;
                        state.error = null;
                        const prevProducts = [...state.products]
                        const productIndex = prevProducts.findIndex((pr)=>pr._id === action.payload.product._id);
                        if(productIndex !== -1){
                            prevProducts[productIndex] = action.payload.product;
                            state.products = prevProducts;
                            localStorage.setItem('products',JSON.stringify(state.products));
                        }
                    }).addCase(editProductThunk.rejected, (state,action)=>{
                        state.loading = false;
                        state.error = action.payload.message
                    })
                     .addCase(deleteProductThunk.pending, (state)=>{
                        state.loading = true;
                        state.error= null;
                    }).addCase(deleteProductThunk.fulfilled, (state,action)=>{
                        state.loading = false;
                        state.error = null;
                        const prevProducts = [...state.products]
                        const updateProducts = prevProducts.filter((pr) => pr._id !== action.payload.product._id)
                        state.products = updateProducts;
                            localStorage.setItem('products',JSON.stringify(state.products));
                    }).addCase(deleteProductThunk.rejected, (state,action)=>{
                        state.loading = false;
                        state.error = action.payload.message
                    })
        }
})
export const {addProducts,editProduct,deleteProduct,addToCart,handleCartIncrement,handleCartDecrement,deleteCartItem} = productSlice.actions;
export default productSlice.reducer;