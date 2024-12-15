import { useEffect, useState } from "react";

export const PasswordChecker = ({ password }) => {
  const [passwordLength, setPasswordLength] = useState(false);
  const [alphanumeric, setAlphanumeric] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const regexForAlphanumeric = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  const regexForSpecial = /[^a-zA-Z0-9\s]/;
  useEffect(() => {
    if (password) {
      if (password.length >= 8 && password.length <= 16) {
        setPasswordLength(true);
      } else {
        setPasswordLength(false);
      }

      if (regexForAlphanumeric.test(password)) {
        setAlphanumeric(true);
      } else {
        setAlphanumeric(false);
      }

      if (regexForSpecial.test(password)) {
        setSpecialChar(true);
      } else {
        setSpecialChar(false);
      }
    } else {
      setPasswordLength(false);
      setAlphanumeric(false);
      setSpecialChar(false);
    }
  }, [password]);

  return (
    <div className="password-check-box">
      <p className="input-txt">Password must be</p>
      <input
        className="input-check"
        type="checkbox"
        checked={passwordLength}
      />{" "}
      <span>8-16 character long </span>
      <br />
      <input
        style={{ color: "yellow" }}
        type="checkbox"
        checked={alphanumeric}
      />{" "}
      <span>
        containing atleast 1 uppercase, 1 number and 1 lowercase character
      </span>
      <br />
      <input type="checkbox" checked={specialChar} />{" "}
      <span>containing 1 special character</span>
      <br />
    </div>
  );
};
