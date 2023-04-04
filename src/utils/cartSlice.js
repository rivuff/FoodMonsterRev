import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [], 
    },
    
    reducers: {
        addItem: (state, action) =>{
            state.items.push(action.payload)
        },
        removeItem: (state,action)=>{
            console.log(action.payload.id);
            const ind = state.items.findIndex((i)=> i.card?.info?.id === action.payload.id);
            state.items.splice(ind,ind+1);
            console.log(state.items);
        },
        clearCart: (state)=>{
            console.log(state.items);
            state.items= [];
        },
        updateItem: (state, action)=>{
            const ind = state.items.findIndex((i)=> i.card?.info?.id === action.payload.id);
            if(ind>-1){
                state.items[ind].qty = action.payload.qty;
            }
        },
       
    }
})


export const {addItem, removeItem, clearCart, updateItem} = cartSlice.actions;

export default cartSlice.reducer