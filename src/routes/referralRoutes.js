const express = require('express');
const { createReferral } = require('../controllers/referralController');
const router = express.Router();

router.post('/referrals', createReferral);

module.exports = router;
