import { normalizeValues } from "./reusables-functions.js";
import { recipes } from "./JS/datas.js";

//SECOND ALGORITHME
const searchAlgo2 = (articles, inputValue) => {
  // //Supprime les recettes dans le DOM
  articles.forEach((recipe) => {
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
      searchInsideRecipes(elt.ingredient, inputValue, articles);
    });
    recipe.ustensils.forEach((ustensil) => {
      ustensil = normalizeValues(ustensil);
      searchInsideRecipes(ustensil, inputValue, articles);
    });

    searchInsideRecipes(recipe.name, inputValue, articles);
    searchInsideRecipes(recipe.appliance, inputValue, articles);
  });
};

const searchInsideRecipes = (value, inputValue, articles) => {
  if (value.includes(inputValue)) {
    articles.forEach((recipeInDom) => {
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
