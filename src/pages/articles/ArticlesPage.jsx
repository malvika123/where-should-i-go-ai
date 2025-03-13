import { useParams } from "react-router-dom";
import PageNotFound from "../../components/Pages/PageNotFound";
import TripPlannerHeader from "../../components/Header/TripPlannerHeader";
import Heading from "../../components/Header/Heading";
import { Footer } from "../../components/Footer/Footer";
import ImgSlider from "../../components/Pages/tripRecommendation.js/ImgSlider";
import "../articles/style/articlesPage.css";
import AdComponent from "./AdComponent";

function ArticlesPage() {
  const { articleId } = useParams();
  function getRandomWord() {
    const words = [
      "travel",
      "adventure",
      "destination",
      "explore",
      "journey",
      "trip",
      "vacation",
      "escape",
      "discover",
      "wander",
      "beautiful place",
      "AI",
      "beautiful background",
      "travel by van",
      "friends",
      "family",
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
  try {
    const ArticleComponent = require(`./${articleId}`).default; // Load dynamically
    return (
      <div>
        <Heading showTryourService={true} />
        {/* <ImgSlider
          place={getRandomWord()}
          showMultipleSlides={1}
          classnm="artical-img"
        /> */}
        <ArticleComponent />
        <Footer />
        {/* <AdComponent /> */}
      </div>
    );
  } catch (error) {
    return <PageNotFound />;
  }
}

export default ArticlesPage;
