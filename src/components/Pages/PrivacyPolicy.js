import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import { FcPrivacy } from "react-icons/fc";
import "./style/privacyPolicy.css";

export const PrivacyPolicy = () => {
  return (
    <div className="about-head-div-pp">
      <TripPlannerHeader notshowSubHeader />
      <p
        style={{
          textAlign: "left",

          marginTop: "2%",
          color: "rgb(57, 138, 192)",
          background: "yellow",
          margin: "2% auto auto 10%",
        }}
      >
        Privacy Policy <FcPrivacy />
      </p>
      <div className="sub-body-pp">
        <p className="heading-pp">
          Effective Date: 4 jan 2024
          <div
            style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
          ></div>
        </p>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            1. Introduction
          </p>{" "}
          Welcome to Whereshouldigoai.com. Your privacy is important to us, and
          we are committed to protecting the personal information you share with
          us. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website,
          Whereshouldigoai.com, or use our services. By accessing or using our
          website, you agree to the terms of this Privacy Policy. If you do not
          agree with these terms, please do not use our website.
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            2. Information We Collect
          </p>{" "}
          We collect the following types of information:{" "}
          <p className="heading-sub-pp">a. Personal Information:</p> Name Email
          address Contact information Any other information you provide directly
          to us (e.g., through forms or account creation).{" "}
          <p className="heading-sub-pp">b. Non-Personal Information:</p> IP
          address Browser type Operating system Pages viewed Time spent on our
          site Referring URLs{" "}
          <p className="heading-sub-pp">
            c. Cookies and Tracking Technologies:
          </p>{" "}
          We use cookies and similar technologies to enhance your experience.
          Cookies help us understand how you interact with our website and allow
          us to personalize your experience.
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            3. How We Use Your Information
          </p>{" "}
          We may use the information we collect for the following purposes:{" "}
          <ul>
            <li>provide and maintain our services.</li>
            <li>To personalize your experience on our website.</li>
            <li>
              {" "}
              To communicate with you, including sending updates or responding
              to inquiries.
            </li>
            <li>To analyze website usage and improve our services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            4. How We Share Your Information
          </p>{" "}
          We do not sell or rent your personal information to third parties.
          However, we may share your information in the following situations:
          <ul>
            <li>
              <span style={{ fontWeight: "bold" }}>Service Providers:</span>{" "}
              With third-party vendors who assist us in providing services
              (e.g., hosting, analytics, payment processing).
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Legal Obligations:</span> If
              required by law or to protect our rights and the rights of others.
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Business Transfers:</span> In
              the event of a merger, sale, or transfer of assets, your
              information may be transferred.
            </li>
          </ul>
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            5. Your Rights and Choices
          </p>{" "}
          Depending on your location, you may have certain rights regarding your
          personal information:{" "}
          <ul>
            <li>
              <span style={{ fontWeight: "bold" }}>Access and Correction:</span>{" "}
              You can request access to or correction of your personal
              information.
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Data Deletion:</span> You can
              request that we delete your personal information.
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Opt-Out:</span> You can opt
              out of receiving promotional communications from us. To exercise
              these rights, contact us at team@whereshouldigoai.com.
            </li>
          </ul>
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            6. Data Security
          </p>{" "}
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no method of
          transmission over the internet or electronic storage is 100% secure,
          and we cannot guarantee absolute security.
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            7. Third-Party Links
          </p>{" "}
          Our website may contain links to third-party websites or services. We
          are not responsible for the privacy practices of these third parties,
          and we encourage you to review their privacy policies.
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            8. Children's Privacy
          </p>{" "}
          Our website is not intended for individuals under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          we become aware that we have collected such information, we will
          delete it promptly.
        </p>
        <div
          style={{ backgroundColor: "rgb(202, 201, 201)", height: "1px" }}
        ></div>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            9. Changes to This Privacy Policy
          </p>{" "}
          We may update this Privacy Policy from time to time. The updated
          policy will be posted on this page with the "Effective Date" updated
          accordingly. We encourage you to review this Privacy Policy
          periodically.
        </p>
        <p className="heading-sub-txt-pp">
          <p className="heading-sub-pp" style={{ fontWeight: "bold" }}>
            10. Contact Us
          </p>{" "}
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us:{" "}
          <ul>
            <li>Email: team@whereshouldigoai.com </li>
          </ul>{" "}
          Thank you for trusting us with your information. Your privacy is our
          priority.
        </p>
      </div>
      <Footer />
    </div>
  );
};
