import "../style/login.css";

import React, { useRef } from "react";

export const SixDigitPin = ({ count = 6, setPin }) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const checkAndGetPin = () => {
    setPin("");
    for (let i = 0; i < inputRefs.length; i++) {
      setPin((prev) => prev + inputRefs[i].current.value);
    }
  };
  const handleInput = (index, e) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Only allow single digits (0-9)
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus(); // Move focus forward
      }
    } else {
      e.target.value = ""; // Clear invalid input
    }
    checkAndGetPin();
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedData = e.clipboardData.getData("text").trim(); // Get the pasted text
    if (/^\d+$/.test(pastedData)) {
      // Distribute pasted characters into input fields
      for (let i = 0; i < inputRefs.length; i++) {
        if (i < pastedData.length) {
          inputRefs[i].current.value = pastedData[i]; // Set character in input
        } else {
          inputRefs[i].current.value = ""; // Clear any remaining boxes
        }
      }

      // Move focus to the last populated box
      const lastFilledIndex = Math.min(pastedData.length, inputRefs.length) - 1;
      if (lastFilledIndex >= 0) {
        inputRefs[lastFilledIndex].current.focus();
      }
      checkAndGetPin();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus(); // Move focus backward
    }
  };

  return (
    <div className="six-digit-box">
      {inputRefs.map((ref, index) => (
        <input
          type="text"
          key={index}
          ref={ref}
          className="pin-box"
          onInput={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          maxLength="1"
          inputMode="numeric"
        />
      ))}
    </div>
  );
};
