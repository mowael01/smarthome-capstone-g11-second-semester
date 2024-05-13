import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import HomeMap from "../pages/homeMap";
import Settings from "../pages/settings";
import Syncing from "../pages/syncing";
import Temperature from "../pages/temperature";
import Humidity from "../pages/humidity";
import Light from "../pages/light";
import Gas from "../pages/gas";


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
        name="Humidity"
        component={Humidity}
      />
      <Tab.Screen
        name="Gas"
        component={Gas}

      />
      <Tab.Screen
        name="Light"
        component={Light}
      />
      <Tab.Screen
        name="Syncing"
        component={Syncing}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}
