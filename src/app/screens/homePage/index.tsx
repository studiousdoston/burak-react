import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";

import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { Product } from "../../../lib/types/product";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
//***********************************************
//* Create a utility function that accepts dispatch as an argument and returns a wrapped function for setPopularDishes.

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => {
    return {
      popularDishes: popularDishes,
      // popularDishes: [Steak, Kebab]
    };
  },
);

//***********************************************

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  //*  Initializes my dispatch helper and subscribes the component to the Redux store via useSelector

  useEffect(() => {
    const result = [
      {
        _id: "6a3c91a7f6c1b48bd10bfaa9",
        productStatus: "PROCESS",
        productCollection: "DISH",
        productName: "Steak",
        productPrice: 25,
        productLeftCount: 80,
        productSize: "LARGE",
        productVolume: 1,
        productDescription:
          'A perfectly cooked steak delivers a deeply savory, rich, and "beefy" flavor.',
        productImages: [
          "uploads/products/11503f48-0482-4f41-84ac-a618c4f510ef.jpeg",
          "uploads/products/2e8093e8-cfb5-407c-948a-5192ae532490.jpg",
          "uploads/products/3cf55013-f03b-45ce-83f7-17c1e68ea645.jpeg",
          "uploads/products/3a22a1cb-e46b-43c4-816b-7d550ad669d7.jpg",
        ],
        productViews: 2,
        createdAt: "2026-06-25T02:25:43.204Z",
        updatedAt: "2026-07-10T00:22:52.821Z",
        __v: 0,
      },
      {
        _id: "6a3cc95b286dd5afda249862",
        productStatus: "PROCESS",
        productCollection: "DISH",
        productName: "Kebab",
        productPrice: 8,
        productLeftCount: 50,
        productSize: "MEDIUM",
        productVolume: 1,
        productDescription: "delicious kebabs ",
        productImages: [
          "uploads/products/f974922c-d1c7-4a28-8340-b4f5db5e0df0.jpg",
          "uploads/products/40cfe812-32c0-4af5-8167-2c803e9dc302.jpeg",
          "uploads/products/ab4e7258-6e2c-419d-aaed-fc7287f8341c.jpeg",
        ],
        productViews: 0,
        createdAt: "2026-06-25T06:23:23.455Z",
        updatedAt: "2026-06-25T06:48:59.142Z",
        __v: 0,
      },
    ];
    // @ts-ignore
    setPopularDishes(result); //* call
  }, []);

  //console.log("Popular Dishes: ", popularDishes);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
