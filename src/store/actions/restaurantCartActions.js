import { ADD_MENU_ACTION, REMOVE_MENU_ACTION, RESET_CART_ACTION } from "../reducers/restaurantCartReducer"


export const addMenuAction = (menu, count, combinaison) => {
          return {
                    type: ADD_MENU_ACTION,
                    payload: { ...menu, QUANTITE: count, combinaison },       
                    
          }
          
}
export const removeMenuAction = (ID_RESTAURANT_MENU) => {
          return {
                    type: REMOVE_MENU_ACTION,
                    payload: ID_RESTAURANT_MENU
          }
}

export const resetCartAction = () => {
          return {
                    type: RESET_CART_ACTION
          }
}