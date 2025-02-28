import { useParams } from "react-router-dom";
import PageNotFound from "../../components/Pages/PageNotFound";
import TripPlannerHeader from "../../components/Header/TripPlannerHeader";
import Heading from "../../components/Header/Heading";
import { Footer } from "../../components/Footer/Footer";
import ImgSlider from "../../components/Pages/tripRecommendation.js/ImgSlider";
import "../articles/style/articlesPage.css";

function ArticlesPage() {
  const { articleId } = useParams();
  try {
    const ArticleComponent = require(`./${articleId}`).default; // Load dynamically
    return (
      <div>
        <Heading showTryourService={true} />
        <ImgSlider
          place="beautiful place"
          showMultipleSlides={1}
          classnm="artical-img"
        />
        <ArticleComponent />
        <Footer />
      </div>
    );
  } catch (error) {
    return <PageNotFound />;
  }
}

export default ArticlesPage;
