const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());

const authzRoute = require("./routes/location/authz");
const getStateRoute = require("./routes/location/getState");
const getCountryRoute = require("./routes/location/getCountries");
const getCurrency = require("./routes/currency/currency");
const getsuggestion = require("./routes/openapi/getsuggestion");
const getImages = require("./routes/getImages/images-splash");
const getItinerary = require("./routes/openapi/getItinerary");
const getAdditionalInfo = require("./routes/openapi/additionalInfoItinerary");
const postEmail = require("./routes/email/email");
const postOtpEmail = require("./routes/email/otpEmail.js");
const getUpdatedSuggestionInfo = require("./routes/openapi/getUpdatedSuggestion.js");
const loginInfo = require("./routes/user/login.js");
const registerInfo = require("./routes/user/register.js");
const forgotPasswordInfo = require("./routes/user/fyp/forgotPassword.js");
const resetPasswordInfo = require("./routes/user/fyp/resetPassword.js");
const genPasswordInfo = require("./routes/user/OTP/generateOTP.js");
const valPasswordInfo = require("./routes/user/OTP/validateOTP.js");
const getUserName = require("./routes/user/getUserName.js");
const isUserSessionValid = require("./routes/user/isUserSessionValid.js");
const logout = require("./routes/user/logout.js");

// Use routes
app.use("/loc/authz", authzRoute);
app.use("/loc/getState", getStateRoute);
app.use("/loc/country", getCountryRoute);
app.use("/cur/currency", getCurrency);
app.use("/openapi/getsuggestion", getsuggestion);
app.use("/getImages/image", getImages);
app.use("/openapi/itinerary", getItinerary);
app.use("/email/sendEmail", postEmail);
app.use("/email/sendOtp", postOtpEmail);
app.use("/openapi/extraInfo", getAdditionalInfo);
app.use("/openapi/updatedInfo", getUpdatedSuggestionInfo);
app.use("/user/login", loginInfo);
app.use("/user/register", registerInfo);
app.use("/user/forgotPassword", forgotPasswordInfo);
app.use("/user/resetPassword", resetPasswordInfo);
app.use("/user/generateOtp", genPasswordInfo);
app.use("/user/ValidateOtp", valPasswordInfo);
app.use("/user/getUserName", getUserName);
app.use("/user/isUserSessionValid", isUserSessionValid);
app.use("/user/logout", logout);

app.listen(PORT, () => {
  console.log("port running on port", PORT);
});
