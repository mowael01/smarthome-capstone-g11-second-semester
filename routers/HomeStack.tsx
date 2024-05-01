import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import HomeMap from "../pages/homeMap";
import Settings from "../pages/settings";
import Syncing from "../pages/syncing";
import Temperature from "../pages/temperature";

const Tab = createNativeStackNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Temperature"
        component={Temperature}
        // options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Syncing"
        component={Syncing}
        // options={{ tabBarIcon: makeIconRender("cog"/) }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        // options={{ tabBarIcon: makeIconRender("cog") }}
      />
    </Tab.Navigator>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}
