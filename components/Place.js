import { View, Image, Text, Pressable, StyleSheet } from "react-native";

function Place({ place, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: place.image }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

export default Place;
