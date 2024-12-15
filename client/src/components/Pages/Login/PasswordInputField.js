export const PasswordInputField = () => {
  return (
    <div className="password-box">
      <p className="input-txt-password">Password</p>
      <div className="input-field-pass-full">
        <input
          className="input-field-pass"
          type="password"
          placeholder="Enter your password..."
        />
        <button className="show-btn">show</button>
      </div>
    </div>
  );
};
