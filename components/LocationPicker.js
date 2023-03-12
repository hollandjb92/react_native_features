import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import { convertAddress, getMapPreview } from "../utils/location";
import OutlinedButton from "./OutlinedButton";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ onLocationCapture }) {
  const [location, setLocation] = useState();
  const isFocused = useIsFocused();
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const locationFromMap = {
        lat: route.params.selectedLat,
        lon: route.params.selectedLon,
      };
      setLocation(locationFromMap);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const updateLocation = async () => {
      if (location) {
        const address = await convertAddress(location.lat, location.lon);
        onLocationCapture({ ...location, address });
      }
    };
    updateLocation();
  }, [location, onLocationCapture]);

  const verifyLocationPermissions = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const handleLocation = async () => {
    const hasPermissions = await verifyLocationPermissions();
    if (!hasPermissions) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  };

  const handleMap = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No Location set</Text>;

  if (location) {
    locationPreview = (
      <Image
        style={styles.mapImage}
        source={{ uri: getMapPreview(location.lat, location.lon) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreviewContainer}>{locationPreview}</View>
      <View style={styles.actionsContainer}>
        <OutlinedButton icon="location" onPress={handleLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={handleMap}>
          Select on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreviewContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
