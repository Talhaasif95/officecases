import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Text,
  Image,
  Picker,
  StyleSheet,
} from 'react-native';
import StyleMain from '../Styles/ButtonStyle';
import Theme from '../Styles/Theme';
import {Toast} from 'native-base';
import Header from '../Component/HeaderWhite';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSignup} from '../Actions/index';
import firebase from '../database/firebase';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      name: '',
      email: '',
      age: '',
      gender: '',
      weight: '',
      password: '',
      confirmpassword: '',
    };
  }

  render() {
    const {selectedValue} = this.state;
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Header
              text={'Register'}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />

            <View
              style={{
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.textStyle}> Name *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                hint="First Name"
                placeholder="John"
                onChangeText={(text) => {
                  this.props.actionSignup('name', text);
                }}
              />

              <Text style={styles.textStyle}>Email *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                hint="Login with your email"
                placeholder="johndoe@gmail.com"
                onChangeText={(text) => {
                  this.props.actionSignup('email', text);
                }}
              />
              <Text style={styles.textStyle}>Age *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                hint="Last Name"
                placeholder="Doe"
                onChangeText={(text) => {
                  this.props.actionSignup('age', text);
                }}
              />
              <Text style={styles.textStyle}>Gender *</Text>
              <View
                style={[
                  StyleMain.inputStyle,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}>
                <Picker
                  selectedValue={selectedValue}
                  style={{width: 300}}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({selectedValue: itemValue});
                    this.props.actionSignup('gender', itemValue);
                  }}>
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
              </View>
              <Text style={styles.textStyle}>Weight *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.props.actionSignup('weight', text);
                }}
              />
            </View>
            <View
              style={{
                flex: 0.25,
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle}>Password *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                secureTextEntry
                hint="Login with your email"
                placeholder="********"
                onChangeText={(text) => {
                  this.props.actionSignup('password', text);
                }}
              />
              <Text style={styles.textStyle}>Confirm Password *</Text>
              <TextInput
                style={StyleMain.inputStyle}
                hint="Login with your email"
                secureTextEntry
                placeholder="********"
                onChangeText={(text) => {
                  this.props.actionSignup('confirmpassword', text);
                }}
              />
            </View>
            <View
              style={{
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  var self = this;
                  if (this.checkFields()) {
                    firebase
                      .auth()
                      .createUserWithEmailAndPassword(
                        this.props.SignUpReducer.email,
                        this.props.SignUpReducer.password,
                      )
                      .then((res) => {
                        if (res.user) {
                          firebase
                            .database()
                            .ref('users/' + res.user.uid)
                            .set({
                              name: self.props.SignUpReducer.name,
                              email: self.props.SignUpReducer.email,
                              age: self.props.SignUpReducer.age,
                              gender: self.props.SignUpReducer.gender,
                              weight: self.props.SignUpReducer.weight,
                            });
                          Toast.show({text: 'User registered successfully!'});

                          console.log('User registered successfully!');
                        } else {
                        }
                      })
                      .catch((error) => Toast.show({text: error.message}));
                  }
                }}>
                <View style={StyleMain.button}>
                  <Text style={StyleMain.textStyle}>Continue</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }
  checkFields() {
    if (
      this.props.SignUpReducer.name != '' &&
      this.props.SignUpReducer.age != '' &&
      this.props.SignUpReducer.email != '' &&
      this.props.SignUpReducer.weight != '' &&
      this.props.SignUpReducer.password != '' &&
      this.props.SignUpReducer.confirmpassword != ''
    ) {
      if (!this.validate(this.props.SignUpReducer.email)) {
        Toast.show({
          text: 'Invalid Email Address',
          buttonText: 'Okay',
          duration: 3000,
        });
        return 'invalid';
      }
      if (
        this.props.SignUpReducer.password ==
        this.props.SignUpReducer.confirmpassword
      ) {
        if (this.props.SignUpReducer.password.length < 8) {
          Toast.show({
            text: 'Password must have 8 characters',
            buttonText: 'Okay',
            duration: 3000,
          });
          return null;
        }

        return true;
      } else {
        Toast.show({
          text: 'Confirm Password mismatch',
          buttonText: 'Okay',
          duration: 3000,
        });
        return false;
      }
    } else {
      Toast.show({
        text: 'Input all fields',
        buttonText: 'Okay',
        duration: 3000,
      });
      return false;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  inputStyle: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    marginTop: 5,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,

    paddingLeft: 15,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 15,
  },
  textStyle: {
    color: '#3F3F41',
    fontWeight: '100',
    width: 300,
    marginBottom: 5,
    fontWeight: 'normal',
    fontSize: 16,
    marginTop: 5,
  },
});
const mapStateToProps = (state) => {
  const {SignUpReducer} = state;
  return {SignUpReducer};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionSignup,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
