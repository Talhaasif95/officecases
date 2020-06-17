import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import StyleMain from '../Styles/ButtonStyle';
export default class HeaderWhite extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={StyleMain.headerStyleWhite}>
        <View style={{height: '100%', width: '100%'}}>
          <Text style={StyleMain.headerTextStyle}>{this.props.text}</Text>
        </View>
        <View style={{position: 'absolute', top: 18, right: 25}}>
          <Text style={StyleMain.headerPageNoStyle}>
            {this.props.pagenumber}
          </Text>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', top: 10, left: 10}}
          onPress={this.props.onPress}>
          <View
            style={{
              alignItems: 'flex-start',
              height: 60,
              width: 60,
              marginTop: 10,
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                width: '100%',
                height: '30%',
              }}
              tintColor={'white'}
              source={require('../assets/nav_back.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
