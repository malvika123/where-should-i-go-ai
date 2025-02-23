export const EmailCollectionPopUp = ({ setGuestEmail }) => {
  const guestEmail = (val) => {
    localStorage.setItem("userInfo", JSON.stringify({ ...userInfo, email }));
    setGuestEmail(val);
  };
  return (
    <div className="email-collection">
      <p className="email-p">Enter your email</p>
      <input
        type="email"
        className="text-box-input"
        placeholder="Enter your email"
        onChange={(e) => guestEmail(e.target.value)}
      />
    </div>
  );
};
