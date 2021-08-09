import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
const navigator = createStackNavigator(
  {
    Home:HomeScreen,
    Login:Login,
    Register:Register


  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'OTT',
    },
  }
);

export default createAppContainer(navigator);