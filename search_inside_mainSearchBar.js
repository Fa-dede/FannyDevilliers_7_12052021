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
        let restArticles = [];
        restArticles.splice(0, restArticles.length);
        let errorMessage = document.querySelector("#error-message");
        if (errorMessage) errorMessage.remove();
        articles.forEach((article) => {
          let articleFooter =
            article.firstChild.nextElementSibling.nextElementSibling;
          let footerValuesNorm = this.normalizeValues(articleFooter.innerHTML);
          let inputValueNorm = this.normalizeValues(input.value);
          if (!footerValuesNorm.includes(inputValueNorm)) {
            article.style.display = "none";
          } else {
            restArticles.push(article);
          }
        });
        if (restArticles.length < 1) {
          console.log("no match");
          let menuNav = document.querySelector(".menuNav");
          menuNav.insertAdjacentHTML(
            "afterend",
            `
        <main>
        <p id = "error-message" >Oups...<i class="far fa-dizzy"></i><br>Votre recherche ne correspond à aucun résultat...Vous pouvez chercher "tarte aux pommes", "poisson", etc...</p></main>`
          );
        }
      }
    });
  }

  normalizeValues(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
}

export { MainSearchFactory };
