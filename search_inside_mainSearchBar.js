import { searchBarFactory } from "./main_searchbar.js";
import { refreshRecipes } from "./refresh_items.js";

class MainSearchFactory {
  constructor(input, articles) {
    this.input = input;
    this.articles = articles;
    this.searchByKeyPressEnter(this.input, this.articles);
  }

  focusOnMainSearchbarAfterWindowOnload() {
    window.onload = this.input.focus();
  }

  searchByKeyPressEnter(input, articles) {
    input.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
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

  // ALGO 1 +  TEST PERFORMANCE
  // let t0 = performance.now();
  // console.log(t0);
  refreshRecipes(articles, restArticles, input.value);
  // let t1 = performance.now();
  // console.log(
  //   "L'appel de searchAlgo1 a demandé " + (t1 - t0) + " millisecondes."
  // );

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
