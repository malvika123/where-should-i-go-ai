const AutocompleteBox = ({ predictedText, setUserBase }) => {
  return (
    <div className="autocompleteBox">
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
