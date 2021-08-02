import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class Recommended extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Recommended</Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.navigate("Home")}
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
