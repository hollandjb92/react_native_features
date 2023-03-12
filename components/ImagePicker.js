import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../colors";
import OutlinedButton from "./OutlinedButton";

function ImagePicker({ onImageCapture }) {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();

  const verifyCameraPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  };

  const handleImage = async () => {
    const hasPermissions = await verifyCameraPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(image.assets[0].uri);
    onImageCapture(image.assets[0].uri);
  };

  let imagePreview = <Text>No image taken</Text>;

  if (image) {
    imagePreview = (
      <Image style={styles.imagePreview} source={{ uri: image }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreviewContainer}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={handleImage}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreviewContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
