const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://malvikasen555:SPEj3kX8DIe0qEVH@cluster0.iln8u.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();
const PORT = 4100;

app.use(express.json());

const authzRoute = require("./routes/location/authz");
const getStateRoute = require("./routes/location/getState");
const getCountryRoute = require("./routes/location/getCountries");
const getCurrency = require("./routes/currency/currency");
const getsuggestion = require("./routes/openapi/getsuggestion");
const getImages = require("./routes/getImages/images-splash");
const getItinerary = require("./routes/openapi/getItinerary");
const getAdditionalInfo = require("./routes/openapi/additionalInfoItinerary");
const postEmail = require("./routes/email/email");
const getUpdatedSuggestionInfo = require("./routes/openapi/getUpdatedSuggestion.js");

//mongodb Calls
const getData = require("./routes/mongodb/getData.js");

// Use routes
app.use("/loc/authz", authzRoute);
app.use("/loc/getState", getStateRoute);
app.use("/loc/country", getCountryRoute);
app.use("/cur/currency", getCurrency);
app.use("/openapi/getsuggestion", getsuggestion);
app.use("/getImages/image", getImages);
app.use("/openapi/itinerary", getItinerary);
app.use("/email/sendEmail", postEmail);
app.use("/openapi/extraInfo", getAdditionalInfo);
app.use("/openapi/updatedInfo", getUpdatedSuggestionInfo);
app.use("/openapi/updatedInfo", getUpdatedSuggestionInfo);

app.listen(PORT, () => {
  console.log("port running on port", PORT);
});
