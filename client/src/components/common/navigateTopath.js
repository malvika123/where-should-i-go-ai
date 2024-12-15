import { useNavigate } from "react-router-dom";

export const navigateTopath = (path) => {
  const navigate = useNavigate();
  navigate(path);
  return;
};
