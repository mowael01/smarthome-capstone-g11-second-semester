import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import HomeMap from "../pages/homeMap";
import Settings from "../pages/settings";
import Syncing from "../pages/syncing";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: makeIconRender("home"), headerShown: false }}
      />
      {/* <Tab.Screen
          name="Home Map"
          component={HomeMap}
          options={{ tabBarIcon: makeIconRender("cog") }}
        /> */}
      <Tab.Screen
        name="Syncing"
        component={Syncing}
        options={{ tabBarIcon: makeIconRender("cog") }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarIcon: makeIconRender("cog") }}
      />
    </Tab.Navigator>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}
