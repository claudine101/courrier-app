export const SET_NOTIFICATION_TOKEN = "SET_NOTIFICATION_TOKEN"

const initial = {
        notificationToken: null
}

export default function appReducer(app = initial, action) {
        switch(action.type) {
               
                  case SET_NOTIFICATION_TOKEN:
                            return {...app, notificationToken: action.payload}
                  default:
                            return app
        }
}