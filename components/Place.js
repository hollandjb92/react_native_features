import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../colors";

function Place({ place, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.image }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  textContainer: {
    flex: 2,
    padding: 12,
  },
  title: { fontWeight: "bold", fontSize: 18, color: Colors.gray700 },
  address: { fontSize: 12, color: Colors.gray700 },
});

export default Place;
