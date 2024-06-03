// public/api.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-account-form');
    const loginForm = document.getElementById('login-form');
    const orderForm = document.getElementById('order-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const food = document.getElementById('food').value;
            const drink = document.getElementById('drink').value;
            const reason = document.getElementById('reason').value;

            fetch('/api/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, address, email, password, food, drink, reason })
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                if (data === 'Account created successfully') {
                    localStorage.setItem('userPreferences', JSON.stringify({ name, address, email, password, food, drink, reason }));
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', name);
                    window.location.href = 'index.html';
                } else {
                    alert('Error creating account');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    } else if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch(`/api/user/${email}`)
            .then(response => response.json())
            .then(user => {
                if (user && user.password === password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', user.name);
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    } else if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const orderComplete = document.getElementById('order-complete');
            orderComplete.style.display = 'block';
            orderForm.style.display = 'none';
        });
    }
});
