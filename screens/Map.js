import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Mapview, { Marker } from "react-native-maps";
import IconButton from "../components/IconButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lon: route.params.initialLon,
  };

  const [location, setLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lon : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleMapPress = (evt) => {
    if (initialLocation) {
      return;
    }
    const lat = evt.nativeEvent.coordinate.latitude;
    const lon = evt.nativeEvent.coordinate.longitude;

    setLocation({ lat, lon });
  };

  const saveSelectedLocation = useCallback(() => {
    if (!location) {
      Alert.alert(
        "Error",
        "You have to pick a location (by tapping on the map!) first."
      );
      return;
    }

    navigation.navigate("Add", {
      selectedLat: location.lat,
      selectedLon: location.lon,
    });
  }, [navigation, location]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={saveSelectedLocation}
        />
      ),
    });
  }, [navigation, saveSelectedLocation, initialLocation]);

  return (
    <Mapview initialRegion={region} style={styles.map} onPress={handleMapPress}>
      {location && (
        <Marker
          title="Selected Location"
          coordinate={{ latitude: location.lat, longitude: location.lon }}
        />
      )}
    </Mapview>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
