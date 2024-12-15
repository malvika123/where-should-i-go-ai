export const PasswordChecker = () => {
  return (
    <div className="password-check-box">
      <p className="input-txt">Password must be</p>
      <input type="checkbox" disabled /> <span>8-16 character long </span>
      <br />
      <input type="checkbox" disabled />{" "}
      <span>
        alphanumeric with atleast 1 uppercase and 1 lowercase character
      </span>
      <br />
      <input type="checkbox" disabled />{" "}
      <span>containing 1 special character</span>
      <br />
    </div>
  );
};
