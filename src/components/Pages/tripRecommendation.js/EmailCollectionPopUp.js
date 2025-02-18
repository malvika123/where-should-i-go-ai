export const EmailCollectionPopUp = ({ setGuestEmail }) => {
  return (
    <div className="email-collection">
      <p className="email-p">Enter your email</p>
      <input
        type="email"
        className="text-box-input"
        placeholder="Enter your email"
        onChange={(e) => setGuestEmail(e.target.value)}
      />
    </div>
  );
};
