import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },

    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

//* Exporting ACTION CREATORS for use in components
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

//* Exporting SLICE REDUCER for use in store configuration
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
