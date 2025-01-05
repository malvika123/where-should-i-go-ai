import { Footer } from "../Footer/Footer";
import TripPlannerHeader from "../Header/TripPlannerHeader";
import "./style/faq.css";
export const Faq = () => {
  return (
    <div className="faq-body-top">
      <TripPlannerHeader notshowSubHeader />
      <div className="faq-body">
        <p className="faq-body-head">Frequently Asked Questions</p>
        <p className="faq-body-que">Q: Is your platform free to use?</p>
        <p className="faq-body-ans">
          Yes, our basic recommendations are completely free!
        </p>
        <p className="faq-body-que">
          Q: How accurate are your recommendations?
        </p>
        <p className="faq-body-ans">
          We use advanced AI to ensure the destinations align with your
          preferences, but we always recommend doing your own research too.
        </p>
        <p className="faq-body-que">
          Q: Can I get recommendations for a specific type of trip?
        </p>
        <p className="faq-body-ans">
          Absolutely! Whether it’s a solo adventure, family holiday, or a
          romantic getaway, just tell us your needs, and we’ll handle the rest.
        </p>
      </div>
      <Footer />
    </div>
  );
};
