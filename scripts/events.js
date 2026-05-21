// TODO event delegation for all buttons (one function)

// #region init Events
function initEvents() {
    window.addEventListener("resize", renderCart);

    // Static button in mobile navMenu
    const btnOpenMobileCart = document.getElementById("btnOpenMobileCartID");
    btnOpenMobileCart.addEventListener("click", openMobileCart);

    // Dynamic buttons in cart, not available at first render
    // Close mobile cart
    document.addEventListener("click", (event) => {
        if (event.target?.id === "btnCloseMobileCartID") {
            closeMobileCart();
        }

        // Buy Button
        if (event.target?.id === "btnBuyID") {
            showOrderConfirmation();
        }

        // Close order confirmation
        if (event.target?.id === "btnCloseOrderConfirmationID") {
            closeOrderConfirmation();
        }

        // Add one article item to cart
        const addButton = event.target.closest(".btnAddOneArticle");
        if (addButton) {
            const articleID = Number(addButton.dataset.index);

            changeArticleAmount(articleID, 1);
            return;
        }

        // Remove one article item from cart
        const removeButton = event.target.closest(".btnRemoveOneArticle");
        if (removeButton) {
            const articleID = Number(removeButton.dataset.index);

            changeArticleAmount(articleID, -1);
            return;
        }

        // Delete all articles of one item
        const deleteButton = event.target.closest(".btnRemoveAllArticles");
        if (deleteButton) {
            const articleID = Number(deleteButton.dataset.index);

            deleteArticle(articleID);
        }
    });
}
// #endregion

// #region add Events to buttons
// TODO Remove after all buttons event delegation
function addButtonEvents(buttonClass, action) {
    let buttons = document.querySelectorAll(buttonClass);

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let articleID = Number(this.dataset.index);

            action(articleID);
        });
    }
}
// #endregion

// #region Order Confirmation Dialog
const orderConfirmation = document.getElementById("orderConfirmationID");
function showOrderConfirmation() {
    closeMobileCart();
    orderConfirmation.innerHTML = getOrderConfirmationTemplate();
    document.body.style.overflow = "hidden";
    orderConfirmation.showModal();

    // Delete all articles after confirming order
    clearCart();
}

function closeOrderConfirmation() {
    orderConfirmation.close();
    document.body.style.overflow = "";
}
// #endregion

// #region self explanatory...
function openMobileCart() {
    document.body.style.overflow = "hidden";
    mobileCart.showModal();
}

function closeMobileCart() {
    document.body.style.overflow = "";
    mobileCart.close();
}
// #endregion
