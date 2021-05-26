import { recipes } from "./JS/datas.js";
import { MainSearchFactory } from "./search_inside_mainSearchBar.js";

class searchBarFactory {
  constructor(articlesArray) {
    this.inputOfMainSearchBar = document.querySelector(".menuNav--searchInput");
    this.messageUnderInput = document.querySelector("#under-input-message");
    this.articlesArray = articlesArray;

    this.searchInsideMainSearchBar();
    new MainSearchFactory(this.inputOfMainSearchBar, this.articlesArray);
  }

  searchInsideMainSearchBar() {
    this.inputOfMainSearchBar.addEventListener("input", (e) => {
      this.articlesArray.forEach((article) => {
        article.style.display = "flex";
      });
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
        this.removeSpaceUnderInput();
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

  addSuggestionToInputByClic() {
    let suggestionsValues = [
      ...document.querySelectorAll(".autocompleteSearch"),
    ];
    let input = document.querySelector(".menuNav--searchInput");
    suggestionsValues.forEach((suggestion) => {
      suggestion.addEventListener("click", (e) => {
        input.value = e.target.innerHTML;
        input.value = input.value.trim(); //supprime les espaces au début et à la fin de la chaîne de caractère
        this.messageUnderInput.style.display = "none";
      });
    });
  }

  removeSpaceUnderInput() {
    if (this.messageUnderInput.children.length < 1) {
      this.messageUnderInput.style.display = "none";
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
