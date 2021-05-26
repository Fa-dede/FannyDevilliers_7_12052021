import { recipes } from "./JS/datas.js";
import { searchBarFactory } from "./main_searchbar.js";
import { ButtonListFactory, displayTagAboveMenuNav } from "./menuNav_tags.js";
// import { navIntoButton } from "./button_navigation.js";
import { NavigateInButton } from "./navigation_inside_button.js";
import { displayRecipesFactory } from "./recipes_display.js";

new displayRecipesFactory();

let articlesArray = [...document.querySelectorAll(".recipe")];

new searchBarFactory(articlesArray);

let buttonIngredients = document.querySelector("#container-1_inactive");
let listOfIngredients = document.querySelector(
  ".dropDownMenus--input_active_list_ing"
);
let buttonIngredientExpanded = document.querySelector("#container-1_active");

let buttonAppliance = document.querySelector("#container-2_inactive");
let listOfAppliance = document.querySelector(
  ".dropDownMenus--input_active_list_appliance"
);
let buttonApplianceExpanded = document.querySelector("#container-2_active");

let buttonUstensils = document.querySelector("#container-3_inactive");
let listOfUstensils = document.querySelector(
  ".dropDownMenus--input_active_list_ustensils"
);
let buttonUstensilsExpanded = document.querySelector("#container-3_active");

let arrayOfIngredientsDisplayed = [];
let arrayOfApplianceDisplayed = [];
let arrayOfUstensilsDisplayed = [];

new ButtonListFactory(
  "ingredient",
  buttonIngredients,
  listOfIngredients,
  "ingredients",
  buttonIngredientExpanded,
  arrayOfIngredientsDisplayed,
  "container-1_active"
);

new ButtonListFactory(
  "appliances",
  buttonAppliance,
  listOfAppliance,
  "appliances",
  buttonApplianceExpanded,
  arrayOfApplianceDisplayed,
  "container-2_active"
);

new ButtonListFactory(
  "ustensils",
  buttonUstensils,
  listOfUstensils,
  "ustensils",
  buttonUstensilsExpanded,
  arrayOfUstensilsDisplayed,
  "container-3_active"
);

displayTagAboveMenuNav();

// navIntoButton(
//   listOfIngredients,
//   buttonIngredientExpanded,
//   arrayOfIngredientsDisplayed
// );

// navIntoButton(
//   listOfAppliance,
//   buttonApplianceExpanded,
//   arrayOfApplianceDisplayed
// );
// navIntoButton(
//   listOfUstensils,
//   buttonUstensilsExpanded,
//   arrayOfUstensilsDisplayed
// );

new NavigateInButton(listOfIngredients, arrayOfIngredientsDisplayed);
new NavigateInButton(listOfAppliance, arrayOfApplianceDisplayed);
new NavigateInButton(listOfUstensils, arrayOfUstensilsDisplayed);
