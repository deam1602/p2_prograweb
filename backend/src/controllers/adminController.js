const User = require('../models/User');
const Shipment = require('../models/Shipment');

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalShipments = await Shipment.countDocuments();
        
        const shipmentsByStatus = await Shipment.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const revenueAgg = await Shipment.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$cost" } } }
        ]);
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

        const shipmentsByMonth = await Shipment.aggregate([
            { 
                $group: { 
                    _id: { $month: "$createdAt" }, 
                    count: { $sum: 1 } 
                } 
            },
            { $sort: { _id: 1 } }
        ]);

        const shipmentsByOrigin = await Shipment.aggregate([
            { $group: { _id: "$origin", count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            totalUsers,
            totalShipments,
            shipmentsByStatus,
            totalRevenue,
            shipmentsByMonth,
            shipmentsByOrigin
        });
    } catch (error) {
        res.status(500).json({ message: 'Error loading stats', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error loading users' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

const getShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ message: 'Error loading shipments' });
    }
};

const updateShipment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedShipment = await Shipment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedShipment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shipment' });
    }
};

const deleteShipment = async (req, res) => {
    try {
        const { id } = req.params;
        await Shipment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Shipment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shipment' });
    }
};

module.exports = {
    getDashboardStats,
    getUsers,
    updateUser,
    deleteUser,
    getShipments,
    updateShipment,
    deleteShipment
};
