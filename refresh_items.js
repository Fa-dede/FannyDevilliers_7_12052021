import { normalizeValues } from "./function_normalizeValue.js";
//ALGO DE RECHERCHE 1
const refreshRecipes = (articles, restArticles, input) => {
  articles.forEach((article) => {
    let articleFooter =
      article.firstChild.nextElementSibling.nextElementSibling;
    let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
    let inputValueNorm = normalizeValues(input);

    if (!footerValuesNorm.includes(inputValueNorm)) {
      article.classList.add("hidden");
    }
  });
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
    item.style.display = "none";
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
        item.style.display = "flex";
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
      item.style.display = "none";
    }
  });

  selectedButtons.forEach((button) => {
    let buttonName = button.firstChild.nextElementSibling.innerText;
    buttonName = normalizeValues(buttonName);
    items.forEach((item) => {
      nameOfItem = item.innerHTML;
      nameOfItem = normalizeValues(nameOfItem).trim();
      if (nameOfItem === buttonName) {
        item.style.display = "none";
      }
    });

    //create end message of searching
    let ul = [
      ...document.querySelectorAll(".dropDownMenus--input_active_list"),
    ];
    ul.forEach((ul) => {
      if (ul.innerText === "") {
        let p = document.createElement("p");
        p.innerHTML = `<p class = 'end-message-tags'> Il n'y a plus rien à afficher dans cette section </p>`;
        ul.appendChild(p);
      } else {
        let message = ul.querySelector(".end-message-tags");
        if (message) {
          message.remove();
        }
      }
    });
  });
};

const refreshElementAfterRemoveTags = (restArticles) => {
  console.log("refresh");
  let articles = [...document.querySelectorAll(".recipe")];
  let buttons = [...document.querySelectorAll(".menuNav--buttonTagSelected")];

  buttons.forEach((button) => {
    let buttonValue = normalizeValues(button.innerText);
    articles.forEach((article) => {
      article.classList.remove("hidden");
    });
  });

  refreshRecipesAfterRemovingTags(articles, restArticles, buttons);

  // Affiche l'intégralité des recettes si
  if (buttons.length < 1) {
    articles.forEach((article) => {
      article.classList.remove("hidden");
    });
    let items = [...document.querySelectorAll(".name-of-item")];
    items.forEach((item) => {
      item.style.display = "flex";
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

const removeEndMessageInUl = () => {
  let ul = [...document.querySelectorAll(".dropDownMenus--input_active_list")];
  ul.forEach((ul) => {});
};

export { refreshRecipes, refreshElementAfterRemoveTags, removeEndMessageInUl };
