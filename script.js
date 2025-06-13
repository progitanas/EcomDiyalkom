// Gestion du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour ajouter un produit au panier
function addToCart(productId, name, price) {
    const product = { id: productId, name: name, price: price, quantity: 1 };
    
    // Vérifier si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex > -1) {
        // Augmenter la quantité si le produit est déjà dans le panier
        cart[existingProductIndex].quantity++;
    } else {
        // Ajouter le nouveau produit
        cart.push(product);
    }
    
    // Sauvegarder dans localStorage
    saveCart();
    
    // Notification
    alert(`${name} a été ajouté au panier!`);
    
    // Mettre à jour le compteur du panier
    updateCartCount();
}

// Sauvegarder le panier dans localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Mettre à jour le compteur d'articles du panier
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Afficher le panier
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    // Vider le conteneur
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Votre panier est vide</p>';
        totalElement.textContent = '0€';
        return;
    }
    
    // Calculer le total
    let total = 0;
    
    // Ajouter chaque article au panier
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Quantité: ${item.quantity}</p>
            </div>
            <div>
                <p>${item.price}€ × ${item.quantity} = ${subtotal}€</p>
                <button onclick="removeFromCart(${item.id})">Supprimer</button>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    // Afficher le total
    totalElement.textContent = `${total}€`;
}

// Supprimer un article du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    updateCartCount();
}

// Valider le formulaire de connexion
function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        alert('Connexion réussie!');
        // Ici vous ajouteriez la logique réelle d'authentification
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

// Valider le formulaire d'inscription
function validateSignupForm(event) {
    event.preventDefault();
    const email = document.getElementById('new_email').value;
    const password = document.getElementById('new_password').value;
    
    // Simple validation
    if (email && password) {
        alert('Inscription réussie!');
        // Ici vous ajouteriez la logique réelle d'inscription
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

// Initialiser la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour le compteur du panier
    updateCartCount();
    
    // Afficher le panier si on est sur la page panier
    if (window.location.pathname.includes('Panier.html')) {
        displayCart();
    }
    
    // Ajouter les écouteurs d'événements pour les formulaires
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', validateSignupForm);
    }
});