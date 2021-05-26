class NavigateInButton {
  constructor(listOfItems, arrayOfItemsDisplayed) {
    this.listOfItems = listOfItems;
    this.arrayOfItemsDisplayed = arrayOfItemsDisplayed;
    this.inputsForSearchArray = [
      ...document.querySelectorAll(".dropDownMenus--input_active_title"),
    ];
    this.chevronArray = [
      ...document.querySelectorAll(".dropDownMenus--input_active_chevron "),
    ];
    this.listOfItemsArray = [...listOfItems.children];

    this.searchThroughItems(this.inputsForSearchArray);
  }

  searchThroughItems(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        if (this.listOfItems.parentNode === input.parentNode) {
          //   this.removeArrayLength(this.arrayOfItemsDisplayed);
          let valueLowCaseAndWithoutAccent = this.normalizeValues(input.value);

          //Ici les diff fonctions appelées lors de la saisie
          this.listOfItemsArray.forEach((li) => {
            li.style.display = "none";
            let titleLowCaseAndWithoutAccent = this.normalizeValues(li.title);
            this.displayItemsWithSameValuesAsEnteredInInput(
              titleLowCaseAndWithoutAccent,
              valueLowCaseAndWithoutAccent,
              li
            );
          });
        }
      });
    });
  }

  normalizeValues(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  displayItemsWithSameValuesAsEnteredInInput(titleOfItems, valueOfInput, li) {
    if (titleOfItems.includes(valueOfInput)) {
      li.style.display = "flex";
      this.arrayOfItemsDisplayed.push(li.title);
    }
  }

  //   removeArrayLength(array) {
  //     array.splice(0, this.arrayOfItemsDisplayed.length);
  //   }
}

export { NavigateInButton };
