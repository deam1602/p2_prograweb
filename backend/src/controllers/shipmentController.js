const Shipment = require('../models/Shipment');

const getUserShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shipments', error: error.message });
    }
};

const createShipment = async (req, res) => {
    try {
        const { destination, origin, serviceLevel, dimensions, cost, extras } = req.body;
        
        // genera numero aleatorio para seguimiento (e.g. SKY-12345678)
        const trackingCode = `SKY-${Math.floor(10000000 + Math.random() * 90000000)}`;

        const newShipment = new Shipment({
            trackingCode,
            userId: req.user.id,
            destination,
            origin,
            serviceLevel,
            extras,
            dimensions,
            cost,
            status: 'pending'
        });

        await newShipment.save();
        res.status(201).json(newShipment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shipment', error: error.message });
    }
};

module.exports = { getUserShipments, createShipment };
