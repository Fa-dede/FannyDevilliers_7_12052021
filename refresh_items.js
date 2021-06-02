import { normalizeValues } from "./function_normalizeValue.js";
import { recipes } from "./JS/datas.js";
//ALGO DE RECHERCHE 1
const refreshRecipes = (articles, restArticles, input) => {
  searchAlgo1(articles, input);

  returnDisplayedArticles(restArticles, articles);
  refreshDropDownMenus(restArticles);
};

const returnDisplayedArticles = (restArticles, articles) => {
  articles.forEach((article) => {
    if (article.className !== "recipe hidden") {
      restArticles.push(article);
    }
  });
};

// ACTUALISE LES DROPDOWN MENUS

const refreshDropDownMenus = (restArticles) => {
  eraseAllTags();
  let items = [...document.querySelectorAll(".name-of-item")];
  displayCorrespondantTagsOnly(restArticles, items);
  eraseValuesAlreadySelected(items);
};

const eraseAllTags = () => {
  let items = [...document.querySelectorAll(".name-of-item")];
  items.forEach((item) => {
    item.classList.add("hidden");
  });
};

const displayCorrespondantTagsOnly = (restArticles, items) => {
  let nameOfItem;

  //Refresh Tags that correspond to the recipes filters remaining
  restArticles.forEach((article) => {
    let infos =
      article.firstChild.nextElementSibling.nextElementSibling.innerHTML;
    infos = normalizeValues(infos);
    items.forEach((item) => {
      nameOfItem = item.innerHTML;
      nameOfItem = normalizeValues(nameOfItem).trim();
      if (infos.includes(nameOfItem)) {
        item.classList.remove("hidden");
      }
    });
  });
};

const eraseValuesAlreadySelected = (items) => {
  let selectedButtons = [
    ...document.querySelectorAll(".menuNav--buttonTagSelected"),
  ];
  let inputValue = document.querySelector(".menuNav--searchInput").value;
  inputValue = normalizeValues(inputValue);
  let nameOfItem;
  items.forEach((item) => {
    nameOfItem = normalizeValues(item.innerHTML).trim();
    if (nameOfItem === inputValue) {
      item.classList.add("hidden");
    }
  });

  selectedButtons.forEach((button) => {
    let buttonName = button.firstChild.nextElementSibling.innerText;
    buttonName = normalizeValues(buttonName);
    items.forEach((item) => {
      nameOfItem = item.innerHTML;
      nameOfItem = normalizeValues(nameOfItem).trim();
      if (nameOfItem === buttonName) {
        item.classList.add("hidden");
      }
    });

    //create end message of searching
    // let ul = [
    //   ...document.querySelectorAll(".dropDownMenus--input_active_list"),
    // ];
    // ul.forEach((ul) => {
    //   if (ul.innerText == "") {
    //     let p = document.createElement("p");
    //     p.innerHTML = `<p class = 'end-message-tags'> Il n'y a plus rien à afficher dans cette section </p>`;
    //     ul.appendChild(p);
    //   } else {
    //     let message = ul.querySelector(".end-message-tags");
    //     if (message) {
    //       message.remove();
    //     }
    //   }
    // });
  });
};

const createMessageIfNoItemsRemainings = () => {
  let ul = [...document.querySelectorAll(".dropDownMenus--input_active_list")];
  console.log(ul);
};

const refreshElementAfterRemoveTags = (restArticles) => {
  let articles = [...document.querySelectorAll(".recipe")];
  let buttons = [...document.querySelectorAll(".menuNav--buttonTagSelected")];

  buttons.forEach((button) => {
    let buttonValue = normalizeValues(button.innerText);
    articles.forEach((article) => {
      article.classList.remove("hidden");
    });
  });

  refreshRecipesAfterRemovingTags(articles, restArticles, buttons);

  // Affiche l'intégralité des recettes si il n'y a plus de tags et que l'input est vide
  let input = document.querySelector(".menuNav--searchInput");
  if (buttons.length < 1 && !input.value) {
    // Faire le comportement si l'input est vide et s'il est rempli
    articles.forEach((article) => {
      article.classList.remove("hidden");
    });
    let items = [...document.querySelectorAll(".name-of-item")];
    items.forEach((item) => {
      item.classList.remove("hidden");
    });
  }

  createMessageIfNoItemsRemainings();
};

const refreshRecipesAfterRemovingTags = (articles, restArticles, buttons) => {
  articles.forEach((article) => {
    let articleFooter =
      article.firstChild.nextElementSibling.nextElementSibling;
    let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
    buttons.forEach((button) => {
      let buttonValueNorm = normalizeValues(button.innerText);
      if (!footerValuesNorm.includes(buttonValueNorm)) {
        article.classList.add("hidden");
      }
    });
  });
  returnDisplayedArticles(restArticles, articles);
  refreshDropDownMenus(restArticles);
};

const searchAlgo1 = (articles, input) => {
  articles.forEach((article) => {
    let articleFooter =
      article.firstChild.nextElementSibling.nextElementSibling;
    let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
    let inputValueNorm = normalizeValues(input);

    if (!footerValuesNorm.includes(inputValueNorm)) {
      article.classList.add("hidden");
    }
  });
};

//SECOND ALGORITHME
const searchAlgo2 = (inputValue) => {
  let recipesDOM = document.querySelectorAll(".recipe");
  recipesDOM.forEach((recipe) => {
    recipe.remove();
  });
  inputValue = normalizeValues(inputValue);
  recipes.forEach((recipe) => {
    recipe.name = normalizeValues(recipe.name);
    recipe.appliance = normalizeValues(recipe.appliance);
    recipe.ingredients.forEach((ingredient) => {
      ingredient.ingredient = normalizeValues(ingredient.ingredient);
    });
  });

  // recipes.forEach((recipe) => {
  //   recipe.appliance = normalizeValues(recipe.appliance);
  //   return recipe.appliance;
  // });
  // recipes.forEach((recipe) => {
  //   recipe.ustensils.forEach((ustensil) => {
  //     ustensil = normalizeValues(ustensil);
  //   });
  // });

  let recipesToDisplayByName = recipes.filter((recipe) =>
    recipe.name.includes(inputValue)
  );

  let recipesToDisplayByAppliance = recipes.filter((recipe) =>
    recipe.appliance.includes(inputValue)
  );

  let recipesToDisplayByIngredient = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.includes(inputValue)) {
        recipesToDisplayByIngredient.push(recipe);
      }
    });
  });

  console.log(recipesToDisplayByName);
  console.log(recipesToDisplayByIngredient);
  console.log(recipesToDisplayByAppliance);
};

export {
  refreshRecipes,
  refreshElementAfterRemoveTags,
  returnDisplayedArticles,
  refreshDropDownMenus,
  refreshRecipesAfterRemovingTags,
};
