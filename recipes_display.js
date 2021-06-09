import { recipes } from "./JS/datas.js";

class displayRecipesFactory {
  constructor() {
    this.recipesContainer = document.querySelector("#recipes-container");
    this.addRecipeToMainContainer();
  }

  addRecipeToMainContainer() {
    recipes.forEach((recipe) => {
      this.addUlDOMElements(recipe);
    });
  }

  createRecipeDOMElement(recipe, ingredientinfos) {
    this.recipesContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <article tabIndex = "0" class="recipe">
               
                <img class = 'background_picture' src = "./img/recipes/${recipe.name}.jpg">
              
              <footer class="recipe--information">
                  <h1 class="recipe--information_name">${recipe.name}</h1>
                  <h2 class="recipe--information_time"><i class="far fa-clock"></i> ${recipe.time} min</h2>
                  <div class="recipe--information--text">
                      <ul class="recipe--information--text_list">
                      ${ingredientinfos}
                      </ul>
                      <p class="recipe--information--text_instructions">${recipe.description}</p>
                      <p class="ustensils" style = 'display : none'> ${recipe.appliance} ${recipe.ustensils} </p>
                  </div>
              </footer>
          </article>
        `
    );
  }

  addUlDOMElements(recipe) {
    let ingredientinfos = "";

    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.quantity) {
        if (ingredient.unit && ingredient.quantity) {
          ingredientinfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity} ${ingredient.unit}</li>`;
        } else {
          ingredientinfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong> : ${ingredient.quantity}</li>`;
        }
      } else {
        ingredientinfos += `<li><strong class = 'ingredient'>${ingredient.ingredient}</strong></li>`;
      }
    });

    return this.createRecipeDOMElement(recipe, ingredientinfos);
  }
}

export { displayRecipesFactory };
