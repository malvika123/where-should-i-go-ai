export const Alert = ({ msg, successMsg }) => {
  return (
    <div className={successMsg ? "successAlert" : "alert"}>
      <span>{successMsg ? successMsg : msg}</span>
    </div>
  );
};

export const GreenAlert = ({ msg }) => {
  return (
    <div className="successAlert">
      <span>{msg}</span>
    </div>
  );
};

export const GrayAlert = ({ msg }) => {
  return (
    <div className="grayAlert">
      <span>{msg}</span>
    </div>
  );
};
