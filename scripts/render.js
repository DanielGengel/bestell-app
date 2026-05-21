const menuSection = document.getElementById("menuSectionID");
const content = document.getElementById("cartContent");
const desktopCart = document.getElementById("desktopCartID");
const mobileCart = document.getElementById("mobileCartID");

// #region renderFoodMenu
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

    // TODO: add to event delegation
    addButtonEvents(".btnAddToCart", addToCart);
    renderCart();
    restoreBadges(); // in case of browser refresh
}
// #endregion

// #region renderCart
function renderCart() {
    let cartContentHTML = getShoppingCartTemplateHeader();

    // If cart is empty, show default info
    if (customerBasket.length === 0) {
        cartContentHTML += getShoppingCartDefaultTemplate();
    } else {
        for (let index = 0; index < customerBasket.length; index++) {
            // cartContentHTML += getShoppingCartTemplateMain(index);
            cartContentHTML += getShoppingCartTemplateByItem(customerBasket[index]);
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
}
// #endregion

// #region UpdateCartItem
function updateCartItem(articleID) {
    let cartItem = findCartItem(articleID);

    // If item was deleted, remove item from view
    if (!cartItem) {
        let itemElement = document.getElementById(`itemID-${articleID}`);

        if (itemElement) {
            itemElement.remove();
        }
        return;
    }
    // Render item
    let itemElement = document.getElementById(`itemID-${articleID}`);

    if (itemElement) {
        itemElement.outerHTML = getShoppingCartTemplateByItem(cartItem);
    }
}
// #endregion

// #region updateCartFooter
function updateCartFooter() {
    const totals = calculateTotals();

    document.getElementById("subtotalValue").innerText = totals.subtotal.toFixed(2) + "€";
    document.getElementById("deliveryValue").innerText = totals.delivery.toFixed(2) + "€";
    document.getElementById("totalValue").innerText = totals.total.toFixed(2) + "€";

    document.getElementById("btnBuyID").innerText = `Buy now (${totals.total.toFixed(2)}€)`;
}
// #endregion

// #region scrollToCartItem
function scrollToCartItem(itemId) {
    const element = document.getElementById(`itemID-${itemId}`);

    // If Element doesn't exist
    if (!element) {
        return;
    }

    // Scroll to added or updated item
    element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
    });

    // Higlight added or updatet item in cart
    element.classList.add("highlight");
    setTimeout(() => {
        element.classList.remove("highlight");
    }, 1000);
}
// #endregion

// #region updateArticleBadge
// Badge shows number of items added in FoodMenu
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
// #endregion

// #region updateMobileCartBadge
// Badge shows sum of all items added to cart (Location: mobile footer navBar cart icon)
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
// #endregion

// #region restoreBadges
// Browser refresh
function restoreBadges() {
    for (let i = 0; i < customerBasket.length; i++) {
        updateArticleBadge(customerBasket[i].articleID);
    }
    updateMobileCartBadge();
}
// #endregion

// #region resetAllArticleBadges
// When items are orderd remove all badges from FoodMenu
function resetAllArticleBadges() {
    const badges = document.querySelectorAll(".articleBadge");

    badges.forEach((badge) => {
        badge.innerText = "";
        badge.style.display = "none";
    });
}
// #endregion
