import { useState } from "react";
import CommonSpinner from "../../../common/CommonSpinner";

const AutocompleteBox = ({ predictedText, setUserBase, loading }) => {
  return (
    <div className="autocompleteBox">
      {loading && <CommonSpinner color={"orange"} width={20} />}
      {predictedText &&
        predictedText.map((elt) => {
          return (
            <p className="auto-elt" onClick={() => setUserBase(elt)}>
              {elt}
            </p>
          );
        })}
    </div>
  );
};

export default AutocompleteBox;
