import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import Place from "./Place";

function PlacesList({ places }) {
  const renderItem = ({ item }) => {
    return <Place place={item} />;
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
      data={places}
      keyExtractor={(place) => place.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
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
