const express = require("express");
const app = express();
const PORT = 4100;

app.use(express.json());

const authzRoute = require("./routes/location/authz");
const getStateRoute = require("./routes/location/getState");
const getCountryRoute = require("./routes/location/getCountries");
const getCurrency = require("./routes/currency/currency");
// Use routes
app.use("/loc/authz", authzRoute);
app.use("/loc/getState", getStateRoute);
app.use("/loc/country", getCountryRoute);
app.use("/cur/currency", getCurrency);

app.listen(PORT, () => {
  console.log("port running on port", PORT);
});
