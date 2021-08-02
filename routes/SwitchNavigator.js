import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "react-navigation-stack";

const StackNavigator = createStackNavigator({
  Home: Home,
  TabNavigator: TabNavigator,
});

export default StackNavigator;
