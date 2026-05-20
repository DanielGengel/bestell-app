function saveBasket() {
    localStorage.setItem("customerBasket", JSON.stringify(customerBasket));
}