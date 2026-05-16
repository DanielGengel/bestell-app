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
