import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Alert, Button } from "react-native";
import { View } from "react-native";
import { Permissions } from "expo";

function ImagePicker() {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  console.log(cameraPermissionInfo);

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
    const hasPermissions = await verifyCameraPermissions;

    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    console.log(image);
  };

  return (
    <View>
      <View></View>
      <Button title="Take a Photo" onPress={handleImage} />
    </View>
  );
}

export default ImagePicker;
