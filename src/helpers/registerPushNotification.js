
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications';

export default async function registerPushNotification() {
          if (Constants.isDevice) {
                    const { status: existingStatus } = await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                              const { status } = await Notifications.requestPermissionsAsync();
                              finalStatus = status;
                    }
                    if (finalStatus !== 'granted') {
                              // alert('Failed to get push token for push notification!');
                              return;
                    }
                    return await Notifications.getExpoPushTokenAsync();
          } else {
                    return
                    // alert('Must use physical device for Push Notifications');
          }
}