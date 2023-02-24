export const restaurantCartSelector = ({ restaurantCart }) => restaurantCart
export const restaurantCartLengthSelector = ({ restaurantCart }) => restaurantCart.length
export const restaurantProductSelector = ID_RESTAURANT_MENU => ({ restaurantCart }) => restaurantCart.find(commande => commande.produit.ID_RESTAURANT_MENU == ID_RESTAURANT_MENU)