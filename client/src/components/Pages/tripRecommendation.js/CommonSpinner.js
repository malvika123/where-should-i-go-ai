import { RotatingLines } from "react-loader-spinner";
import "./style/spinner.css";

export const CommonSpinner = ({
  classHeaders = "spinner-it",
  classText = "spinner-txt",
  text = " Please wait, we are processing your info....",
}) => {
  return (
    <div className={classHeaders}>
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
      <h8 className={classText}>{text}</h8>
    </div>
  );
};
