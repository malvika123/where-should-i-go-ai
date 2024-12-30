import "../style/spinner.css";
import { RotatingLines } from "react-loader-spinner";

const SpinnerItinerary = () => {
  return (
    <div className="spinner-it">
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <h8 style={{ color: "black" }}>
        Please wait, we are processing your info....
      </h8>
    </div>
  );
};

export default SpinnerItinerary;
