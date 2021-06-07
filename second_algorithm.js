import { normalizeValues } from "./reusables-functions.js";
import { recipes } from "./JS/datas.js";

//SECOND ALGORITHME
const searchAlgo2 = (inputValue) => {
  let recipesDOM = [...document.querySelectorAll(".recipe")];

  //Supprime les recettes dans le DOM
  recipesDOM.forEach((recipe) => {
    recipe.classList.add("hidden");
  });

  //Normalise les caractères de la saisie dans l'iput
  inputValue = normalizeValues(inputValue);

  //Normalise les caractères des items dans les recettes
  recipes.forEach((recipe) => {
    recipe.name = normalizeValues(recipe.name);
    recipe.appliance = normalizeValues(recipe.appliance);
    recipe.ingredients.forEach((elt) => {
      elt.ingredient = normalizeValues(elt.ingredient);
      searchInsideRecipes(elt.ingredient, inputValue, recipesDOM);
    });
    recipe.ustensils.forEach((ustensil) => {
      ustensil = normalizeValues(ustensil);
      searchInsideRecipes(ustensil, inputValue, recipesDOM);
    });

    searchInsideRecipes(recipe.name, inputValue, recipesDOM);
    searchInsideRecipes(recipe.appliance, inputValue, recipesDOM);
  });
};

const searchInsideRecipes = (value, inputValue, recipesDOM) => {
  if (value.includes(inputValue)) {
    recipesDOM.forEach((recipeInDom) => {
      let recipeFooter =
        recipeInDom.firstChild.nextElementSibling.nextElementSibling;
      let footerValuesNorm = normalizeValues(recipeFooter.innerHTML);
      if (footerValuesNorm.includes(value)) {
        recipeInDom.classList.remove("hidden");
      }
    });
  }
};

export { searchAlgo2 };
