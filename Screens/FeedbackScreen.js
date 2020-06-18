import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreateCase} from '../Actions/index';
class FeedbackScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(() => this.props.navigation.popToTop(), 3000);
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/backhand.png')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Text
          style={{
            fontSize: 30,
            marginTop: 30,

            color: 'white',
          }}>
          Thank you!
        </Text>
        <Text
          style={{
            width: '80%',
            fontSize: 25,
            marginTop: 30,
            textAlign: 'center',
            color: 'white',
          }}>
          Your request has been successfuly updated.
        </Text>
      </ImageBackground>
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
