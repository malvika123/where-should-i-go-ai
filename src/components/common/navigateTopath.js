import { useNavigate } from "react-router-dom";
import { isUserSessionValid } from "./utils";

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
  window.location.href = "/validateEmail?to=deleteAccount";
};

export const navigateTopath = async ({ path }) => {
  const isSessionValid = await isUserSessionValid();
  if (isSessionValid) {
    window.document.location.href = "/tripTailor";
  } else {
    window.document.location.href = "/login";
  }
};

export const navigateToDeleteAccountpath = async ({ path }) => {
  const isSessionValid = await isUserSessionValid();
  if (isSessionValid) {
    window.document.location.href = "/deleteAccount";
  } else {
    window.document.location.href = "/login?to=deleteAccount";
  }
};

export const redirectToPrivacyPolicyPage = () => {
  window.location.href = "/privacyPolicy";
};
