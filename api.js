const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('./config'); // Add a config file to store sensitive information

const apiGatewayEndpoint = config.apiGatewayEndpoint;

// Create Account
router.post('/create-account', async (req, res) => {
    const { name, address, email, password, food, drink, reason } = req.body;
    try {
        const response = await axios.post(`${apiGatewayEndpoint}/create-account`, {
            name, address, email, password, food, drink, reason
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    }
});

// Get User
router.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const response = await axios.get(`${apiGatewayEndpoint}/user/${email}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).send('Error retrieving user');
    }
});

module.exports = router;
