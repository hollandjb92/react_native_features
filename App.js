import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/IconButton";
import { Colors } from "./colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initialzeDB = async () => {
      try {
        init();
        setDbInitialized(true);
        if (dbInitialized) {
          SplashScreen.hideAsync();
        }
      } catch (error) {
        console.log(error);
      }
    };

    initialzeDB();
  }, []);

  if (dbInitialized) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="All"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("Add")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Add"
            component={AddPlace}
            options={{ title: "Save a new Location" }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="Details"
            component={PlaceDetails}
            options={{
              title: "Loading...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
