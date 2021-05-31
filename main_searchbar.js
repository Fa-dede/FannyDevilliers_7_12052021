import { recipes } from "./JS/datas.js";
import { MainSearchFactory } from "./search_inside_mainSearchBar.js";
import { normalizeValues } from "./function_normalizeValue.js";
import { refreshRecipes } from "./refresh_items.js";

// AUTOCOMPLETION

class searchBarFactory {
  constructor(articlesArray) {
    this.inputOfMainSearchBar = document.querySelector(".menuNav--searchInput");
    this.messageUnderInput = document.querySelector("#under-input-message");
    this.articlesArray = articlesArray;

    this.searchInsideMainSearchBar(this.inputOfMainSearchBar);

    new MainSearchFactory(this.inputOfMainSearchBar, this.articlesArray);
  }

  searchInsideMainSearchBar(input) {
    input.addEventListener("input", (e) => {
      if (input.value.length < 1) {
        this.articlesArray.forEach((article) => {
          article.classList.remove("hidden");
        });
      }

      let errorMessage = document.querySelector("#error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
      this.messageUnderInput.style.display = "none";
      this.messageUnderInput.innerHTML = "";
      if (e.target.value.length > 2) {
        this.messageUnderInput.style.display = "block";
        let inputValueNormalize = normalizeValues(e.target.value);
        let nameOfRecipe;
        let ingredientOfRecipe;
        let descriptionOfRecipe;
        let ustensilsOfRecipe;
        let applianceOfRecipe;

        recipes.forEach((recipe) => {
          nameOfRecipe = normalizeValues(recipe.name);

          recipe.ingredients.forEach((ingredient) => {
            ingredientOfRecipe = normalizeValues(ingredient.ingredient);
          });
          descriptionOfRecipe = normalizeValues(recipe.description);
          applianceOfRecipe = normalizeValues(recipe.appliance);

          recipe.ustensils.forEach((ustensil) => {
            ustensilsOfRecipe = normalizeValues(ustensil);
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
        removeSpaceUnderInput(this.messageUnderInput);
      }
    });
  }

  searchInsideRecipes(inputValue, title, ingredient, appliance, ustensil) {
    if (
      title.includes(inputValue) ||
      ingredient.includes(inputValue) ||
      appliance.includes(inputValue) ||
      ustensil.includes(inputValue)
    ) {
      if (title.includes(inputValue)) {
        this.displaySuggestion(title);
      }
      if (ingredient.includes(inputValue)) {
        this.displaySuggestion(ingredient);
        this.eraseDuplicateNamesInList(ingredient);
      }
      if (appliance.includes(inputValue)) {
        this.displaySuggestion(appliance);
        this.eraseDuplicateNamesInList();
      }
      if (ustensil.includes(inputValue)) {
        this.displaySuggestion(ustensil);
        this.eraseDuplicateNamesInList();
      }
    }
  }

  displaySuggestion(value) {
    this.messageUnderInput.innerHTML += `<li class="autocompleteSearch" tabIndex='0'> ${value} </li>`;
    //créer un tableau et à la fin afficher les données
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
        input.focus();
        this.messageUnderInput.style.display = "none";
        let restArticles = [];
        restArticles.splice(0, restArticles.length);
        refreshRecipes(this.articlesArray, restArticles, input.value);
      });
    });
  }
}

export { searchBarFactory };

const removeSpaceUnderInput = (messageUnderInput) => {
  if (messageUnderInput.children.length < 1) {
    messageUnderInput.style.display = "none";
  }
};

export { removeSpaceUnderInput };
