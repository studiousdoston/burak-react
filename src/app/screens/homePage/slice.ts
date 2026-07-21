import { createSlice } from "@reduxjs/toolkit";
import { HomepPageState } from "../../../lib/types/screen";

const initialState: HomepPageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

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

export const { setNewDishes, setPopularDishes, setTopUsers } =
  homePageSlice.actions;


const HomePageReducer = homePageSlice.reducer
export default HomePageReducer