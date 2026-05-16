function getCategoryTemplate(index) {
    return `
        <div class="articleCategory">
            <header class="articleCategoryHeader">
                <div class="articleCategoryHeaderContent">
                    <img src="${foodMenu[index].categoryIcon}" alt="Category Icon for ${foodMenu[index].category}" />
                    <h3>${foodMenu[index].category}</h3>
                </div>
            </header>
        </div>
    `;
}


function getArticleTemplate(index, index2) {
    return `
        <div class="articles">
            <article class="articleCard">
                <img src="./assets/img/${foodMenu[index].items[index2].picture}" alt="Picture of ${foodMenu[index].items[index2].name}" />
                <div class="articleDescription">
                    <h4>${foodMenu[index].items[index2].name}</h4>
                    <p>${foodMenu[index].items[index2].description}</p>
                </div>
                <div class="articlePriceAndButton">
                    <h4>${foodMenu[index].items[index2].price.toFixed(2)}€</h4>
                    <button><p>Add to basket</p></button>
                </div>
            </article>
        </div>
    `;
}
