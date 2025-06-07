import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast'

const initialState = {
    pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const counterSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      //add a check if the paste already exists


      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast('Paste Created Successfully')
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) =>
      item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = paste;

        localStorage.setItem('pastes', JSON.stringify(state.pastes));

        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];
      localStorage.removeItem('pastes');
    },
    removeFromPastes: (state, actiion) => {
      const pasteId = actiion.payload;
      console.log(pasteId);

      const index = state.pastes.findIndex((item) => 
      item._id === pasteId );

      if(index >= 0){
        state.pastes.splice(index,1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));

        toast.success("Paste Deleted");
      }
      else{
        toast.error("Paste not found");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = counterSlice.actions

export default counterSlice.reducer