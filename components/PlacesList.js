import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import Place from "./Place";

function PlacesList({ places }) {
  const navigation = useNavigation();

  const handleSelectPlace = (id) => {
    navigation.navigate("Details", {
      placeId: id,
    });
  };

  const renderItem = ({ item }) => {
    return <Place place={item} onPress={handleSelectPlace} />;
  };

  if (!places) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places saved yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

export default PlacesList;
