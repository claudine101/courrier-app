export const ADD_COMMAND_ACTION = 'ADD_COMMAND_ACTION'
export const REMOVE_COMMAND_ACTION = 'REMOVE_COMMAND_ACTION'
export const RESET_CART_ACTION = 'RESET_CART_ACTION'

export function ecommerceCartReducer(products = [], action) {
          switch (action.type) {
                    case ADD_COMMAND_ACTION:
                              const product = products.find(command => command.produit.ID_PRODUIT == action.payload.produit.ID_PRODUIT)
                              if(product) {
                                        const newCommands = products.map(commande => {
                                                  if(commande.produit.ID_PRODUIT == product.produit.ID_PRODUIT) {
                                                            return {...commande, QUANTITE: action.payload.QUANTITE, combinaison: action.payload.combinaison}
                                                  }
                                                  return commande
                                        })
                                        return newCommands
                              }
                              return [...products, action.payload]
                    case REMOVE_COMMAND_ACTION:
                              return products.filter((command, index) => command.produit.ID_PRODUIT != action.payload)
                    case RESET_CART_ACTION:
                              return []
                    default:
                              return products
          }
}