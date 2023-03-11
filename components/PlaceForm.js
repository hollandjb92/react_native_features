import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../colors";

function PlaceForm() {
  const [titleInput, setTitleInput] = useState();

  const handleTitle = (text) => {
    setTitleInput(text);
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
