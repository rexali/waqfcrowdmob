import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
 
export default class AlertDialog extends Component {
  state = {
    dialogVisible: false
  };
 
  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };
 
  render() {
    return (
      <View 
      style={{
        // flex:1, 
        // justifyContent:'center', 
        // alignItems:'center'
        }}>
        <TouchableOpacity onPress={this.showDialog}>
          {/* <Text>Show Dialog</Text> */}
          <MaterialCommunityIcons name="heart" color={'green'} size={30}  />
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Enter Amount</Dialog.Title>
          <Dialog.Input/>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.handleDelete} />
        </Dialog.Container>
      </View>
    );
  }
}