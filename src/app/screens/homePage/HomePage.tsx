import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";

import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

/* REDUX SLICE & SELECTOR 
//*-------- ACTION CREATOR FUNCTIONS from slice.ts --------*\\
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),

  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});
*/

//***********************************************
export default function HomePage() {
  const dispatch = useDispatch();

  /*const { setPopularDishes, setNewDishes, setTopUsers } =
     actionDispatch(useDispatch());
  */

  //* Backend server data fetching =>
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        order: "productViews",
        page: 1,
        limit: 4,
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        dispatch(setPopularDishes(data));
      })
      .catch((err) => console.log("ERROR fetching popular dishes", err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        dispatch(setNewDishes(data));
      })
      .catch((err) => console.log("ERROR fetching new dishes", err));

    const member = new MemberService();

    member
      .getTopUsers()
      .then((data) => {
        dispatch(setTopUsers(data));
      })
      .catch((err) => console.log("ERROR fetching top users ", err));
  }, [dispatch]);

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
