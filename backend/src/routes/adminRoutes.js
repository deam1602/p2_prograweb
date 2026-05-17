const express = require('express');
const router = express.Router();
const {
    getDashboardStats,
    getUsers,
    updateUser,
    deleteUser,
    getShipments,
    updateShipment,
    deleteShipment
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.use(authMiddleware, adminMiddleware);

router.get('/dashboard', getDashboardStats);

router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/shipments', getShipments);
router.put('/shipments/:id', updateShipment);
router.delete('/shipments/:id', deleteShipment);

module.exports = router;
