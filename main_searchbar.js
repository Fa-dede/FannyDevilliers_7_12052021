import { recipes } from "./JS/datas.js";

class searchBarFactory {
  constructor() {
    this.inputOfMainSearchBar = document.querySelector(".menuNav--searchInput");
    this.messageUnderInput = document.querySelector("#under-input-message");

    this.searchInsideMainSearchBar();
  }

  searchInsideMainSearchBar() {
    this.inputOfMainSearchBar.addEventListener("input", (e) => {
      this.messageUnderInput.style.display = "none";
      this.messageUnderInput.innerHTML = "";
      if (e.target.value.length > 2) {
        this.messageUnderInput.style.display = "block";
        let inputValueNormalize = this.normalizeValues(e.target.value);
        let nameOfRecipe;
        let ingredientOfRecipe;
        let descriptionOfRecipe;
        let ustensilsOfRecipe;
        let applianceOfRecipe;

        recipes.forEach((recipe) => {
          nameOfRecipe = this.normalizeValues(recipe.name);

          recipe.ingredients.forEach((ingredient) => {
            ingredientOfRecipe = this.normalizeValues(ingredient.ingredient);
          });
          descriptionOfRecipe = this.normalizeValues(recipe.description);
          applianceOfRecipe = this.normalizeValues(recipe.appliance);

          recipe.ustensils.forEach((ustensil) => {
            ustensilsOfRecipe = this.normalizeValues(ustensil);
          });

          this.searchInsideRecipes(
            inputValueNormalize,
            nameOfRecipe,
            ingredientOfRecipe,
            applianceOfRecipe,
            ustensilsOfRecipe
          );
        });

        this.addSuggestionToInputByClic();
        this.addErrorMessageUnderInput();
      }
    });
  }

  searchInsideRecipes(inputValue, title, ingredient, appliance, ustensil) {
    if (title.includes(inputValue)) {
      this.displaySuggestion(title);
    } else if (ingredient.includes(inputValue)) {
      this.displaySuggestion(ingredient);
    } else if (appliance.includes(inputValue)) {
      this.displaySuggestion(appliance);
      this.eraseDuplicateNamesInList();
    } else if (ustensil.includes(inputValue)) {
      this.displaySuggestion(ustensil);
      this.eraseDuplicateNamesInList();
    }
  }

  displaySuggestion(value) {
    this.messageUnderInput.innerHTML += `<li class="autocompleteSearch" tabIndex='0'> ${value} </li>`;
  }

  eraseDuplicateNamesInList() {
    let myArray = [...document.querySelectorAll(".autocompleteSearch")];
    for (let i = 0; i < myArray.length; i++) {
      for (let j = i + 1; j < myArray.length; j++) {
        if (myArray[i].innerHTML == myArray[j].innerHTML) {
          myArray[j].remove();
        }
      }
    }
  }

  // showErrorMessage() {
  //   this.messageUnderInput.innerHTML = `<p id = "error-message"> Oups...Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc... </p>`;
  // }

  addSuggestionToInputByClic() {
    let suggestionsValues = [
      ...document.querySelectorAll(".autocompleteSearch"),
    ];
    let input = document.querySelector(".menuNav--searchInput");
    suggestionsValues.forEach((suggestion) => {
      suggestion.addEventListener("click", (e) => {
        input.value = e.target.innerHTML;
        this.messageUnderInput.style.display = "none";
      });
    });
  }

  addErrorMessageUnderInput() {
    console.log(this.messageUnderInput.children);
    if (this.messageUnderInput.children.length < 1) {
      this.messageUnderInput.innerHTML = `<p id = "error-message"> Oups...Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc... </p>`;
    }
  }

  normalizeValues(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}

export { searchBarFactory };
