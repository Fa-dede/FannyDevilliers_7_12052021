import { normalizeValues } from "./function_normalizeValue.js";
//ALGO DE RECHERCHE 1
const refreshRecipes = (articles, restArticles, input) => {
  articles.forEach((article) => {
    let articleFooter =
      article.firstChild.nextElementSibling.nextElementSibling;
    let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
    let inputValueNorm = normalizeValues(input);

    console.log(inputValueNorm);

    if (!footerValuesNorm.includes(inputValueNorm)) {
      article.classList.add("hidden");
      article.style.display = "none";
    }
  });
  returnDisplayedArticles(restArticles, articles);
  refreshDropDownMenus(restArticles);
};

const returnDisplayedArticles = (restArticles, articles) => {
  articles.forEach((article) => {
    if (article.className !== "recipe hidden") {
      console.log(article);
      restArticles.push(article);
    }
  });
};

// ACTUALISE LES DROPDOWN MENUS

const refreshDropDownMenus = (restArticles) => {
  eraseAllTags();
  displayCorrespondantTagsOnly(restArticles);
};

const eraseAllTags = () => {
  let items = [...document.querySelectorAll(".name-of-item")];
  items.forEach((item) => {
    item.style.display = "none";
  });
};

const displayCorrespondantTagsOnly = (restArticles) => {
  let items = [...document.querySelectorAll(".name-of-item")];
  let nameOfItem;

  restArticles.forEach((article) => {
    let infos =
      article.firstChild.nextElementSibling.nextElementSibling.innerHTML;
    infos = normalizeValues(infos);
    items.forEach((item) => {
      nameOfItem = item.innerHTML;
      nameOfItem = normalizeValues(nameOfItem).trim();
      if (infos.includes(nameOfItem)) {
        item.style.display = "flex";
      }
    });
  });
};

const eraseValuesAlreadySelected = () => {};

export { refreshRecipes };
