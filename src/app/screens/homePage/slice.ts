import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};
//* Define the starting state when my app first loads. It initializes three empty arrays

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/* createSlice generates 
  ^action creators^ & ^action types^ automatically based on 
  the reducers I define, 
  drastically cutting down on boilerplate.
 */
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    //* setPopularDishes : Replaces popularDishes with the data provided in action.payload
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

//* Exporting Actions and Reducer
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;
//* Destructure and export the automatically generated action creators. I will import these into React Components to dispatch updates

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
//* Extract the main reducer function from the slice and export it as the default export. This is what I imported to my store.ts
