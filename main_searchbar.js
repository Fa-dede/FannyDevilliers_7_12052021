import { MainSearchFactory } from "./search_inside_mainSearchBar.js";
import { normalizeValues } from "./reusables-functions.js";
import {
  returnDisplayedArticles,
  refreshDropDownMenus,
} from "./refresh_items.js";

class CreateSearchBarFactory {
  constructor(articlesArray) {
    this.inputOfMainSearchBar = document.querySelector(".menuNav--searchInput");
    this.articlesArray = articlesArray;
    this.menuOfTagSelected = document.querySelector(
      ".menuNav--buttons-selected-container"
    );

    this.searchInsideMainSearchBar(this.inputOfMainSearchBar);

    new MainSearchFactory(this.inputOfMainSearchBar, this.articlesArray);
  }

  searchInsideMainSearchBar(input) {
    //Affiche toutes les recettes si l'input est vidé
    input.addEventListener("input", (e) => {
      if (input.value.length < 1) {
        this.menuOfTagSelected.innerHTML = ""; // supprime l'intégralité des recherches avancés en même temps que la suppression de l'input principal
        let restArticles = [];
        restArticles = restArticles.splice(0, restArticles.length);
        let buttons = [
          ...document.querySelectorAll(".menuNav--buttonTagSelected"),
        ];
        this.articlesArray.forEach((article) => {
          article.classList.remove("hidden");
        });
        let errorMessage = document.querySelector("#error-message"); //Supprime le message d'erreur au clic sur la croix
        if (errorMessage) errorMessage.remove();

        //Actualise les recettes uniquement en fonctions des tags si l'input est supprimé

        buttons.forEach((button) => {
          this.articlesArray.forEach((article) => {
            let articleFooter =
              article.firstChild.nextElementSibling.nextElementSibling;
            let footerValuesNorm = normalizeValues(articleFooter.innerHTML);
            let buttonValueNorm = normalizeValues(button.innerText);
            if (!footerValuesNorm.includes(buttonValueNorm)) {
              article.classList.add("hidden");
            }
          });
        });
        returnDisplayedArticles(restArticles, this.articlesArray);
        refreshDropDownMenus(restArticles);
      }
    });
  }
}

export { CreateSearchBarFactory };
