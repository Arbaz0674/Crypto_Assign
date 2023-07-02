const express = require("express");
const axios = require("axios");
const router = express.Router();

//Importing Database Insertion Model
const Exchange = require("./../models/exchange");

//When Page Loads Fetch Data from API and Store it in Database
router.get("/", async (req, res) => {
  let execData;
  try {
    //   API_KEY
    const excUrl = `https://rest.coinapi.io/v1/APIKEY-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9/exchanges`;
    const iconUrl = `https://rest.coinapi.io/v1/APIKEY-FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9/exchanges/icons/32`;
    //1) Fetch Exchange & Icons from CoinAPI Server
    let excResponses = await axios.get(excUrl);
    let iconResponses = await axios.get(iconUrl);
    if (excResponses.status == 200 && iconResponses.status == 200) {
      const exchanges = excResponses.data;
      const icons = iconResponses.data;
      exchanges.forEach((exchange) => {
        icons.forEach(async (icon) => {
          if (exchange.exchange_id == icon.exchange_id) {
            execData = { ...icon, volume: exchange.volume_1day_usd };
            await Exchange.create(execData);
          }
        });
      });
      res.status(200).json({ message: `success` });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//When Exchangelist is called it will display data

router.get("/exchangelist", async (req, res) => {
  try {
    const exchange = await Exchange.find();
    res
      .status(200)
      .json({ message: "success", count: exchange.length, exchange });
  } catch (err) {
    res.status(500).json({ message: "Some Internal Error Occurred" });
  }
});

module.exports = router;
