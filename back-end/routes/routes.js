const express = require('express')

const router = express.Router();

const ForecastController = require('../controllers/forecast')

router.get('/clima/:city', ForecastController.getWeather )

module.exports = router;