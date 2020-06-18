import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
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
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {listData: []};
  }
  componentDidMount() {
    var self = this;
    global.storage
      .load({
        key: 'loginState',
      })
      .then((ret) => {
        self.props.actionSignin('userToken', ret.status.token);
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
    this.getCases();
  }
  getCases() {
    var self = this;
    axios
      .get(URL + '/getCases', {
        params: {
          userToken: self.props.LoginReducer.userToken,
        },
      })
      .then(function (response) {
        console.warn(response);
        self.setState({listData: response.data.cases});
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
        <HeaderWhite text="Home"></HeaderWhite>
        <FlatList
          style={{marginVertical: 20}}
          data={this.state.listData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={Styles.rowStyle}>
                <Text style={{fontWeight: 'bold'}}>Title: {item.name}</Text>
                <Text>Date : {item.date}</Text>
                <Text>Location: {item.location}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 10}}>
                  Description :{' '}
                </Text>
                <Text style={{}} numberOfLines={2}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={{height: 2}}></View>
          )}></FlatList>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CreateCase');
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            position: 'absolute',
            justifyContent: 'center',
            bottom: 40,
            right: 20,
            backgroundColor: 'red',
            alignItems: 'center',
            elevation: 2,
          }}>
          <Text style={{fontSize: 50, color: 'white'}}>+</Text>
        </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
