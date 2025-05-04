import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: (state, action) => {
      const id = action.payload._id;
      const existing = state.find((item) => item.id === id);
      if (existing) {
        existing.count += 1;
      } else {
        state.push({
          id,
          count: 1,
        });
      }
    },

    remove: (state, action) => {
      const id = action.payload._id;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        if (state[index].count > 1) {
          state[index].count -= 1;
        } else {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { add, remove } = productReducer.actions;
export default productReducer.reducer;
