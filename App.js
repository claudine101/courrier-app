import 'react-native-gesture-handler';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import { Host } from 'react-native-portalize';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';


LogBox.ignoreLogs(["flexWrap: `wrap``"]);
export default function App() {
          return (
                    <>
                    <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                    <Provider store={store}>
                              <Host>
                                        <AppContainer />
                              </Host>
                    </Provider>

                    </>
          )
}
