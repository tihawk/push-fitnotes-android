/**
 * @format
 */
require('node-libs-react-native/globals');
import './shim'
import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import colorSchemes from './colorSchemes.json'


export default function Main() {
  const isDarkMode = useColorScheme() === 'dark';
  const defaultTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme
  const theme = {
    ...defaultTheme,
    roundness: 0,
    colors: isDarkMode ? colorSchemes.dark : colorSchemes.light
  }
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main);
