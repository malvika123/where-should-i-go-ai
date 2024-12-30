import { RotatingLines } from "react-loader-spinner";
import "./style/spinner.css";
const CommonSpinner = ({ color, width }) => {
  return (
    <div className="common-spinner">
      <RotatingLines
        strokeColor={color || "black"}
        strokeWidth="5"
        animationDuration="0.75"
        width={width || 50}
        visible={true}
      />
    </div>
  );
};

export default CommonSpinner;
