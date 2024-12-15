import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

export const PasswordInputField = ({ setPassword = () => {} }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="password-box">
      <p className="input-txt-password">Password</p>
      <div className="input-field-pass-full">
        <input
          className="input-field-pass"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          maxLength={16}
        />
        <button className="show-btn-parent" onClick={() => handleEyeClick()}>
          {showPassword ? (
            <IoEyeOff className="show-btn" />
          ) : (
            <IoEye className="show-btn" />
          )}
        </button>
      </div>
    </div>
  );
};
