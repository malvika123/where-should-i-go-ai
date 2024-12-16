const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password, name, lname } = req.body;
    const data = await axios.post("http://localhost:4200/api/addUser", {
      email,
      password,
      name,
      lname,
    });
    const dataObj = data?.data;
    console.log("yui", email, password);
    res.json({});
  } catch (err) {
    res.status(500).json({ error: "Failed to log user In " });
  }
});

module.exports = router;
