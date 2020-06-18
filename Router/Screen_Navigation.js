import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../Screens/LoginScreen';
import Signup from '../Screens/Signup';
import CreateCase from '../Screens/CreateCase';
import ChooseLocation from '../Screens/ChooseLocation';

import Home from '../Screens/HomeScreen';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    SignupScreen: {screen: Signup},
    Home: {screen: Home},
    CreateCase: {screen: CreateCase},
    ChooseLocation: {screen: ChooseLocation},
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppNavigator);
