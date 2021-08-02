import SwitchNavigator from "./SwitchNavigator";
import Profile from "../screens/Profile";
import { createDrawerNavigator } from "react-navigation-drawer";

const DrawerNavigator = createDrawerNavigator({
  Home: SwitchNavigator,
  Profile: Profile,
});

export default DrawerNavigator;
