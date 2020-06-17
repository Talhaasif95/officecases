import PropTypes from "prop-types";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ScrollView, Text, View } from "react-native";
import DrawerHeader from "./DrawerHeader";
import Home from "../Screens/HomeScreen";
import PaymentInfo from "../Screens/PaymentInfo_one";
import CurrentBooking from "../Screens/CurrentBooking";
import MyCars from "../Screens/MyCars";
import SettingsPhone from "../Screens/SettingsPhone";
import Logout from "../Screens/Logout";
import Notifications from "../Screens/Notifications";
import ForgotPassword from "../Screens/forgotPassword";
import Theme from "../Styles/Theme";
import StyleMain from "../Styles/ButtonStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

class SideMenu extends Component {
  navigateToScreen(route) {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-evenly" }}
      >
        <View style={{ backgroundColor: "#f9f8f8", flex: 1 }}>
          <DrawerHeader />
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("CurrentBooking");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>
              In Process Repairs
            </Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 15,
              flexDirection: "row",
              backgroundColor: "white",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("Home");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Home</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 15,
              flexDirection: "row",
              backgroundColor: "white",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("Notifications");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Notifications</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>

          <Text
            style={[
              StyleMain.textStyleHeading,
              { marginLeft: 15, color: "black", fontSize: 20 }
            ]}
          >
            My Cars
          </Text>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("MyCars");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Car Details</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("BookingHistory");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Repair History</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("CurrentBooking");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>
              In Process Repairs
            </Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
           */}
          <Text
            style={[
              StyleMain.textStyleHeading,
              { marginLeft: 15, color: "black", fontSize: 20 }
            ]}
          >
            Account
          </Text>
          {/* <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("ProfileInfo");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Profile Info</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("PaymentInfo", {
                booking: ""
              });
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Payment Info</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("ForgotPassword");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>Change Password</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("SettingsPhone");
            }}
          >
            <Text style={{ color: "gray", width: "85%" }}>
              Change Phone Number
            </Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "white",
              flexDirection: "row",
              marginVertical: 2,
              justifyContent: "center"
            }}
            onPress={() => {
              this.navigateToScreen("Logout");
            }}
          >
            <Text style={{ color: "red", width: "85%" }}>Logout</Text>
            <Icon type={"material"} name={"keyboard-arrow-right"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
