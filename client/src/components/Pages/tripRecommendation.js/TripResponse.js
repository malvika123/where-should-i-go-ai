import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const TripResponse = () => {
  const { page } = useContext(AppContext);

  return <h1>{page}hello about</h1>;
};

export default TripResponse;
