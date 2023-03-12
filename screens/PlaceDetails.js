import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, ScrollView } from "react-native";
import { Colors } from "../colors";
import OutlinedButton from "../components/OutlinedButton";
import { fetchPlace } from "./../utils/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;

  const handleShowOnMap = () => {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLon: fetchedPlace.location.lon,
    });
  };

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      const place = await fetchPlace(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };
    fetchPlaceDetails();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.image }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={handleShowOnMap}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  addressText: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlaceDetails;
