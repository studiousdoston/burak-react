import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

import HomePageReducer from "./screens/homePage/slice";
//* IMPORTS the REDUCER that handles the state for my Home Page feature from slice.ts


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
/** configureStore => Redux Toolkit's main function for setting up
 * a store. It automatically configures the Redux DevTools ext
 * and sets up default middleware.
 */
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    // @ts-ignore
    getDefaultMiddleware().concat(reduxLogger),

  reducer: {
    homePage: HomePageReducer,
  },
  //* This object defines app's <root state shape>. Any state managed by HomePageReducer will be accessible under state.homePage
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
