import axios from "axios";

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
