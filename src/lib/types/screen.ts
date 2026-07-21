import { Member } from "./member";
import { Product } from "./product";

//* REACT APP STATE *//
export interface AppRootState {
  homePage: HomepPageState;
  //productsPage: ProductsPageState
}

//* HOMEPAGE *//
export interface HomepPageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}


//* PRODUCTS PAGE *//


//* ORDERS PAGE