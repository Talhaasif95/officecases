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
import {actionCreateCase} from '../Actions/index';
import {ScrollView} from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import HeaderWhite from '../Component/HeaderWhite';
import {URL} from '../config';
class CreateCase extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], pickerone: '', pickertwo: '', reason: '', note: ''};
  }
  componentDidMount() {
    this.getPickerOneData();
  }
  getPickerOneData() {
    var self = this;
    axios
      .get(URL + '/getPickerData', {
        params: {
          userToken: self.props.MainReducer.userToken,
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
        <HeaderWhite text="New Case"></HeaderWhite>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'space-evenly'}}>
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View>
              <Text style={{width: 300, alignSelf: 'center'}}>Reason</Text>
              <TextInput
                style={[StyleMain.inputStyle, {height: 100}]}
                textAlignVertical="top"
                placeholder={'Type your reason'}
                multiline={true}
                onChangeText={(text) => {
                  this.props.actionCreateCase('reason', text);
                }}
              />
            </View>
            <View>
              <Text style={{width: 300, alignSelf: 'center'}}>Note</Text>
              <TextInput
                style={[StyleMain.inputStyle, {height: 100}]}
                textAlignVertical="top"
                placeholder="Write a note"
                multiline={true}
                onChangeText={(text) => {
                  this.props.actionCreateCase('note', text);
                }}
              />
            </View>
            <View>
              <Text style={{width: 300, alignSelf: 'center'}}>
                Choose Value
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
                selectedValue={this.props.MainReducer.pickerone}
                onValueChange={(value) => {
                  this.props.actionCreateCase('pickerone', value);
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
                Choose Value{' '}
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
                selectedValue={this.props.MainReducer.pickertwo}
                onValueChange={(value) => {
                  this.props.actionCreateCase('pickertwo', value);
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
                onPress={() => {
                  this.props.navigation.navigate('ChooseLocation');
                  console.warn(this.props.MainReducer.pickerone);
                  console.warn(this.props.MainReducer.pickertwo);
                  console.warn(this.props.MainReducer.note);
                  console.warn(this.props.MainReducer.reason);
                }}
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
                <Text style={{color: 'white'}}>Create</Text>
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
  const {MainReducer} = state;
  return {MainReducer};
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionCreateCase,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(CreateCase);
