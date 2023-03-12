import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { fetchPlaces } from "../utils/database";

function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getPlaces = async () => {
      const fetchedPlaces = await fetchPlaces();
      setPlaces(fetchedPlaces);
    };

    if (isFocused) {
      getPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
