import {
  normalizeValues,
  changeDropDownMenusCssWidth,
  createMessageIfNoItemsRemainings,
} from "./reusables-functions.js";
class NavigateInButton {
  constructor(listOfItems, articles) {
    this.listOfItems = listOfItems;
    // console.log(this.listOfItems);
    this.articles = articles;

    this.inputsForSearchArray = [
      ...document.querySelectorAll(".dropDownMenus--input_active_title"),
    ];
    this.chevronArray = [
      ...document.querySelectorAll(".dropDownMenus--input_active_chevron "),
    ];
    this.listOfItemsArray = [...listOfItems.children];

    this.searchThroughItems(this.inputsForSearchArray);

    // this.listOfItemsArray.forEach((li) => {
    //   li.classList.remove("erase-temporarly");
    // });
  }

  searchThroughItems(inputs) {
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        if (this.listOfItems.parentNode === input.parentNode) {
          let valueLowCaseAndWithoutAccent = normalizeValues(input.value);

          this.listOfItemsArray.forEach((li) => {
            //Supprime temporairement les éléments restants de la liste des tags affinée
            if (li.className !== "name-of-item hidden") {
              li.classList.add("erase-temporarly");
            }

            let titleLowCaseAndWithoutAccent = normalizeValues(li.title);
            //Affiche les items avec la même valeur que la saisie entrée dans l'input
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

  //Affiche les items dans la liste déroulante qui ont la même valeur que la saisie
  displayItemsWithSameValuesAsEnteredInInput(titleOfItems, valueOfInput, li) {
    if (li.className === "name-of-item erase-temporarly") {
      if (titleOfItems.includes(valueOfInput)) {
        li.classList.remove("erase-temporarly");
      }

      changeDropDownMenusCssWidth();
    }
  }
}

export { NavigateInButton };
