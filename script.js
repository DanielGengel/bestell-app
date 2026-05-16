let foodMenu = JSON.parse(localStorage.getItem("foodMenu")) || menuDB;
const menuSection = document.getElementById("menuSectionID");

function renderFoodMenu() {
    menuSection.innerHTML = "";
    let foodMenuHTML = "";
    for (let index = 0; index < foodMenu.length; index++) {
        console.log("---------> Category = " + foodMenu[index].category);
        foodMenuHTML = getCategoryTemplate(index);



        for (let index2 = 0; index2 < foodMenu[index].items.length; index2++) {
            console.log("./assets/img/" + foodMenu[index].items[index2].picture);
            console.log(foodMenu[index].items[index2].name);
            console.log(foodMenu[index].items[index2].description);
            console.log(foodMenu[index].items[index2].price);
            foodMenuHTML += getArticleTemplate(index, index2);
        }

        menuSection.innerHTML += foodMenuHTML;

        // bookHTML = getMainTemplate(index);
        // if (books[index].comments.length === 0) {
        //     bookHTML += getNoCommentsTemplate();
        // } else {
        //     for (let index2 = 0; index2 < books[index].comments.length; index2++) {
        //         bookHTML += getCommentsTemplate(index, index2);
        //     }
        // }
        // bookHTML += getCommentInputTemplate(index);
        // container.innerHTML += bookHTML;
    }

    // addEventsToButtons(".btnAddComment", addComment);
    // addEventsToButtons(".btnLikeUnlike", addLikeOrUnlike);
}

// function addEventsToButtons(buttonClass, functionToRun) {
//     const buttons = document.querySelectorAll(buttonClass);
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].addEventListener("click", function (event) {
//             event.stopPropagation();
//             const index = buttons[i].dataset.index;
//             functionToRun(index);
//         });
//     }
// }
