import img from "../images/logo.png";
import "./style/Heading.css";

const Logo = () => {
  return (
    <img
      className="logo"
      src={img}
      alt="AI-powered travel planner recommending destinations"
    />
  );
};

export default Logo;
