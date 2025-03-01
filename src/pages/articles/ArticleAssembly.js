import { Footer } from "../../components/Footer/Footer";
import Heading from "../../components/Header/Heading";
import ImgSlider from "../../components/Pages/tripRecommendation.js/ImgSlider";
import img from "../../components/images/3577871-hd_1920_1080_25fps.mp4";
import "../articles/style/articlesPage.css";

export const ArticleAssembly = () => {
  return (
    <div>
      <div>
        <Heading showTryourService={true} />
        <div
          style={{
            textAlign: "left",
            marginLeft: "15%",
            marginTop: "2%",
            marginRight: "15%",
          }}
        >
          <h1 className="artPageH1">Travel world with us</h1>
          <span className="artPageH2">Read latest articles with us</span>
          <div className="line"></div>
          <video className="video" autoPlay loop muted playsInline>
            <source src={img} type="video/mp4" />
          </video>
          <div className="line"></div>
          <h3>Links:</h3>
          <ul>
            <li>
              <a href="articles/travel-insights-1d8smdeh4t">
                The Enriching Experience of Travel
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-2lv0tk5ojz">
                Discover Delhi: A Blend of Timeless History and Vibrant
                Modernity
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-2vweoam6ny">
                Trending Travel Destinations for 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-4o7hg04tte">
                Exploring the World: A Journey Through Breathtaking Destinations
                🌍
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-38h9suns1o">
                Top Travel Trends 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-39pzk9nzhz">
                Top Travel Trends in 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-56mo5ro6o3">
                Exploring the Rise of Eco-Tourism
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-20250228">
                The Rising Trend of Sustainable Tourism: Exploring Eco-friendly
                Destinations
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-bemhyvt05q">
                Trending Travel Destinations in 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-boe18ocxiw">
                🌍 Trending Travel Destinations in 2022
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-cnrk6kisin">
                Exploring BioTech Tourism: The Emergence of a New Trend
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-com2pl8s95">
                Exploring the New Travel Norms in 2024
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-cu6b4rf4kc">
                Exploring the World: A Journey Through Breathtaking Destinations
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-ftdf76ok3w">
                Exploring the World: A Journey Through Breathtaking Destinations
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-hzyaqu6h2o">
                Emerging Travel Trends in 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-lb8u6d5aev">
                Top Travel Trends to Watch in 2024
              </a>
            </li>

            <li>
              <a href="articles/travel-insights-lbzcr2wpk9">
                Exploring Eco-Friendly Travel in 2023
              </a>
            </li>

            <li>
              <a href="articles/travel-insights-p6h2193qzz">
                Top Travel Trends in 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-p8x7u04n3o">
                Travel Trends to Watch in 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-rql6jg1bpb">
                Exploring the Rise of AI in Travel Planning
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-t8a1gg12wx">
                The Future of Travel: Top Trends for 2025
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-tt9o00bn6c">
                {" "}
                Exploring the Wonders of AI in Travel Trends
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-u1jrku4u15">
                Exploring the Rise of Eco-Friendly Travel in 2023
              </a>
            </li>
            <li>
              <a href="articles/travel-insights-zv2pby62p9">
                Discover Thailand: Trending Travel Destinations for 2024
              </a>
            </li>
          </ul>
          <div></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
