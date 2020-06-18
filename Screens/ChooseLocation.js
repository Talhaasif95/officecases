import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Picker,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';
import Storage from 'react-native-storage';
import StyleMain from '../Styles/ButtonStyle';
import {Toast, Icon} from 'native-base';
import Theme from '../Styles/Theme';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionSignin} from '../Actions/index';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import HeaderWhite from '../Component/HeaderWhite';
import {URL} from '../config';
class ChooseLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], pickerone: '', pickertwo: ''};
  }
  componentDidMount() {
    this.getPickerOneData();
  }
  getPickerOneData() {
    var self = this;
    axios
      .get(URL + '/getPickerData', {
        params: {
          userID: 1,
        },
      })
      .then(function (response) {
        console.warn(response);
        self.setState({data: response.data.cases});
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
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderWhite text="Choose Location"></HeaderWhite>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View>
              <Text style={{width: 300, alignSelf: 'center'}}>Choose City</Text>
              <Picker
                style={{
                  width: 300,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 5,
                  borderRadius: 5,
                  color: '#3F3F41',
                  backgroundColor: '#f2f3f3',
                  elevation: 2,
                  paddingLeft: 15,
                  paddingTop: 3,
                  paddingBottom: 3,
                  paddingRight: 15,
                }}
                selectedValue={this.state.pickerone}
                onValueChange={(value) => {
                  this.setState({pickerone: value});
                }}>
                {this.state.data.map((myValue, myIndex) => {
                  return (
                    <Picker.Item
                      label={myValue.key}
                      value={myValue.key}
                      key={myValue.value}
                    />
                  );
                })}
              </Picker>
            </View>
            <View>
              <Text style={{width: 300, alignSelf: 'center'}}>
                Choose Location
              </Text>
              <Picker
                style={{
                  width: 300,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 5,
                  borderRadius: 5,
                  color: '#3F3F41',
                  backgroundColor: '#f2f3f3',
                  elevation: 2,
                  paddingLeft: 15,
                  paddingTop: 3,
                  paddingBottom: 3,
                  paddingRight: 15,
                }}
                selectedValue={this.state.pickertwo}
                onValueChange={(value) => {
                  this.setState({pickertwo: value});
                }}>
                {this.state.data.map((myValue, myIndex) => {
                  return (
                    <Picker.Item
                      label={myValue.key}
                      value={myValue.key}
                      key={myValue.value}
                    />
                  );
                })}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 20,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{
                  fontSize: Theme.FONT_SIZE_MEDIUM,
                  fontWeight: Theme.FONT_WEIGHT_LIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 5,
                  padding: 5,
                  elevation: 3,
                  height: 50,
                  flex: 0.3,
                }}>
                <Text style={{color: 'red'}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  fontSize: Theme.FONT_SIZE_MEDIUM,
                  fontWeight: Theme.FONT_WEIGHT_LIGHT,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: Theme.THEME_COLOR,
                  marginLeft: 5,
                  marginRight: 5,
                  borderRadius: 5,
                  padding: 5,
                  elevation: 3,
                  height: 50,
                  flex: 0.3,
                }}>
                <Text style={{color: 'white'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  rowStyle: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
    margin: 10,
    borderRadius: 15,
    elevation: 2,
    backgroundColor: 'white',
  },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(ChooseLocation);
