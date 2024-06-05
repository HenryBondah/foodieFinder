// const express = require('express');
// const router = express.Router();
// const axios = require('axios');
const config = require('./config'); // Add a config file to store sensitive information
const apiGatewayEndpoint = config.apiGatewayEndpoint;

document.querySelector('#create-account-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('#name').value,
        address: document.querySelector('#address').value,
        zipcode: document.querySelector('#zipcode').value,
        food: document.querySelector('#food').value,
        drink: document.querySelector('#drink').value,
        reason: document.querySelector('#reason').value
    };

    // Create Account
    fetch(apiGatewayEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)  // Convert formData to JSON
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data === 'Account created successfully') {
            }
        })
});


// Get User
// router.get('/user/:email', async (req, res) => {
//     const email = req.params.email;
//     try {
//         const response = await axios.get(`${apiGatewayEndpoint}/user/${email}`);
//         res.status(response.status).json(response.data);
//     } catch (error) {
//         console.error('Error retrieving user:', error);
//         res.status(500).send('Error retrieving user');
//     }
// });

// module.exports = router;
