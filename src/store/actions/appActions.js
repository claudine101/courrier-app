import { SET_NOTIFICATION_TOKEN } from '../reducers/appReducer'

export const setNotificationTokenAction = (token) => {
        return {
                  type: SET_NOTIFICATION_TOKEN,
                  payload: token
        }
}