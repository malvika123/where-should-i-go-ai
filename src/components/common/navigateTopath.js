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

export const redirectToJoinUsPage = () => {
  window.location.href = "/joinUs";
};

export const redirectToDeleteAccountPage = () => {
  window.location.href = "/deleteAccount";
};

export const redirectToDeleteAccountValidationAndConfirmation = () => {
  window.location.href = "/validateEmail?accDelFlow=true";
};
