import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Text,
  Image,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Storage from 'react-native-storage';
import StyleMain from '../Styles/ButtonStyle';
import {Toast} from 'native-base';
import Theme from '../Styles/Theme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSignin} from '../Actions/index';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import {URL} from '../config';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEmail: '',
      textPassword: '',
      loading: false,
      storageLoaded: false,
    };
    global.storage = new Storage({
      // maximum capacity, default 1000
      size: 1000,

      // Use AsyncStorage for RN, or window.localStorage for web.
      // If not set, data would be lost after reload.
      storageBackend: AsyncStorage,

      // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
      // can be null, which means never expire.
      defaultExpires: null,

      // cache data in the memory. default is true.
      enableCache: true,

      // if data was not found in storage or expired,
      // the corresponding sync method will be invoked and return
      // the latest data.
      sync: {
        // we'll talk about the details later.
      },
    });
  }
  componentDidMount() {
    if (!this.state.storageLoaded) {
      global.storage
        .load({
          key: 'loginState',
        })
        .then((ret) => {
          // this.props.navigation.replace('Home');
        })
        .catch((err) => {
          //console.error(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        });
    }
  }
  renderloginButton = () => {
    if (this.state.loading) {
      return (
        <View style={[StyleMain.button, {marginVertical: 10}]}>
          <ActivityIndicator color="white" size="large" />
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.state.textEmail != '' && this.state.textPassword != ''
            ? this.Loginclick()
            : Toast.show({
                text: 'Input Credentials',
                buttonText: 'Okay',
                duration: 3000,
              });
        }}>
        <View style={[StyleMain.button, {marginVertical: 20}]}>
          <Text style={{fontSize: 20, color: 'white'}}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    );
  };
  Loginclick = () => {
    this.setState({loading: true});
    var self = this;
    axios
      //.get("http://192.168.0.105/Coinroll/select_script.php", {
      // .get("http://10.0.3.2:8080/Coinroll/select_script.php", {
      .get(URL + '/login', {
        params: {
          userEmail: this.state.textEmail,
          userPassword: this.state.textPassword,
        },
      })
      .then(function (response) {
        console.warn(response);
        self.setState({loading: false});
        if (response.data.status) {
          global.storage.save({
            key: 'loginState', // Note: Do not use underscore("_") in key!
            data: response.data.status,
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
          });
          self.props.navigation.replace('Home');
        } else {
          Toast.show({
            text: 'Incorrect Email or Password',
            buttonText: 'Okay',
            duration: 3000,
          });
        }
      })
      .catch(function (error) {
        self.setState({loading: false});
        Toast.show({
          text: 'Network Error',
          buttonText: 'Okay',
          duration: 3000,
        });
        console.warn(error);
        // self.refs.toast.show("Network Error", 500, () => {
        //   // something you want to do at close
        // });
      });
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(this.state.textEmail, this.state.textPassword)

    //   .then((res) => {
    //     self.setState({loading: false});
    //     if (res.user) {
    //       global.storage.save({
    //         key: 'loginState', // Note: Do not use underscore("_") in key!
    //         data: res.user,
    //         // if expires not specified, the defaultExpires will be applied instead.
    //         // if set to null, then it will never expire.
    //       });
    //       self.props.navigation.replace('Home');
    //     } else {
    //       Toast.show({text: 'Invalid Credentials'});
    //     }
    //   })
    //   .catch((error) => {
    //     self.setState({loading: false});

    //     Toast.show({text: error.message});
    //   });
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <View
            style={{
              height: 130,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: '80%',

                height: '80%',
              }}
              source={require('../assets/logo.png')}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '300',
                  width: 300,
                  marginTop: 5,
                  fontFamily: 'Open-Sans',
                }}>
                Enter your email
              </Text>
              <TextInput
                style={StyleMain.inputStyle}
                hint="Login with your email"
                placeholder="johndoe@xyz.com"
                onChangeText={(textEmail) => this.setState({textEmail})}
              />
              <Text
                style={{
                  color: 'black',
                  fontWeight: '300',
                  width: 300,
                  marginTop: 5,
                  fontFamily: 'bahnschrift',
                }}>
                Enter your password
              </Text>
              <TextInput
                style={StyleMain.inputStyle}
                secureTextEntry
                placeholder="************"
                hint="Enter password"
                onChangeText={(textPassword) => this.setState({textPassword})}
              />
              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '300',
                    width: 300,
                    marginTop: 5,
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                  }}>
                  Forgot password?
                </Text>
              </TouchableOpacity> */}

              {this.renderloginButton()}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    height: 1,
                    width: 130,
                    justifyContent: 'center',
                    backgroundColor: '#1E1E22',
                  }}
                />
                <Text
                  style={{
                    fontSize: 22,
                    width: 40,
                    color: '#3F3F41',
                    textAlign: 'center',
                  }}>
                  OR
                </Text>
                <View
                  style={{
                    height: 1,
                    width: 130,
                    justifyContent: 'center',
                    backgroundColor: '#1E1E22',
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignupScreen')}
                // onPress={() => this.props.navigation.navigate("step_Garage")}
              >
                <View style={StyleMain.hollowButtonStyle}>
                  <Text style={{fontSize: 14, color: Theme.THEME_COLOR}}>
                    Sign up
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {LoginReducer} = state;
  return {LoginReducer};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionSignin,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
