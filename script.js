let foodMenu = JSON.parse(localStorage.getItem("foodMenu")) || menuDB;
const menuSection = document.getElementById("menuSectionID");

const basketArray = [];

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

    // shoppingCartID.showModal()
}



// const dialog = document.querySelector("dialog");

// window.addEventListener("scroll", () => {
//     dialog.classList.toggle("hide", window.scrollY < 620);
//     dialog.classList.toggle("show", window.scrollY > 651);
// });



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

function addToCart(productID) {
    const item = basketArray.find((item) => item.productID === productID);

    if (item) {
        item.quantity++;
    } else {
        basketArray.push({
            productID,
            quantity: 1,
        });
    }

    console.log(basketArray);
}




const content = document.getElementById("cartContent");
const desktop = document.getElementById("desktopCartID");
const mobile = document.getElementById("mobileCartDialogID");

function moveCart(){

content.innerHTML = getShoppingCartTemplate();

    console.log(content);
    
    if(window.innerWidth <= 1024){
        mobile.append(content);
        mobile.showModal();
    }else{
        desktop.append(content);
        mobile.close();
    }
}

moveCart();

window.addEventListener("resize", moveCart);

