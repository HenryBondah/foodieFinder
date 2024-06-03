const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/create_account', (req, res) => {
    res.sendFile(__dirname + '/public/create_account.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/order_food', (req, res) => {
    res.sendFile(__dirname + '/public/order_food.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
