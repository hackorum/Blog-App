import React from "react";
import DrawerNavigator from "./routes/DrawerNavigator";
import { createAppContainer } from "react-navigation";

export default function App() {
  return <AppContainer />;
}

const AppContainer = createAppContainer(DrawerNavigator);
