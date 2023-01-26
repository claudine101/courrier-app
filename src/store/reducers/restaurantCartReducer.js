export const ADD_MENU_ACTION = 'ADD_MENU_ACTION'
export const REMOVE_MENU_ACTION = 'REMOVE_MENU_ACTION'
export const RESET_CART_ACTION = 'RESET_CART_ACTION'

export function restaurantCartReducer(menus = [], action) {
          switch (action.type) {
                    case ADD_MENU_ACTION:
                              const menu = menus.find(command => command.ID_RESTAURANT_MENU == action.payload.ID_RESTAURANT_MENU)
                              if(menu) {
                                        const newCommands = menus.map(commande => {
                                                  if(commande.ID_RESTAURANT_MENU == menu.ID_RESTAURANT_MENU) {
                                                            return {...commande, QUANTITE: action.payload.QUANTITE, combinaison: action.payload.combinaison}
                                                  }
                                                  return commande
                                        })
                                        return newCommands
                              }
                              return [...menus, action.payload]
                    case REMOVE_MENU_ACTION:
                              return menus.filter((command, index) => command.ID_RESTAURANT_MENU != action.payload)
                    case RESET_CART_ACTION:
                              return []
                    default:
                              return menus
          }
}