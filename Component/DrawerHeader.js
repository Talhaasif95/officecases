import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Avatar } from "react-native-elements";
import StyleMain from "../Styles/ButtonStyle";

import { Container, Header, Body, Icon, Content } from "native-base";
import Theme from "../Styles/Theme";
import {
  updateWorkshopDetail,
  updateWorkshopServices,
  actionCurrentBooking,
  actionSignin
} from "../Actions/actions";
var currentUser = {};
class DrawerHeader extends Component {
  constructor(props) {
    super(props);
    global.storage
      .load({
        key: "loginState"
      })
      .then(ret => {
        currentUser = ret;
        //this.setState({ storageLoaded: true });
      })
      .catch(err => {
        console.error(err.message);
        switch (err.name) {
          case "NotFoundError":
            // TODO;
            break;
          case "ExpiredError":
            // TODO
            break;
        }
      });
  }
  componentDidMount() {
    //You can call your API here.
  }

  render() {
    console.warn("header");
    console.warn(currentUser);
    return (
      <Header style={{ height: 150, backgroundColor: Theme.THEME_COLOR }}>
        <Body style={{ justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              width: "90%"
            }}
          >
            <Avatar
              containerStyle={{ alignSelf: "center" }}
              rounded
              source={
                currentUser.user_Thumbnail != ""
                  ? { uri: currentUser.user_Thumbnail }
                  : require("../assets/placeholder.png")
              }
              size="large"
            />
            <View
              style={{
                marginLeft: 20,
                justifyContent: "center"
              }}
            >
              <Text style={StyleMain.textStyle}>{currentUser.user_Name}</Text>
              <Text style={StyleMain.textStyle}>{currentUser.user_Email}</Text>
            </View>
          </View>
        </Body>
      </Header>
    );
  }
}
const mapStateToProps = state => {
  const { CompleteOrder } = state;
  return { CompleteOrder };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateWorkshopDetail,
      updateWorkshopServices,
      actionCurrentBooking,
      actionSignin
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DrawerHeader);
