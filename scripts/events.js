function initEvents() {
    const btnOpenMobileCart = document.getElementById("btnOpenMobileCartID");
    btnOpenMobileCart.addEventListener("click", openMobileCart);

    window.addEventListener("resize", renderCart);

    document.addEventListener("click", (e) => {
        if (e.target?.id === "btnBuyID") {
            showOrderConfirmation();
        }
    });
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

    saveBasket();
    renderCart();
    updateMobileCartBadge();
}

function openMobileCart() {
    document.body.style.overflow = "hidden";
    mobileCart.showModal();
}

function closeMobileCart() {
    document.body.style.overflow = "";
    mobileCart.close();
}


function closeOrderConfirmation() {
    orderConfirmation.close();
    document.body.style.overflow = "";
}

