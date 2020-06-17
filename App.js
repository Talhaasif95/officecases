/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ScreenNavigation from '../Cases/Router/Screen_Navigation';
import MainReducer from '../Cases/Reducers/MainReducer';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Root} from 'native-base';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

const store = createStore(MainReducer);

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <ScreenNavigation></ScreenNavigation>
      </Provider>
    </Root>
  );
};

export default App;
