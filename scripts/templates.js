function getCategoryTemplate(categoryIndex) {
    return `
        <div class="articleCategory">
            <header class="articleCategoryHeader">
                <div class="articleCategoryHeaderContent">
                    <img src="${foodMenu[categoryIndex].categoryIcon}" alt="Category Icon for ${foodMenu[categoryIndex].category}" />
                    <h3>${foodMenu[categoryIndex].category}</h3>
                </div>
            </header>
        </div>
    `;
}

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

function getShoppingCartTemplateHeader() {
    return `
        <section class="cart" id="cartID">
            <button id="btnCloseMobileCartID" class="btnCloseMobileCart">X</button>
            <h2>Your Basket</h2>
            <section class="items" id="itemsID">
    `;
}

// function getShoppingCartTemplate(categoryIndex, articleIndex) {
function getShoppingCartTemplateMain(index) {
    return `   
            <article class="item" id="itemID-${customerBasket[index].articleID}">
                <div class="itemHeader">
                    <p>${customerBasket[index].amount}x ${customerBasket[index].name} </p>
                    <button class="btnRemoveAllArticles" data-index="${customerBasket[index].articleID}">🗑️</button>
                </div>
                <div class="itemFooter">
                    <div class="removeOrAddArticle">
                        <button class="btnRemoveOneArticle" data-index="${customerBasket[index].articleID}">➖</button>
                        ${customerBasket[index].amount}
                        <button class="btnAddOneArticle" data-index="${customerBasket[index].articleID}">➕</button>
                    </div>
                    <p><strong>${customerBasket[index].totalPrice.toFixed(2)}€</strong></p>
                </div>
            </article>   
    `;
}

function getShoppingCartTemplateFooter(totals) {
    return `
            </section>
            <section class="summary">
                <p><span>Subtotal</span><span>${totals.subtotal.toFixed(2)}€</span></p>
                <p><span>Delivery (Free from 50€)</span><span>${totals.delivery.toFixed(2)}€</span></p>
                <hr />
                <p class="total"><span>Total</span><span>${totals.total.toFixed(2)}€</span></p>
            </section>
            <button class="btnBuy">Buy now (${totals.total.toFixed(2)}€)</button>
        </section>
    `;
}

function getShoppingCartDefaultTemplate() {
    return `
                <div class="emptyBasketMessage">
                    <h4>Nothing here yet. Go ahead and choose something delicious!</h4>
                    <img src="./assets/icons/shopping-cart-icon.png" alt="Menu Icon"/>
                </div>
            </section>
    `;
}
