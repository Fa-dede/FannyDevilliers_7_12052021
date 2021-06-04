import {
  normalizeValues,
  sortByAlphabeticsOrder,
  changeDropDownMenusCssWidth,
  createMessageIfNoItemsRemainings,
} from "./reusables-functions.js";
import { recipes } from "./JS/datas.js";
import { NavigateInButton } from "./navigation_inside_button.js";

import {
  refreshRecipes,
  refreshElementAfterRemoveTags,
  returnDisplayedArticles,
  refreshDropDownMenus,
} from "./refresh_items.js";

// Génère les élements de type TAGS dans les listes déroulantes
class ButtonListFactory {
  constructor(
    name,
    button,
    listOfItems,
    nameOfClass,
    buttonForDisplay,
    inactiveContainerID
  ) {
    this.name = name;
    this.button = button;
    this.listOfItems = listOfItems;
    this.nameOfClass = nameOfClass;
    this.buttonForDisplay = buttonForDisplay;
    this.crossCloseButton = [];
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.arrayOfChevronUp = [];
    this.inactiveContainerID = inactiveContainerID;

    this.articlesArray = [...document.querySelectorAll(".recipe")];
    //METHODES APPELEES

    this.addTagsToButton(this.nameOfClass);

    this.generateItemsListInDOM(this.allIngredients);
    this.generateItemsListInDOM(this.allAppliances);
    this.generateItemsListInDOM(this.allUstensils);

    this.eraseDuplicateItem(this.allIngredients);
    this.eraseDuplicateItem(this.allAppliances);
    this.eraseDuplicateItem(this.allUstensils);

    this.openNavigationList(button, buttonForDisplay);

    new NavigateInButton(this.listOfItems, this.articlesArray);

    this.closeDropDownMenuByClickingOutside(button, buttonForDisplay);
  }

  eraseDuplicateItem(array) {
    array = Array.from(new Set(this.allIngredients));
  }

  addTagsToButton(nameOfClass) {
    recipes.forEach((recipe) => {
      if (nameOfClass === "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          this.allIngredients.push(ingredient.ingredient);
        });
      }
      if (nameOfClass === "appliances") {
        this.allAppliances.push(recipe.appliance);
      }
      if (nameOfClass === "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          this.allUstensils.push(ustensil);
        });
      }
    });

    // Supprime les doublons dans les tableaux avec méthode Set

    const eraseDuplicatedValues = () => {
      this.allIngredients = Array.from(new Set(this.allIngredients));
      this.allAppliances = Array.from(new Set(this.allAppliances));
      this.allUstensils = Array.from(new Set(this.allUstensils));
    };

    eraseDuplicatedValues();
  }

  // Trie les items des listes dans l'ordre alphabétique + les génère dans le DOM
  generateItemsListInDOM(array) {
    sortByAlphabeticsOrder(array);

    array.forEach((item) => {
      this.listOfItems.innerHTML += `
      <li tabIndex = "0" class ="name-of-item" title="${item}">${item}
      </li>`;
    });
  }

  //OUVRE ET FERME LES LISTES DEROULANTES
  openNavigationList(buttonInactive, buttonActive) {
    buttonInactive.addEventListener("click", (e) => {
      buttonInactive.style.display = "none";
      buttonActive.style.display = "block";
      buttonActive.firstChild.nextElementSibling.focus(); // FOCUS SUR L'INPUT
      this.closeActiveInputByChevron(
        buttonInactive,
        buttonActive,
        "container-1_active",
        "#chevron-up-ingredient"
      );
      this.closeActiveInputByChevron(
        buttonInactive,
        buttonActive,
        "container-2_active",
        "#chevron-up-appliance"
      );
      this.closeActiveInputByChevron(
        buttonInactive,
        buttonActive,
        "container-3_active",
        "#chevron-up-ustensils"
      );

      this.removeEraseTemporarlyClassFromItemsInList();

      createMessageIfNoItemsRemainings();

      changeDropDownMenusCssWidth();
    });
  }

  removeEraseTemporarlyClassFromItemsInList() {
    let listOfItems = [...document.querySelectorAll(".name-of-item")];
    listOfItems.forEach((li) => {
      if (li.className == "name-of-item erase-temporarly") {
        li.classList.remove("erase-temporarly");
      }
    });
  }

  closeActiveInputByChevron(
    buttonInactive,
    buttonActive,
    containerId,
    chevronId
  ) {
    if (buttonActive.id === containerId) {
      document.querySelector(chevronId).addEventListener("click", (e) => {
        buttonActive.style.display = "none";
        buttonInactive.style.display = "block";
      });
    }
  }

  //Ferme les menus au clic en dehors
  closeDropDownMenuByClickingOutside(buttonInactive, buttonActive) {
    document.addEventListener("click", (e) => {
      if (
        e.target.parentNode !== buttonActive &&
        e.target.parentNode !== buttonInactive
      ) {
        buttonActive.style.display = "none";
        buttonInactive.style.display = "block";
      }
    });
  }
}

