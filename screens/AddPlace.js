import PlaceForm from "../components/PlaceForm";
import { insertPlace } from "../utils/database";

function AddPlace({ navigation }) {
  const handleCreatePlace = async (place) => {
    await insertPlace(place);

    navigation.navigate("All");
  };

  return <PlaceForm onSubmit={handleCreatePlace} />;
}

export default AddPlace;
