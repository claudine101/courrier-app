export const ecommerceCartSelector = ({ ecommerceCart }) => ecommerceCart
export const ecommerceCartLengthSelector = ({ ecommerceCart }) => ecommerceCart.length
export const ecommerceProductSelector = ID_PRODUIT => ({ ecommerceCart }) => ecommerceCart.find(commande => commande.produit.ID_PRODUIT == ID_PRODUIT)