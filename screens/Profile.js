import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button
          title="Open Drawer"
          onPress={() => this.props.navigation.openDrawer()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
