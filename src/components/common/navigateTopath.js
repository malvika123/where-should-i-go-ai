import { useNavigate } from "react-router-dom";

export const navigateTopath = (path) => {
  const navigate = useNavigate();
  navigate(path);
  return;
};

export const redirectToAboutPage = () => {
  window.location.href = "/about";
};

export const redirectToFeedbackPage = () => {
  window.location.href = "/feedback";
};

export const redirectToHomePage = () => {
  window.location.href = "/";
};
