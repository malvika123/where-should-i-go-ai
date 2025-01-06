import { useEffect, useState } from "react";

export const PasswordChecker = ({ password, setIsPasswordAdequate }) => {
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
      if (passwordLength && alphanumeric && specialChar) {
        setIsPasswordAdequate(true);
      } else {
        setIsPasswordAdequate(false);
      }
    } else {
      setPasswordLength(false);
      setAlphanumeric(false);
      setSpecialChar(false);
      setIsPasswordAdequate(false);
    }
  }, [password, passwordLength, alphanumeric, specialChar]);

  return (
    <div className="password-check-box">
      <p className="input-txt-pass">Password must be</p>
      <input
        className="input-check"
        type="checkbox"
        checked={passwordLength}
      />{" "}
      <span className="pass-check-text">8-16 character long </span>
      <br />
      <input
        style={{ color: "yellow" }}
        type="checkbox"
        checked={alphanumeric}
        className="input-check"
      />{" "}
      <span className="pass-check-text">
        containing atleast 1 uppercase, 1 number and 1 lowercase character
      </span>
      <br />
      <input
        className="input-check"
        type="checkbox"
        checked={specialChar}
      />{" "}
      <span className="pass-check-text">containing 1 special character</span>
      <br />
    </div>
  );
};
