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
            </article>
        </div>
    `;
}

function getShoppingCartTemplateHeader() {
return `
        <section class="cart" id="cartID">
            <button class="close">×</button>
            <h2>Your Basket</h2>
            <section class="items" id="itemsID">
    `;
}

// function getShoppingCartTemplate(categoryIndex, articleIndex) {
function getShoppingCartTemplateMain(index) {
    return `   
            <article class="item">
                <div>
                    <strong>${customerBasket[index].amount} ${customerBasket[index].name} </strong>
                    <p>- ${customerBasket[index].amount} +</p>
                </div>
                <strong>${customerBasket[index].totalPrice.toFixed(2)}€</strong>
            </article>   
    `;
}

function getShoppingCartTemplateFooter() {
    return `
            </section>
            <section class="summary">
                <p><span>Subtotal</span><span>${subTotal}</span></p>
                <p><span>Delivery</span><span>4,99€</span></p>
                <hr />
                <p class="total"><span>Total</span><span>${subTotal}+4,99</span></p>
            </section>
            <button class="btnBuy">Buy now (${subTotal})</button>
        </section>
    `;
}



function getShoppingCartDefaultTemplate() {
    return `
            <section class="cart">
                <button class="close">×</button>
                <h2>Your Basket</h2>
                <h3>bkabkabla</h2>
            </section>
    `;
}



