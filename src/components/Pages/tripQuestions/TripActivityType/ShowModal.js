import { useState } from "react";
import "./style/showModal.css";
import { RxCrossCircled } from "react-icons/rx";

const InfoModal = ({ setShowAddInterestModal, setDefaultTrip }) => {
  const [char, setChar] = useState(0);
  const [textAreaText, setTextAreaText] = useState("");

  const addedInterest = () => {
    const intrst = textAreaText.split(",").map((word) => {
      const elt = word.trim();
      return elt.charAt(0).toUpperCase() + elt.slice(1);
    });
    setDefaultTrip((prev) => prev.concat(intrst));
    setShowAddInterestModal(false);
  };

  return (
    <div>
      <div className="modal-background"></div>
      <div className="modal">
        <div className="header-modal">
          <p className="">
            <RxCrossCircled onClick={() => setShowAddInterestModal(false)} />
          </p>
        </div>
        <div className="intrst">
          <h5 className="interest-txt">Add other interests</h5>
          <textarea
            type="text"
            className="interest-input"
            placeholder="Add additional interests"
            maxLength={50}
            onChange={(e) => {
              setChar(e.currentTarget.value.length);
              setTextAreaText(e.currentTarget.value);
            }}
          />
          <div className="info">
            <h10>Separate each entry with a comma</h10>
            <h9>{char}/50 max characters</h9>
          </div>
        </div>
        <div className="add-btn-div">
          <button className="add-btn" onClick={() => addedInterest()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
