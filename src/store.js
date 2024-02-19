import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state, a) {
      return "john " + state + " " + a.payload;
    },
  },
});

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    plusCount(state, action) {
      let a = state.find((e) => e.id == action.payload);
      a.count++;
    },
    order(state, action) {
      let a = action.payload;
      let 중복 = state.find((e) => e.id == a.id);
      if (중복) {
        중복.count++;
      } else {
        state.push({ id: a.id, name: a.title, count: 1 });
      }
    },
  },
});

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});

export let { changeName } = user.actions;
export let { plusCount, order } = cart.actions;
