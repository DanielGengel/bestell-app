const menuSection = document.getElementById("menuSectionID");
const content = document.getElementById("cartContent");
const desktopCart = document.getElementById("desktopCartID");
const mobileCart = document.getElementById("mobileCartID");

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

function renderCart() {
    let cartContentHTML = getShoppingCartTemplateHeader();

    // If cart is empty, show default info
    if (customerBasket.length === 0) {
        cartContentHTML += getShoppingCartDefaultTemplate();
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

    // TODO event delegation for all buttons (one function)
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btnBuyID") {
            showOrderConfirmation();
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btnCloseOrderConfirmationID") {
            closeOrderConfirmation();
        }
    });
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
