import { searchBarFactory } from "./main_searchbar.js";
import { refreshRecipes } from "./refresh_items.js";
import { removeSpaceUnderInput } from "./main_searchbar.js";

class MainSearchFactory {
  constructor(input, articles) {
    this.input = input;
    this.underInputMessage = document.querySelector("#under-input-message");
    this.articles = articles;
    this.searchByKeyPressEnter(this.input, this.articles);
    // this.focusOnMainSearchbarAfterWindowOnload();
  }

  focusOnMainSearchbarAfterWindowOnload() {
    window.onload = this.input.focus();
  }

  searchByKeyPressEnter(input, articles) {
    input.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.underInputMessage.style.display = "none";
        research(e, articles, input);
      }
    });
  }
}

const research = (e, articles, input) => {
  let restArticles = [];
  restArticles.splice(0, restArticles.length);

  let errorMessage = document.querySelector("#error-message");
  if (errorMessage) errorMessage.remove();

  refreshRecipes(articles, restArticles, input.value);

  if (restArticles.length < 1) {
    displayErrorMessage();
  }
};

const displayErrorMessage = () => {
  let menuNav = document.querySelector(".menuNav");
  menuNav.insertAdjacentHTML(
    "afterend",
    `
        <main>
        <p id = "error-message" >Oups...<i class="far fa-dizzy"></i><br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p></main>`
  );
};

export { MainSearchFactory };
