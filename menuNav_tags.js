import { recipes } from "./JS/datas.js";

// Génère les élements de type TAGS dans les listes déroulantes
class ButtonListFactory {
  constructor(name, button, buttonExpanded, nameOfClass, buttonForDisplay) {
    this.name = name;
    this.button = button;
    this.buttonExpanded = buttonExpanded;
    this.nameOfClass = nameOfClass;
    this.buttonForDisplay = buttonForDisplay;
    this.crossCloseButton = [];
    this.allIngredients = [];
    this.allAppliances = [];
    this.allUstensils = [];
    this.arrayOfChevronUp = [];

    //METHODES APPELEES

    this.addTagsToButton(this.nameOfClass);

    this.generateItemsListInDOM(this.allIngredients);
    this.generateItemsListInDOM(this.allAppliances);
    this.generateItemsListInDOM(this.allUstensils);

    this.eraseDuplicateItem(this.allIngredients);
    this.eraseDuplicateItem(this.allAppliances);
    this.eraseDuplicateItem(this.allUstensils);

    this.openNavigationList(button, buttonForDisplay);
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

  generateItemsListInDOM(array) {
    array = array.sort((a, b) => {
      return a > b ? 1 : -1;
    });

    array.forEach((item) => {
      this.buttonExpanded.innerHTML += `
      <li class ="name-of-item" title="${item}">${item}
      </li>`;
    });
  }

  openNavigationList(buttonInactive, buttonActive) {
    let menuNavIsOpen = false;
    buttonInactive.addEventListener("click", (e) => {
      buttonInactive.style.display = "none";
      buttonActive.style.display = "block";

      if (buttonActive.id === "container-1_active") {
        document
          .querySelector("#chevron-up-ingredient")
          .addEventListener("click", (e) => {
            buttonActive.style.display = "none";
            buttonInactive.style.display = "block";
          });
      }
      if (buttonActive.id === "container-2_active") {
        document
          .querySelector("#chevron-up-appliance")
          .addEventListener("click", (e) => {
            buttonActive.style.display = "none";
            buttonInactive.style.display = "block";
          });
      }
      if (buttonActive.id === "container-3_active") {
        document
          .querySelector("#chevron-up-ustensils")
          .addEventListener("click", (e) => {
            buttonActive.style.display = "none";
            buttonInactive.style.display = "block";
          });
      }
    });
  }
}

const displayTagAboveMenuNav = () => {
  let arrayOfCrossCloseAbove = [];
  let tagSelectedContainer = document.querySelector(
    ".menuNav--buttons-selected-container"
  );
  let arrayOfItems = [...document.querySelectorAll(".name-of-item")];
  arrayOfItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      tagSelectedContainer.insertAdjacentHTML(
        "afterbegin",
        `
              <button class="menuNav--buttonTagSelected">${e.target.innerHTML}
              <img class="menuNav--buttonTagSelected__crossClose" src="./img/cross-close.svg" alt="supprimer le tags">
          </button>`
      );
      console.log(e.target.parentNode.className);
      let buttonForTagsAbove = document.querySelector(
        ".menuNav--buttonTagSelected"
      );
      getBgColorOfTagsAbove(
        buttonForTagsAbove,
        arrayOfCrossCloseAbove,
        e,
        "ing",
        "#3282f7"
      );
      getBgColorOfTagsAbove(
        buttonForTagsAbove,
        arrayOfCrossCloseAbove,
        e,
        "appliance",
        "#68d9a4"
      );
      getBgColorOfTagsAbove(
        buttonForTagsAbove,
        arrayOfCrossCloseAbove,
        e,
        "ustensils",
        "#ed6454"
      );
      closeTagAboveMenuNav(arrayOfCrossCloseAbove);
    });
  });
};

const getBgColorOfTagsAbove = (
  buttonForTagsAbove,
  arrayOfCrossCloseAbove,
  e,
  className,
  color
) => {
  if (e.target.parentNode.className.includes(className)) {
    buttonForTagsAbove.style.backgroundColor = color;
    arrayOfCrossCloseAbove.push(
      document.querySelector(".menuNav--buttonTagSelected__crossClose")
    );
  }
};

const closeTagAboveMenuNav = (arrayOfCrossCloseAbove) => {
  arrayOfCrossCloseAbove.forEach((cross) => {
    cross.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
  });
};

export { ButtonListFactory, displayTagAboveMenuNav, closeTagAboveMenuNav };
