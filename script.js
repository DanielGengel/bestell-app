let foodMenu = JSON.parse(localStorage.getItem("foodMenu")) || menuDB;
let customerBasket = JSON.parse(localStorage.getItem("customerBasket")) || [];
const menuSection = document.getElementById("menuSectionID");
const content = document.getElementById("cartContent");
const desktopCart = document.getElementById("desktopCartID");
const mobileCart = document.getElementById("mobileCartID");

// function renderFoodMenu() {
//     menuSection.innerHTML = "";
//     let foodMenuHTML = "";
//     for (let index = 0; index < foodMenu.length; index++) {
//         foodMenuHTML = getCategoryTemplate(index);

//         for (let index2 = 0; index2 < foodMenu[index].items.length; index2++) {
//             foodMenuHTML += getArticleTemplate(index, index2);
//         }
//         menuSection.innerHTML += foodMenuHTML;
//     }

//     addButtonEvents(".btnAddToCart", addToCart);

//     renderCart();
//     restoreBadges(); // in case of browser refresh

// }

function renderFoodMenu() {
    menuSection.innerHTML = "";
    let foodMenuHTML = "";

    for (let categoryIndex = 0; categoryIndex < foodMenu.length; categoryIndex++) {
        const category = foodMenu[categoryIndex];

        foodMenuHTML += getCategoryTemplate(categoryIndex);

        for (let itemIndex = 0; itemIndex < category.items.length; itemIndex++) {
            foodMenuHTML += getArticleTemplate(categoryIndex, itemIndex);
        }
    }
    menuSection.innerHTML = foodMenuHTML;

    addButtonEvents(".btnAddToCart", addToCart);

    renderCart();
    restoreBadges(); // in case of browser refresh
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

    // If Element doesn't exist
    if (!element) {
        return;
    }

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

function renderCart() {
    let cartContentHTML = getShoppingCartTemplateHeader();

    // If cart is empty, show default info
    if (customerBasket.length === 0) {
        cartContentHTML += getShoppingCartDefaultTemplate();
        console.log("customerBasket = empty");
        // changeMobileCartIcon(0);
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
        // mobileCart.showModal();
    } else {
        desktopCart.append(content);
        mobileCart.close();
    }

    // initCartButtons();
    addButtonEvents(".btnAddOneArticle", (id) => changeArticleAmount(id, 1));
    addButtonEvents(".btnRemoveOneArticle", (id) => changeArticleAmount(id, -1));
    addButtonEvents(".btnRemoveAllArticles", (id) => deleteArticle(id));

    const btnCloseMobileCart = document.getElementById("btnCloseMobileCartID");
    btnCloseMobileCart.addEventListener("click", closeMobileCart);

    // const btnBuy = document.getElementById("btnBuyID");
    // btnBuy.addEventListener("click", showOrderConfirmation);

    // Check event delegation for all buttons
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btnBuyID") {
            showOrderConfirmation();
        }
    });
}

// function restoreBadges() {
//     for (let cartItem of customerBasket) {
//         const articleBadge = document.getElementById(`articleBadgeID-${cartItem.articleID}`);

//         if (articleBadge) {
//             // Show badge
//             articleBadge.style.display = "flex";

//             // Restore amount
//             articleBadge.textContent = cartItem.amount;
//         }
//     }
// }

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

    // updateBadges(articleID);
    // saveBasket();
    // renderCart();
    // scrollToCartItem(articleID);

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

// Delete article from basket
function deleteArticle(articleID) {
    for (let i = 0; i < customerBasket.length; i++) {
        if (customerBasket[i].articleID === articleID) {
            customerBasket.splice(i, 1);
        }
    }

    // updateBadges(articleID);
    // saveBasket();
    // renderCart();

    saveBasket();
    renderCart();

    updateArticleBadge(articleID);
    updateMobileCartBadge();
}

