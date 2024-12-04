import "./App.css";
import About from "./components/Pages/About";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login";
import LandingPage from "./components/Pages/LandingPage";
import PageNotFound from "./components/Pages/PageNotFound";
import TripTailor from "./components/Pages/TripTailor";
import Gender from "./components/Pages/tripQuestions/TripGender/Gender";
import TripCountry from "./components/Pages/tripQuestions/Trip-country/TripCountry";
import Budget from "./components/Pages/tripQuestions/TripBudget/Budget";
import TripInfo from "./components/Pages/tripQuestions/TripTravelerInfo/TripInfo";
import TripType from "./components/Pages/tripQuestions/TripActivityType/TripType";
import TripResponse from "./components/Pages/tripRecommendation.js/TripResponse";
import ShowFinalInfo from "./components/Pages/tripQuestions/ShowFinalInfo/ShowFinalInfo";
import AdditionalInfo from "./components/Pages/tripQuestions/ExtraInfo/AdditionalInfo";
import { tripRecommendationPath } from "./components/common/constants";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="tripTailor/" element={<TripTailor />} />
        <Route exact path="/gender" element={<Gender />} />
        <Route exact path="/country" element={<TripCountry />} />
        <Route exact path="/budget" element={<Budget />} />
        <Route exact path="/tripInfo" element={<TripInfo />} />
        <Route exact path="/budget" element={<Budget />} />
        <Route exact path="/tripType" element={<TripType />} />
        <Route exact path="/expectBox" element={<AdditionalInfo />} />
        <Route exact path={tripRecommendationPath} element={<TripResponse />} />
        <Route exact path="/showFinalInfo" element={<ShowFinalInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
