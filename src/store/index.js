import { combineReducers, createStore } from "redux";
import { ecommerceCartReducer } from "./reducers/ecommerceCartReducer";
import { restaurantCartReducer } from "./reducers/restaurantCartReducer";

import userReducer from "./reducers/userReducer";


export const store = createStore(
          combineReducers({
                    user: userReducer,
                    ecommerceCart: ecommerceCartReducer,
                    restaurantCart: restaurantCartReducer

       }),
)