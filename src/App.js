import "./App.css";
import About from "./components/Pages/About";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
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
import Itinerary from "./components/Pages/tripRecommendation.js/Itenary";
import { ModifyReq } from "./components/Pages/tripRecommendation.js/ModifyReq";
import { ValidateEmail } from "./components/Pages/Login/ValidateEmail";
import { Register } from "./components/Pages/Login/Register";
import ForgotPassword from "./components/Pages/Login/fyp/Forgot-password";
import ResetPassword from "./components/Pages/Login/fyp/ResetPassword";
import Payment from "./components/Pages/payment-gateway/payment";
import SomethingWentWrongPage from "./components/Pages/SomethingWentWrong";
import Feedback from "./components/Pages/Feedback";
import { DeleteAccount } from "./components/Pages/deleteAccount/DeleteAccount";
import { JoinUs } from "./components/Pages/JoinUs";
import { DeleteAccountAndVerification } from "./components/Pages/deleteAccount/DeleteAccountAndVerification";
import { PrivacyPolicy } from "./components/Pages/PrivacyPolicy";
import { Faq } from "./components/Pages/Faq";
import { useEffect } from "react";
import axios from "axios";
import UserPlace from "./components/Pages/tripQuestions/UserPlace/UserPlace";
import Article from "./pages/articles/travel-insights-20250228";
import ArticlePage from "./pages/articles/ArticlesPage";
import { ArticleAssembly } from "./pages/articles/ArticleAssembly";

function App() {
  //wake up call to servers
  useEffect(() => {
    const wakeUser = async () => {
      const skippedLogin = sessionStorage.getItem("skippedLogin");
      const hidePrivacyPolicyForTime = localStorage.getItem(
        "hidePrivacyPolicyForTime"
      );
      const clearCache = () => {
        const timeNow = Math.floor(Date.now() / 1000)?.toString();
        if (skippedLogin < timeNow) {
          localStorage.removeItem("skippedLogin");
        }
        if (hidePrivacyPolicyForTime < timeNow) {
          localStorage.removeItem("hidePrivacyPolicyForTime");
        }
      };
      try {
        clearCache();
        await axios.post("api/wakeup");
      } catch (e) {
        //console.log(e);
      }
    };
    wakeUser();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/tripTailor" element={<TripTailor />} />
        <Route exact path="/gender" element={<Gender />} />
        <Route exact path="/country" element={<TripCountry />} />
        <Route exact path="/budget" element={<Budget />} />
        <Route exact path="/tripInfo" element={<TripInfo />} />
        <Route exact path="/budget" element={<Budget />} />
        <Route exact path="/tripType" element={<TripType />} />
        <Route exact path="/expectBox" element={<AdditionalInfo />} />
        <Route exact path={tripRecommendationPath} element={<TripResponse />} />
        <Route exact path="/showFinalInfo" element={<ShowFinalInfo />} />
        <Route exact path="/itinerary" element={<Itinerary />} />
        <Route exact path="/ModifyReq" element={<ModifyReq />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/validateEmail" element={<ValidateEmail />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/ResetPassword" element={<ResetPassword />} />
        <Route exact path="/feedback" element={<Feedback />} />
        <Route exact path="/deleteAccount" element={<DeleteAccount />} />
        <Route exact path="/joinUs" element={<JoinUs />} />
        <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route exact path="/userPlace" element={<UserPlace />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/travel-articles" element={<ArticleAssembly />} />

        <Route exact path="/faq" element={<Faq />} />
        <Route
          path="/deleteAccount/validationAndConfirmation"
          element={<DeleteAccountAndVerification />}
        />

        <Route
          exact
          path="/SomethingWentWrong"
          element={<SomethingWentWrongPage />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
