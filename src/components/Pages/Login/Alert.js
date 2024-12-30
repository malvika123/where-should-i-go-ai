export const Alert = ({ msg, successMsg }) => {
  return (
    <div className={successMsg ? "successAlert" : "alert"}>
      <span>{successMsg ? successMsg : msg}</span>
    </div>
  );
};
