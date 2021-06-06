import { refreshRecipes } from "./refresh_items.js";

class MainSearchFactory {
  constructor(input, articles) {
    this.input = input;
    this.underInputMessage = document.querySelector("#under-input-message");
    this.articles = articles;
    this.searchWithInput(this.input, this.articles);
    this.focusOnMainSearchbarAfterWindowOnload();
  }

  focusOnMainSearchbarAfterWindowOnload() {
    window.onload = this.input.focus();
  }

  searchWithInput(input, articles) {
    input.addEventListener("input", (e) => {
      if (input.value.length > 2) {
        research(articles, input);
      }
    });
    input.addEventListener("keyup", (e) => {
      if (e.key === "Backspace") {
        articles.forEach((article) => {
          article.classList.remove("hidden");
        });
        research(articles, input);
      }
    });
  }
}

const research = (articles, input) => {
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
        <p id = "error-message" >Oups...<i class="far fa-dizzy"></i><br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p>`
  );
};

export { MainSearchFactory, research };
