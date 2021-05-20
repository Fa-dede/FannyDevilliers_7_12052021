import { recipes } from "./JS/datas.js";
import {
  ButtonListFactory,
  displayTagAboveMenuNav,
  closeTagAboveMenuNav,
} from "./menuNav_tags.js";

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

new ButtonListFactory(
  "ingredient",
  buttonIngredients,
  listOfIngredients,
  "ingredients",
  buttonIngredientExpanded
);

new ButtonListFactory(
  "appliances",
  buttonAppliance,
  listOfAppliance,
  "appliances",
  buttonApplianceExpanded
);

new ButtonListFactory(
  "ustensils",
  buttonUstensils,
  listOfUstensils,
  "ustensils",
  buttonUstensilsExpanded
);

displayTagAboveMenuNav();