// AFFICHE LES TAGS SELECTIONNES AU DESSUS DES BOUTONS

const displayTagAboveMenuNav = (articles) => {
  let arrayOfCrossCloseAbove = [];
  let tagSelectedContainer = document.querySelector(
    ".menuNav--buttons-selected-container"
  );
  let arrayOfItems = [...document.querySelectorAll(".name-of-item")];
  arrayOfItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      let parentContainerOfTarget = e.target.parentNode.parentNode;
      let inputAboveTarget =
        parentContainerOfTarget.firstChild.nextElementSibling;
      e.preventDefault();
      tagSelectedContainer.insertAdjacentHTML(
        "afterbegin",
        `
              <button class="menuNav--buttonTagSelected"> <p>${e.target.innerHTML}</p> <img class="menuNav--buttonTagSelected__crossClose" src="./img/cross-close.svg" alt="supprimer le tags">
          </button>`
      );
      let buttonForTagsAbove = document.querySelector(
        ".menuNav--buttonTagSelected"
      );

      let valueOfItemSelected = normalizeValues(e.target.innerHTML).trim();
      let restArticles = [];
      restArticles.splice(0, restArticles.length);

      //Supprime la valeur entrée au clic sur un tag
      if (inputAboveTarget.value) inputAboveTarget.value = null;

      //Lance la recherche avancée par tag au clic sur un tag

      refreshRecipes(articles, restArticles, valueOfItemSelected);

      // DEFINIT LA COULEUR DE L'ARRIERE-PLAN DU BOUTON DE TAG SELECTIONNE
      const getBgColorOfTagsAbove = (e, className, color) => {
        if (e.target.parentNode.className.includes(className)) {
          buttonForTagsAbove.style.backgroundColor = color;
          arrayOfCrossCloseAbove.push(
            document.querySelector(".menuNav--buttonTagSelected__crossClose")
          );
        }
      };

      getBgColorOfTagsAbove(e, "ing", "#3282f7");
      getBgColorOfTagsAbove(e, "appliance", "#68d9a4");
      getBgColorOfTagsAbove(e, "ustensils", "#ed6454");

      closeTagAboveMenuNav(arrayOfCrossCloseAbove);
    });
  });
};

// SUPPRIME LE TAG SELECTIONNE AU CLIC SUR LA CROIX
const closeTagAboveMenuNav = (arrayOfCrossCloseAbove) => {
  arrayOfCrossCloseAbove.forEach((cross) => {
    cross.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      //Lance la déselection des tags de recherches avancées et actualise les recettes + tags
      let restArticles = [];
      restArticles.splice(0, restArticles.length);
      let input = document.querySelector(".menuNav--searchInput");
      if (!input.value) {
        refreshElementAfterRemoveTags(restArticles);
      }
      let buttons = [
        ...document.querySelectorAll(".menuNav--buttonTagSelected"),
      ];
      let articles = [...document.querySelectorAll(".recipe")];
      if (input.value && buttons.length < 1) {
        articles.forEach((article) => {
          article.classList.remove("hidden");
          let articleFooter =
            article.firstChild.nextElementSibling.nextElementSibling;
          let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
          let inputValue = normalizeValues(input.value);
          if (!footerValuesNorm.includes(inputValue)) {
            article.classList.add("hidden");
          }
          returnDisplayedArticles(restArticles, articles);
          refreshDropDownMenus(restArticles);
        });
      }
    });
  });
};

export { ButtonListFactory, displayTagAboveMenuNav, closeTagAboveMenuNav };
