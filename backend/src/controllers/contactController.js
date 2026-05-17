const ContactMessage = require('../models/ContactMessage');

const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newMessage = new ContactMessage({
            name,
            email,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error: error.message });
    }
};

module.exports = { submitContact };
