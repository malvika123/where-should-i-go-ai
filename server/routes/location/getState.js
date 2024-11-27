const express = require("express");
const router = express.Router();
const axios = require("axios");
const { GET_STATE_TOKEN } = require("../../constant/const");

router.post("/", async (req, res) => {
  try {
    const { country, authz } = req.body;
    const result = await axios.get(
      `https://www.universal-tutorial.com/api/states/${country}`,
      {
        headers: {
          Authorization: `Bearer ${authz}`,
          Accept: "application/json",
        },
      }
    );
    const data = result?.data.map((elt, i) => {
      return  elt['state_name'];
    });
    res.json(data);
  } catch (error) {
    return res.status(400).json({message:"caught an error"})
  }
});

module.exports = router;
