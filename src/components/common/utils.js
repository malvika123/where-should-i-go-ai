import axios from "axios";
import list from "./badwords/list.json";

export const isUserLoggedIn = () => {
  return aTknCookie() && cuidCookie();
};

export const isUserSessionValid = async () => {
  const token = aTknCookie();
  const id = cuidCookie();
  const iv = ivCookie();
  try {
    const data = await axios.post("/api/user/isUserSessionValid", {
      token,
      id,
      iv,
    });
    return true;
  } catch (e) {
    localStorage.removeItem("userInfo");
    return false;
  }
};

export const aTknCookie = () => {
  let cookie = document.cookie
    ?.split(";")
    .filter((elt) => elt.includes("aTkn"))?.[0];
  cookie = cookie?.slice(cookie.indexOf("=") + 1);
  return cookie;
};

export const cuidCookie = () => {
  const cuidCookie =
    document?.cookie &&
    document?.cookie?.split(";").filter((elt) => elt.includes("cuid"))?.[0];
  return cuidCookie?.split("=")[1];
};

export const ivCookie = () => {
  const ivCookie =
    document.cookie &&
    document.cookie?.split(";").filter((elt) => elt.includes("iv"))?.[0];
  return ivCookie?.split("=")[1];
};

export const getUserName = async () => {
  const token = aTknCookie();
  const id = cuidCookie();
  const iv = ivCookie();
  try {
    const data = await axios.post("/api/user/getUserName", {
      token,
      id,
      iv,
    });
    return data?.data;
  } catch (e) {
    const error = e?.response?.data?.error || "Something went wrong !!";
  }
};

export const getRecommendation = async () => {
  const userInfo = JSON.parse(sessionStorage.getItem("collectedInfo"));
  const {
    days,
    mnth,
    gender,
    selectedStates,
    country,
    tripType,
    pets,
    hasFemale,
    hasKids,
    minValue,
    maxValue,
    currency,
    modifiedCurrency,
    slctdActsSet,
    text,
  } = userInfo;

  const token = aTknCookie();
  const id = cuidCookie();
  const iv = ivCookie();

  const res = async () => {
    try {
      const data = await axios.post(
        "/api/openapi/getsuggestion",
        {
          days,
          mnth,
          gender,
          selectedStates: `${Array.from(selectedStates || []).map(
            (elt) => `${elt}, `
          )}`,
          country,
          tripType,
          pets,
          hasFemale,
          hasKids,
          minValue,
          maxValue,
          currency,
          modifiedCurrency,
          slctdActsSet: `${Array.from(slctdActsSet).map((elt) => `${elt}, `)}`,
          text,
          token,
          id,
          iv,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (e) {
      console.log("uiui", e);
      const errData = e?.response?.data;
      if (!errData?.authenticated) {
        window.location.href = "/login?unauthorised=true";
        return;
      } else if (!errData.tokenCountSufficient) {
        window.location.href = "/tripRecommendation";
        return;
      }
    }
  };
  return await res();
};

export const sanitizeInput = (text) => {
  const bannedWords = list; // Add more as needed

  // Create a regex pattern dynamically to match whole words
  const regex = new RegExp(`(${bannedWords.join("|")})`, "gi");

  return text.replace(regex, (match) => "*".repeat(match.length)); // Replace with asterisks
};
