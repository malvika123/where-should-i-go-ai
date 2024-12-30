import "./style/style.css";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div>
      <div className="spinner-header"></div>
      <div className="spinner">
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        <h8 style={{ color: "white" }}>
          Please wait, we are processing your info....
        </h8>
      </div>
    </div>
  );
};

export default Spinner;
