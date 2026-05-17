const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    trackingCode: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    origin: { type: String, required: true },
    serviceLevel: { type: String, required: true },
    extras: [{ type: String }],
    dimensions: {
        weight: { type: Number, required: true }, // lb
        length: { type: Number, required: true }, // in
        width: { type: Number, required: true },  // in
        height: { type: Number, required: true }  // in
    },
    status: { type: String, enum: ['pending', 'in_transit', 'delivered'], default: 'pending' },
    cost: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