function updateArticleBadge(articleID) {
    const articleBadge = document.getElementById(`articleBadgeID-${articleID}`);

    if (!articleBadge) {
        return;
    }

    const cartItem = findCartItem(articleID);

    if (cartItem) {
        articleBadge.style.display = "flex";
        articleBadge.textContent = cartItem.amount;
    } else {
        articleBadge.style.display = "none";
        articleBadge.textContent = 0;
    }
}

function updateMobileCartBadge() {
    const cartIcon = document.getElementById("mobileCartIconID");
    const mobileCartBadge = document.getElementById("mobileCartBadgeID");

    let totalAmount = 0;

    for (let i = 0; i < customerBasket.length; i++) {
        totalAmount += customerBasket[i].amount;
    }

    mobileCartBadge.textContent = totalAmount;

    if (totalAmount > 0) {
        mobileCartBadge.style.display = "flex";
        cartIcon.src = "./assets/icons/mobile-cart-icon-orange.png";
    } else {
        mobileCartBadge.style.display = "none";
        cartIcon.src = "./assets/icons/mobile-cart-icon-white.png";
    }
}

function restoreBadges() {
    for (let i = 0; i < customerBasket.length; i++) {
        updateArticleBadge(customerBasket[i].articleID);
    }

    updateMobileCartBadge();
}

// function updateBadges(articleID) {
//     let articleBadge = document.getElementById(`articleBadgeID-${articleID}`);
//     let mobileCartBadge = document.getElementById("mobileCartBadgeID");
//     let cartItem = findCartItem(articleID);
//     // amountOfArticles = amountOfArticles + customerBasket[i].amount;

//     if (!articleBadge) {
//         return;
//     }

//     if (cartItem) {
//         articleBadge.style.display = "flex";
//         articleBadge.textContent = cartItem.amount;
//     } else {
//         articleBadge.style.display = "none";
//         articleBadge.textContent = 0;
//     }

// }

// function changeMobileCartIcon(numberOfCartItems) {
//     const cartIcon = document.getElementById("mobileCartIconID");

//     if (numberOfCartItems === 0) {
//         console.log("cartIcon.src = ./assets/icons/mobile-cart-icon-white.png;");

//         cartIcon.src = "./assets/icons/mobile-cart-icon-white.png";
//     } else {
//         cartIcon.src = "./assets/icons/mobile-cart-icon-orange.png";
//     }
// }

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

    // updateBadges(articleID);
    // saveBasket();
    // renderCart();

    saveBasket();
    renderCart();

    updateArticleBadge(articleID);
    updateMobileCartBadge();
}

const orderConfirmation = document.getElementById("orderConfirmationID");

function showOrderConfirmation() {
    closeMobileCart();

    console.log("show order confiramtion");

    orderConfirmation.innerHTML = getOrderConfirmationTemplate();
    document.body.style.overflow = "hidden";
    orderConfirmation.showModal();


    // Remove articles and therfore articleBadges
    for (let i = 0; i < customerBasket.length; i++) {
        deleteArticle(customerBasket[i].articleID)
    }

    // delete Array
    // customerBasket.length = 0;
    saveBasket();
    renderCart();
    updateMobileCartBadge();

    // setTimeout(() => {
    //     orderConfirmation.close();
    // }, 3000);
}

// const orderConfirmation = document.getElementById("orderConfirmationID");

// function showOrderConfirmation(event){
//     event?.preventDefault();

//     orderConfirmation.innerHTML = getOrderConfirmationTemplate();

//     document.body.style.overflow = "hidden";

//     orderConfirmation.showModal();

//     // setTimeout(() => {
//     //     orderConfirmation.close();
//     //     document.body.style.overflow = "";
//     // }, 3000);
// }

// orderConfirmation.addEventListener("close", () => {
//     document.body.style.overflow = "";
// });

// Switch between desktop and mobile cart view if window is resized
window.addEventListener("resize", renderCart);

const btnOpenMobileCart = document.getElementById("btnOpenMobileCartID");
btnOpenMobileCart.addEventListener("click", openMobileCart);

function openMobileCart() {
    mobileCart.showModal();
}

function closeMobileCart() {
    mobileCart.close();
}
