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

// function getShoppingCartTemplate(categoryIndex, articleIndex) {
function getShoppingCartTemplate() {
    return `
        <section id="cartContent">
                <section class="cart">
                    <button class="close">×</button>
                    <h2>Your Basket</h2>

                    <section class="items">
                        <article class="item">
                            <div>
                                <strong>1 × Veggie burgerxxx</strong>
                                <p>🗑 1+</p>
                            </div>
                            <strong>160,90€</strong>
                        </article>

                        <article class="item">
                            <div>
                                <strong>1 × Pizzzzzzza</strong>
                                <p>🗑 2+</p>
                            </div>
                            <strong>111,90€</strong>
                        </article>

                        <article class="item">
                            <div>
                                <strong>1 × Salad</strong>
                                <p>🗑 3+</p>
                            </div>
                            <strong>70,90€</strong>
                        </article>
                    </section>

                    <section class="summary">
                        <p><span>Subtotal</span><span>360,70€</span></p>
                        <p><span>Delivery</span><span>4,99€</span></p>
                        <hr />
                        <p class="total"><span>Total</span><span>41,69€</span></p>
                    </section>

                    <button class="buy">Buy now (41,69€)</button>
                </section>
            </section>
    `;
}
