const express = require('express');
const router = express.Router();
const { getUserShipments, createShipment } = require('../controllers/shipmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', getUserShipments);
router.post('/', createShipment);

module.exports = router;
