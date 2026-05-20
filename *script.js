





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




const orderConfirmation = document.getElementById("orderConfirmationID");



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


