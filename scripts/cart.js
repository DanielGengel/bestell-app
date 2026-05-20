
function addToCart(articleID) {
    // Find article in menuDB and return object
    let article = findArticleByID(articleID);

    // Doesn't exist...
    if (!article) {
        return;
    }

    // Check if article is already in cart
    let cartItem = findCartItem(articleID);
    if (cartItem) {
        changeArticleAmount(articleID, 1);
    } else {
        createNewCartItem(article);
    }

    saveBasket();
    renderCart();

    updateArticleBadge(articleID);
    updateMobileCartBadge();

    scrollToCartItem(articleID);
}

function findArticleByID(articleID) {
    for (let i = 0; i < foodMenu.length; i++) {
        let category = foodMenu[i];

        for (let j = 0; j < category.items.length; j++) {
            let item = category.items[j];

            if (item.articleID === articleID) {
                return item;
            }
        }
    }
    return null;
}

// Check if article is already in cart
function findCartItem(articleID) {
    for (let i = 0; i < customerBasket.length; i++) {
        let cartItem = customerBasket[i];

        if (cartItem.articleID === articleID) {
            return cartItem;
        }
    }
    return null;
}

// If article not in cart already, add to card
function createNewCartItem(article) {
    customerBasket.push({
        articleID: article.articleID,
        name: article.name,
        singlePrice: article.price,
        amount: 1,
        totalPrice: article.price,
    });
}

// Add or remove one item from specific article (articleID)
// Argument value = plus or minus 1
function changeArticleAmount(articleID, value) {
    let cartItem = findCartItem(articleID);

    if (!cartItem) {
        return;
    }

    cartItem.amount = cartItem.amount + value;
    cartItem.totalPrice = cartItem.amount * cartItem.singlePrice;

    if (cartItem.amount <= 0) {
        deleteArticle(articleID);
    }

    saveBasket();
    renderCart();

    updateArticleBadge(articleID);
    updateMobileCartBadge();
}

// Delete article from basket
function deleteArticle(articleID) {
    for (let i = 0; i < customerBasket.length; i++) {
        if (customerBasket[i].articleID === articleID) {
            customerBasket.splice(i, 1);
        }
    }

    saveBasket();
    renderCart();

    updateArticleBadge(articleID);
    updateMobileCartBadge();
}

function calculateTotals() {
    let subtotal = 0;
    let delivery = 0;
    let amountOfArticles = 0;

    for (let i = 0; i < customerBasket.length; i++) {
        subtotal = subtotal + customerBasket[i].amount * customerBasket[i].singlePrice;
        amountOfArticles = amountOfArticles + customerBasket[i].amount;
    }

    console.log("amountOfArticles = " + amountOfArticles);
    // changeMobileCartIcon(amountOfArticles);

    // Free delivery for orders aboce 50€
    if (subtotal < 50) {
        delivery = 4.99;
    }

    let total = subtotal + delivery;

    return {
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        amountOfArticles: amountOfArticles,
    };
}