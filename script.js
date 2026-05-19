let foodMenu = JSON.parse(localStorage.getItem("foodMenu")) || menuDB;
let customerBasket = JSON.parse(localStorage.getItem("customerBasket")) || [];
const menuSection = document.getElementById("menuSectionID");

function renderFoodMenu() {
    menuSection.innerHTML = "";
    let foodMenuHTML = "";
    for (let index = 0; index < foodMenu.length; index++) {
        foodMenuHTML = getCategoryTemplate(index);

        for (let index2 = 0; index2 < foodMenu[index].items.length; index2++) {
            foodMenuHTML += getArticleTemplate(index, index2);
        }
        menuSection.innerHTML += foodMenuHTML;
    }

    addButtonEvents(".btnAddToCart", addToCart);

    renderCart();
    restoreBadges(); // in case of browser refresh

    // Switch between desktop and mobile cart view if window is resized
    window.addEventListener("resize", renderCart);
}

function addButtonEvents(buttonClass, action) {
    let buttons = document.querySelectorAll(buttonClass);

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let articleID = Number(this.dataset.index);

            action(articleID);
        });
    }
}

function scrollToCartItem(itemId) {
    // TODO: if container is near bottom don't scroll
    const element = document.getElementById(`itemID-${itemId}`);
    console.log("itemID-${itemId} => " + `itemID-${itemId}`);

    element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
    });

    element.classList.add("highlight");
    setTimeout(() => {
        element.classList.remove("highlight");
    }, 1000);
}

const content = document.getElementById("cartContent");
const desktopCart = document.getElementById("desktopCartID");
const mobileCart = document.getElementById("mobileCartID");

function renderCart() {
    let cartContentHTML = getShoppingCartTemplateHeader();

    // If cart is empty, show info
    if (customerBasket.length === 0) {
        cartContentHTML = getShoppingCartDefaultTemplate();
        console.log("customerBasket = empty");
    } else {
        for (let index = 0; index < customerBasket.length; index++) {
            cartContentHTML += getShoppingCartTemplateMain(index);
        }
        const totals = calculateTotals();
        cartContentHTML += getShoppingCartTemplateFooter(totals);
    }

    content.innerHTML = cartContentHTML;

    if (window.innerWidth <= 1024) {
        mobileCart.append(content);
        mobileCart.showModal();
    } else {
        desktopCart.append(content);
        mobileCart.close();
    }

    // initCartButtons();
    addButtonEvents(".btnAddOneArticle", (id) => changeArticleAmount(id, 1));
    addButtonEvents(".btnRemoveOneArticle", (id) => changeArticleAmount(id, -1));
    addButtonEvents(".btnRemoveAllArticles", (id) => deleteArticle(id));
}

function restoreBadges() {
    for (let cartItem of customerBasket) {
        const badge = document.getElementById(`badgeID-${cartItem.articleID}`);

        if (badge) {
            // Show badge
            badge.style.display = "flex";

            // Restore amount
            badge.textContent = cartItem.amount;
        }
    }
}

function calculateTotals() {
    let subtotal = 0;
    let delivery = 0;
    
    for (let i = 0; i < customerBasket.length; i++) {
        subtotal = subtotal + customerBasket[i].amount * customerBasket[i].singlePrice;
    }

    // Free delivery for orders aboce 50€
    if (subtotal < 50) {
        delivery = 4.99;
    }

    let total = subtotal + delivery;

    return {
        subtotal: subtotal,
        delivery: delivery,
        total: total,
    };
}

function addToCart(articleID) {
    // Find article in menuDB and return object
    let article = findArticleByID(articleID);

    // Doesn't exist...
    if (!article) {
        return;
    }

    // Check if article already in cart
    let cartItem = findCartItem(articleID);
    if (cartItem) {
        changeArticleAmount(articleID, 1);
    } else {
        createNewCartItem(article);
    }

    updateBadge(articleID);
    saveBasket();
    renderCart();
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

// Delete article from basket
function deleteArticle(articleID) {
    for (let i = 0; i < customerBasket.length; i++) {
        if (customerBasket[i].articleID === articleID) {
            customerBasket.splice(i, 1);
        }
    }

    updateBadge(articleID);
    saveBasket();
    renderCart();
}

function updateBadge(articleID) {
    let badge = document.getElementById(`badgeID-${articleID}`);

    let cartItem = findCartItem(articleID);

    if (!badge) {
        return;
    }

    if (cartItem) {
        badge.style.display = "flex";
        badge.textContent = cartItem.amount;
    } else {
        badge.style.display = "none";
        badge.textContent = 0;
    }
}

// Update locale storage
function saveBasket() {
    localStorage.setItem("customerBasket", JSON.stringify(customerBasket));
}

// Add or remove one item from specific article (articleID)
// value = plus or minus 1
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

    updateBadge(articleID);
    saveBasket();
    renderCart();
}
