import { useState } from "react";
import "./style/cookiePolicy.css";
import { LiaCookieBiteSolid } from "react-icons/lia";

export const CookiePolicy = () => {
  const [hide, setHide] = useState(false);
  return (
    <>
      {!hide && (
        <div className="cookie-policy-head">
          <LiaCookieBiteSolid className="cookie-icon" />
          <div className="sub-div-cp">
            <p className="cp-head">
              By using this website, you agree to our use of cookies. We use
              cookies to provide you with a great experience and to help our
              website run effectively.
              <br />
              <button className="button-cp" onClick={() => setHide(true)}>
                Understood
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
