document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-account-form');
    const loginForm = document.getElementById('login-form');
    const orderForm = document.getElementById('order-form');
    const orderFoodBtn = document.getElementById('order-food-btn');
    const showFoodsBtn = document.getElementById('show-foods');
    const showDrinksBtn = document.getElementById('show-drinks');
    const foodList = document.getElementById('food-list');
    const navbar = document.getElementById('navbar');

    const data = {
        "foods": [
            { "name": "Pizza", "image": "../images/pizza.jpeg", "description": "A delicious cheese and tomato pizza." },
            { "name": "Burger", "image": "../images/burger.jpeg", "description": "A juicy beef burger with all the trimmings." },
            { "name": "Sushi", "image": "../images/sushi.jpeg", "description": "Fresh sushi rolls with a variety of fillings." },
            { "name": "Pasta", "image": "../images/pasta.jpeg", "description": "Creamy pasta with a rich and savory sauce." },
            { "name": "Salad", "image": "../images/salad.jpeg", "description": "A healthy salad with fresh greens and vegetables." },
            { "name": "Steak", "image": "../images/steak.jpeg", "description": "Grilled steak cooked to perfection." },
            { "name": "Tacos", "image": "../images/tacos.jpeg", "description": "Tasty tacos with a variety of fillings." },
            { "name": "Ramen", "image": "../images/ramen.jpeg", "description": "Hot and comforting ramen soup." },
            { "name": "Curry", "image": "../images/curry.jpeg", "description": "Spicy and flavorful curry." },
            { "name": "Biryani", "image": "../images/biryani.jpeg", "description": "Aromatic biryani rice with tender meat." }
        ],
        "drinks": [
            { "name": "Coke", "image": "../images/coke.jpeg", "description": "Refreshing cola drink." },
            { "name": "Juice", "image": "../images/juice.jpeg", "description": "Fresh fruit juice." },
            { "name": "Water", "image": "../images/water.jpeg", "description": "Pure and clean water." },
            { "name": "Tea", "image": "../images/tea.jpeg", "description": "A warm cup of tea." },
            { "name": "Coffee", "image": "../images/coffee.jpeg", "description": "A hot cup of coffee." },
            { "name": "Milkshake", "image": "../images/milkshake.jpeg", "description": "A creamy milkshake." },
            { "name": "Smoothie", "image": "../images/smoothie.jpeg", "description": "A healthy fruit smoothie." },
            { "name": "Beer", "image": "../images/beer.jpeg", "description": "A cold beer." },
            { "name": "Wine", "image": "../images/wine.jpeg", "description": "A glass of wine." },
            { "name": "Lemonade", "image": "../images/lemonade.jpeg", "description": "Refreshing lemonade." }
        ]
    };

    function populateSelects() {
        populateSelect('food', data.foods);
        populateSelect('drink', data.drinks);
    }

    if (form) {
        populateSelects();

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const food = document.getElementById('food').value;
            const drink = document.getElementById('drink').value;
            const reason = document.getElementById('reason').value;

            localStorage.setItem('userPreferences', JSON.stringify({ name, address, email, password, food, drink, reason }));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', name);
            window.location.href = 'index.html';
        });
    } else if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userPreferences = JSON.parse(localStorage.getItem('userPreferences'));

            if (userPreferences && userPreferences.email === email && userPreferences.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', userPreferences.name);
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password');
            }
        });
    } else if (orderForm) {
        populateSelects();

        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const orderComplete = document.getElementById('order-complete');
            orderComplete.style.display = 'block';
            orderForm.style.display = 'none';
        });
    } else {
        displayUserPreferences();
        displayWelcomeMessage();
        displayItems('foods');
    }

    if (orderFoodBtn) {
        orderFoodBtn.addEventListener('click', () => {
            window.location.href = 'order_food.html';
        });
    }

    if (showFoodsBtn) {
        showFoodsBtn.addEventListener('click', () => {
            displayItems('foods');
        });
    }

    if (showDrinksBtn) {
        showDrinksBtn.addEventListener('click', () => {
            displayItems('drinks');
        });
    }

    function populateSelect(id, items) {
        const select = document.getElementById(id);
        select.innerHTML = ''; // Clear previous options
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            select.appendChild(option);
        });
    }

    function displayUserPreferences() {
        const userPreferences = JSON.parse(localStorage.getItem('userPreferences'));
        if (userPreferences) {
            displayItems('foods', userPreferences.food, userPreferences.drink, userPreferences.reason);
        }
    }

    function displayItems(type, userFood = '', userDrink = '', userReason = '') {
        const items = data[type];
        const foodList = document.getElementById('food-list');
        foodList.innerHTML = '';

        // Display user's preferred item first
        if (type === 'foods' && userFood) {
            const preferredFood = items.find(item => item.name === userFood);
            if (preferredFood) {
                const user = localStorage.getItem('currentUser');
                foodList.innerHTML += `
                    <div class="food-item">
                        <img src="${preferredFood.image}" alt="${preferredFood.name}">
                        <p>${preferredFood.name}</p>
                        <p>Description: ${preferredFood.description || 'No description available'}</p>
                        <p>${user}'s Preferred Food: ${userReason}</p>
                    </div>
                `;
            }
        } else if (type === 'drinks' && userDrink) {
            const preferredDrink = items.find(item => item.name === userDrink);
            if (preferredDrink) {
                const user = localStorage.getItem('currentUser');
                foodList.innerHTML += `
                    <div class="food-item">
                        <img src="${preferredDrink.image}" alt="${preferredDrink.name}">
                        <p>${preferredDrink.name}</p>
                        <p>Description: ${preferredDrink.description || 'No description available'}</p>
                        <p>${user}'s Preferred Drink: ${userReason}</p>
                    </div>
                `;
            }
        }

        // Display other items
        items.forEach(item => {
            const isUserPreferred = (type === 'foods' && item.name === userFood) || (type === 'drinks' && item.name === userDrink);
            if (!isUserPreferred) {
                foodList.innerHTML += `
                    <div class="food-item">
                        <img src="${item.image}" alt="${item.name}">
                        <p>${item.name}</p>
                        <p>Description: ${item.description || 'No description available'}</p>
                    </div>
                `;
            }
        });
    }

    function displayWelcomeMessage() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        const navbar = document.getElementById('navbar');

        navbar.innerHTML = ''; // Clear existing links
        const welcomeMessage = document.createElement('div');
        welcomeMessage.id = 'welcome-message';

        if (isLoggedIn === 'true' && currentUser) {
            welcomeMessage.textContent = `Welcome, ${currentUser}`;
            navbar.appendChild(welcomeMessage);

            const homeLink = document.createElement('a');
            homeLink.href = "index.html";
            homeLink.textContent = "Home";
            navbar.appendChild(homeLink);

            const aboutLink = document.createElement('a');
            aboutLink.href = "#";
            aboutLink.textContent = "About";
            navbar.appendChild(aboutLink);

            const logoutLink = document.createElement('a');
            logoutLink.href = "#";
            logoutLink.id = "logout-link";
            logoutLink.textContent = "Logout";
            navbar.appendChild(logoutLink);

            logoutLink.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        } else {
            welcomeMessage.textContent = '';
            navbar.appendChild(welcomeMessage);

            const homeLink = document.createElement('a');
            homeLink.href = "index.html";
            homeLink.textContent = "Home";
            navbar.appendChild(homeLink);

            const aboutLink = document.createElement('a');
            aboutLink.href = "#";
            aboutLink.textContent = "About";
            navbar.appendChild(aboutLink);

            const loginLink = document.createElement('a');
            loginLink.href = "login.html";
            loginLink.id = "login-link";
            loginLink.textContent = "Login";
            navbar.appendChild(loginLink);
        }
    }

    // Always call displayWelcomeMessage to update the header on page load
    displayWelcomeMessage();
});
