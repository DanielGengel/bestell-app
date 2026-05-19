let foodMenu = JSON.parse(localStorage.getItem("foodMenu")) || menuDB;
let customerBasket = JSON.parse(localStorage.getItem("customerBasket")) || [];
// let customerSubtotal = JSON.parse(localStorage.getItem("customerSubtotal")) || [];
// let subTotal = 0;
const menuSection = document.getElementById("menuSectionID");

function renderFoodMenu() {
    menuSection.innerHTML = "";
    let foodMenuHTML = "";
    for (let index = 0; index < foodMenu.length; index++) {
        // console.log("---------> Category = " + foodMenu[index].category);
        foodMenuHTML = getCategoryTemplate(index);

        for (let index2 = 0; index2 < foodMenu[index].items.length; index2++) {
            // console.log("./assets/img/" + foodMenu[index].items[index2].picture);
            // console.log(foodMenu[index].items[index2].name);
            // console.log(foodMenu[index].items[index2].description);
            // console.log(foodMenu[index].items[index2].price);
            foodMenuHTML += getArticleTemplate(index, index2);
        }
        menuSection.innerHTML += foodMenuHTML;
    }

    addEventsToButtons(".btnAddToCart", addToCart);

    renderCart();
    restoreBadges(); // in case of browser refresh

}

function addEventsToButtons(buttonClass, functionToRun) {
    const buttons = document.querySelectorAll(buttonClass);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            event.stopPropagation();
            const index = Number(buttons[i].dataset.index.trim());
            functionToRun(index);
        });
    }
}

// function addToCart(productID) {
//     const item = basketArray.find((item) => item.productID === productID);

//     if (item) {
//         item.quantity++;

//     } else {
//         basketArray.push({
//             productID,
//             quantity: 1,
//         });
//     }

//     console.log(basketArray);
// }

// basketArray
// let cart = [];

function addToCart(articleID) {
    // Find choosen article in menuDB
    let foundItem = null;

    for (let category of foodMenu) {
        for (let item of category.items) {
            if (item.articleID === articleID) {
                foundItem = item;
            }
        }
    }
    const badge = document.getElementById(`badgeID-${foundItem.articleID}`);
    // Check if article is already in Cart
    let existingCartItem = null;

    for (let cartItem of customerBasket) {
        if (cartItem.articleID === articleID) {
            existingCartItem = cartItem;
        }
    }

    // Article is already in cart -> update amount and totalPrice
    if (existingCartItem) {
        existingCartItem.amount++;
        existingCartItem.totalPrice = existingCartItem.amount * existingCartItem.singlePrice;
        //  renderCart();
        // scrollToCartItem(foundItem.articleID);
        // console.log(foundItem.articleID);
        badge.textContent = existingCartItem.amount;
    }

    // Article not in cart yet, add...
    else {
        customerBasket.push({
            articleID: foundItem.articleID,
            name: foundItem.name,
            singlePrice: foundItem.price,
            amount: 1,
            totalPrice: foundItem.price,
        });
        badge.textContent = 1;
        //  renderCart();
        // scrollCartToBottom();
    }
    // Update local storage
    localStorage.setItem("customerBasket", JSON.stringify(customerBasket));



    badge.style.display = "flex";

    renderCart();
    scrollToCartItem(foundItem.articleID);
    console.log(foundItem.articleID);
}

// // TODO: Save sumTotal to local storage
// function updateCustomerReceipt() {
//     for (let index = 0; index < customerBasket.length; index++) {
//         console.log(customerBasket[index].totalPrice);
//         subTotal += customerBasket[index].totalPrice;
//     }
// }

// function scrollCartToBottom() {
//     const cart = document.querySelector(".items");

//     // TODO: if container is near bottom dont scroll
//     // const isNearBottom =
//     // cart.scrollTop + cart.clientHeight >=
//     // cart.scrollHeight - 50;

//     cart.scrollTop = cart.scrollHeight;
// }

function scrollToCartItem(itemId) {
    // TODO: if container is near bottom dont scroll
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
}

// Switch between desktop and mobile cart view if window is resized
window.addEventListener("resize", renderCart);

// function updateLocalStorage() {
//     localStorage.setItem("foodMenu", JSON.stringify(foodMenu));
// }

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

    const subtotal = customerBasket.reduce(
        (sum, item) => sum + (item.amount * item.singlePrice),
        0
    );

    const delivery = subtotal > 0 ? 4.99 : 0;

    const total = subtotal + delivery;

    return {
        subtotal,
        delivery,
        total
    };
}
