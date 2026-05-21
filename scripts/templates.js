// #region CategoryTemplate
function getCategoryTemplate(categoryIndex) {
    return `
        <div id="articleCategoryID-${categoryIndex}" class="articleCategory">
            <header class="articleCategoryHeader">
                <div class="articleCategoryHeaderContent">
                    <img src="${foodMenu[categoryIndex].categoryIcon}" alt="Category Icon for ${foodMenu[categoryIndex].category}" />
                    <h3>${foodMenu[categoryIndex].category}</h3>
                </div>
            </header>
        </div>
    `;
}
// #endregion

// #region ArticleTemplate
function getArticleTemplate(categoryIndex, articleIndex) {
    return `
        <div class="articles">
            <article class="articleCard">
                <img src="./assets/img/${foodMenu[categoryIndex].items[articleIndex].picture}" alt="Picture of ${foodMenu[categoryIndex].items[articleIndex].name}" />
                <div class="articleDescription">
                    <h4>${foodMenu[categoryIndex].items[articleIndex].name}</h4>
                    <p>${foodMenu[categoryIndex].items[articleIndex].description}</p>
                </div>
                <div class="articlePriceAndButton">
                    <h4>${foodMenu[categoryIndex].items[articleIndex].price.toFixed(2)}€</h4>
                    <button class="btnAddToCart" data-index="${foodMenu[categoryIndex].items[articleIndex].articleID}"><p>Add to cart</p></button>
                </div>
                <div class="articleBadge badgeDesign" id="articleBadgeID-${foodMenu[categoryIndex].items[articleIndex].articleID}"></div>
            </article>
        </div>
    `;
}
// #endregion

// #region CartTemplateHeader
function getShoppingCartTemplateHeader() {
    return `
        <section class="cart" id="cartID">
            <button id="btnCloseMobileCartID" class="btnCloseMobileCart">X</button>
            <h2>Your Basket</h2>
            <section class="items" id="itemsID">
    `;
}
// #endregion

// #region CartTemplate Item
function getShoppingCartTemplateByItem(cartItem) {
    return `   
        <article class="item" id="itemID-${cartItem.articleID}">
            <div class="itemHeader">
                <p>${cartItem.amount}x ${cartItem.name}</p>
                <button class="btnRemoveAllArticles" data-index="${cartItem.articleID}">🗑️</button></div>
                <div class="itemFooter">
                    <div class="removeOrAddArticle">
                        <button class="btnRemoveOneArticle" data-index="${cartItem.articleID}">➖</button>
                        ${cartItem.amount}
                        <button class="btnAddOneArticle" data-index="${cartItem.articleID}">➕</button>
                    </div>
                <p><strong>${cartItem.totalPrice.toFixed(2)}€</strong></p>
            </div>
        </article>
    `;
}
// #endregion

// #region CartTemplate Footer
function getShoppingCartTemplateFooter(totals) {
    return `
            </section>
            <section id="summaryID" class="summary">
                <p><span>Subtotal</span><span id="subtotalValue">${totals.subtotal.toFixed(2)}€</span></p>
                <p><span>Delivery (Free from 50€)</span><span id="deliveryValue">${totals.delivery.toFixed(2)}€</span></p>
                <hr />
                <p class="total"><span>Total</span><span id="totalValue">${totals.total.toFixed(2)}€</span></p>
            </section>
            <button id="btnBuyID" class="btnBuy">Buy now (${totals.total.toFixed(2)}€)</button>
        </section>
    `;
}
// #endregion

// #region Default Template
function getShoppingCartDefaultTemplate() {
    return `
                <div class="emptyBasketMessage">
                    <h4>Nothing here yet. Go ahead and choose something delicious!</h4>
                    <img src="./assets/icons/shopping-cart-icon.png" alt="Menu Icon"/>
                </div>
            </section>
    `;
}
// #endregion

// #region Confirmation Template
function getOrderConfirmationTemplate() {
    return `
        <button id="btnCloseOrderConfirmationID" class="btnCloseOrderConfirmation">✕</button>
        <img class="orderConfirmationIcon" src="./assets/icons/delivery-truck-icon.png" alt="Order Icon">
        <h2 class="orderConfirmationTitle">Order confirmed!</h2>
        <p class="orderConfirmationText">Your food is on the way!</p>
    `;
}
// #endregion