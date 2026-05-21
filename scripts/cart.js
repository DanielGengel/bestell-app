// #region add items to cart 
function addToCart(articleID) {
    // Find article in menuDB and return object
    let objArticle = findArticleByID(articleID);

    // Doesn't exist...
    if (!objArticle) {
        return;
    }

    // Check if article is already in cart
    let cartItem = findCartItem(articleID);
    if (cartItem) {
        changeArticleAmount(articleID, 1);
    } else {
        createNewCartItem(objArticle);
        saveBasket();
        renderCart();
    }

    updateArticleBadge(articleID);
    updateMobileCartBadge();
    scrollToCartItem(articleID);
}
// #endregion

// #region Find article by ID
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
// #endregion

// #region Check if item is in cart alreday
function findCartItem(articleID) {
    for (let i = 0; i < customerBasket.length; i++) {
        let cartItem = customerBasket[i];

        if (cartItem.articleID === articleID) {
            return cartItem;
        }
    }
    return null;
}
// #endregion

// #region Create new item
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
// #endregion

// #region Change article amount +/-
// Add or remove one item from specific article (articleID)
// Argument value => plus 1 or minus 1
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
    updateCartItem(articleID);
    updateCartFooter();

    updateArticleBadge(articleID);
    updateMobileCartBadge();
}
// #endregion

// #region Delete complete article from basket
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
// #endregion

// #region "delete order"
// When order submitted clear cart
function clearCart() {
    customerBasket = [];

    saveBasket();
    renderCart();
    resetAllArticleBadges();
    updateMobileCartBadge();
}
// #endregion

// #region Calculate order price
function calculateTotals() {
    let subtotal = 0;
    let delivery = 0;
    let amountOfArticles = 0;

    for (let i = 0; i < customerBasket.length; i++) {
        subtotal = subtotal + customerBasket[i].amount * customerBasket[i].singlePrice;
        amountOfArticles = amountOfArticles + customerBasket[i].amount;
    }

    // Free delivery for orders above 50€
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
// #endregion