import React, { Component } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import axios from "axios";

export default class Home extends Component {
  state = {
    url: "http://localhost:5000",
    trendingBlogs: "",
    recommendedBlogs: "",
    likedBlogs: "",
  };
  getData = () => {
    axios.get(this.state.url + "/get_trending").then((response) => {
      let trendingBlogs = response.data.data;
      this.setState({ trendingBlogs: trendingBlogs });
    });
  };
  renderItem = ({ item }) => {
    return (
      <View style={styles.customCard}>
        <Text>{item[0]}</Text>
        <View style={styles.likesInCard}>
          <Text>{item[2]}</Text>
        </View>
      </View>
    );
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingText}>🔥 Trending</Text>
          <FlatList
            horizontal
            data={this.state.trendingBlogs.slice(0, 5)}
            renderItem={this.renderItem}
            keyExtractor={(item) => item[0]}
          />
        </View>
        <View style={{ bottom: 100 }}>
          <Button
            title="go to recommended"
            onPress={() => this.props.navigation.navigate("Recommended")}
          />
        </View>
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
  trendingContainer: {
    marginLeft: 15,
    marginTop: 20,
  },
  trendingText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  customCard: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: "tomato",
    height: 120,
    width: 155,
    marginLeft: 5,
    marginTop: 15,
    borderRadius: 7,
  },
  // likesInCard: {
  //   top: 20,
  //   backgroundColor: "blue",
  //   width: 155,
  //   right: 20,
  //   height: 30,
  //   opacity: 0.5,
  // },
});
