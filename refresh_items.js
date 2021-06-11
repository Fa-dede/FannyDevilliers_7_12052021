import { normalizeValues } from "./reusables-functions.js";
import { searchAlgo2 } from "./second_algorithm.js";
import { recipes } from "./JS/datas.js";
//ALGO DE RECHERCHE 1
const refreshRecipes = (articles, restArticles, input) => {
  let t0 = performance.now();
  searchAlgo1(articles, input);
  let t1 = performance.now();
  // console.log(
  //   `la recherche avec l'algorithme n°1 à pris ${t1 - t0} millisecondes`
  // );

  // let t0 = performance.now();
  // searchAlgo2(articles, input);
  // let t1 = performance.now();
  // console.log(
  //   `la recherche avec l'algorithme n°2 à pris ${t1 - t0} millisecondes`
  // );

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
  });
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

export {
  refreshRecipes,
  refreshElementAfterRemoveTags,
  returnDisplayedArticles,
  refreshDropDownMenus,
  refreshRecipesAfterRemovingTags,
};
