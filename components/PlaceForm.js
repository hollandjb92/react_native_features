import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../colors";
import Button from "./Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { Place } from "./../models/place";

function PlaceForm({ onSubmit }) {
  const [titleInput, setTitleInput] = useState();
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  const handleTitle = (text) => {
    setTitleInput(text);
  };

  const handleImage = (imageUri) => {
    setImage(imageUri);
  };

  const handleLocation = useCallback((location) => {
    setLocation(location);
  }, []);

  const handleSave = () => {
    const placeData = new Place(titleInput, image, location);
    onSubmit(placeData);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Text style={styles.label}>Title </Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTitle}
          value={titleInput}
        />
      </View>
      <ImagePicker onImageCapture={handleImage} />
      <LocationPicker onLocationCapture={handleLocation} />
      <Button onPress={handleSave}>Add Location</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    margin: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});

export default PlaceForm;
