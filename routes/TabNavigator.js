import Recommended from "../screens/Recommended";
import Trending from "../screens/Trending";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const TabNavigator = createMaterialTopTabNavigator(
  {
    Recommended: Recommended,
    Trending: Trending,
  },
  {
    tabBarOptions: {
      style: { backgroundColor: "#282c34" },
    },
  }
);

export default TabNavigator;
