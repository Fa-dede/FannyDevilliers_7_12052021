// import { normalizeValues } from "./function_normalizeValue.js";
// import { recipes } from "./JS/datas.js";

// class AdvancedSearchWithTags {
//   constructor(articles, item) {
//     this.articles = articles;
//     this.item = item;
//     this.containerForTagAbove = document.querySelector(
//       ".menuNav--buttons-selected-container"
//     );
//     this.removeEveryRecipe();
//     this.sortByTagName();
//     this.removefilter();
//   }

//   //   addEveryRecipe() {
//   //     console.log(this.containerForTagAbove.children.length);
//   //     if (this.containerForTagAbove.children.length < 1) {
//   //       this.articles.forEach((article) => {
//   //         article.style.display = "flex";
//   //       });
//   //     }
//   //   }

//   removeEveryRecipe() {
//     this.articles.forEach((article) => {
//       article.style.display = "none";
//     });
//   }

//   sortByTagName() {
//     let itemValueNorm = normalizeValues(this.item.innerHTML).trim();
//     //permet de stocker les ingrédients restants après filtre
//     let ingredientsRemaining = [];
//     let appliancesRemaining = [];
//     let ustensilsRemaining = [];

//     //affiche les Recettes restantes suite au filtre
//     this.displayArticlesRemaining(
//       itemValueNorm,
//       ingredientsRemaining,
//       appliancesRemaining,
//       ustensilsRemaining
//     );

//     //Applique la suppression des valeurs en double dans les tableaux des éléments restants
//     ingredientsRemaining = this.removeDuplicatedValues(ingredientsRemaining);
//     appliancesRemaining = this.removeDuplicatedValues(appliancesRemaining);
//     ustensilsRemaining = this.removeDuplicatedValues(ustensilsRemaining);

//     // console.log(ingredientsRemaining);
//     // console.log(appliancesRemaining);
//     // console.log(ustensilsRemaining);

//     this.eraseOldItemsAndAddItemsRemaining(
//       ingredientsRemaining,
//       appliancesRemaining,
//       ustensilsRemaining
//     );
//   }

//   displayArticlesRemaining(
//     itemValueNorm,
//     ingredientsRemaining,
//     appliancesRemaining,
//     ustensilsRemaining
//   ) {
//     this.articles.forEach((article) => {
//       // si le innerHTML de l'article inclus la valeur de l'item, alors affiche l'article
//       let articleInfo = normalizeValues(article.innerHTML);

//       if (articleInfo.includes(itemValueNorm)) {
//         article.style.display = "flex";
//         this.infoOfRestOfRecipe(
//           article,
//           ingredientsRemaining,
//           appliancesRemaining,
//           ustensilsRemaining
//         );
//       }
//     });
//   }

//   eraseOldItemsAndAddItemsRemaining(ingredients, appliances, ustensils) {
//     let items = [...document.querySelectorAll(".name-of-item")];
//     items.forEach((item) => {
//       item.style.display = "none";
//     });

//     const addCorrespondantItems = (remainingItems) => {
//       remainingItems.forEach((remainers) => {
//         items.forEach((item) => {
//           let itemValue = item.innerHTML.trim();
//           if (itemValue === remainers) {
//             item.style.display = "flex";
//           }
//         });
//       });
//     };

//     //ajoute les éléments dans les listes déroulantes en fonctions des recettes restantes sur la page
//     addCorrespondantItems(ingredients);
//     addCorrespondantItems(appliances);
//     addCorrespondantItems(ustensils);
//   }

//   infoOfRestOfRecipe(
//     article,
//     ingredientsRemaining,
//     appliancesRemaining,
//     ustensilsRemaining
//   ) {
//     let titleOfRecipe = article.querySelector(
//       ".recipe--information_name"
//     ).innerHTML;
//     // console.log(titleOfRecipe);
//     recipes.forEach((recipe) => {
//       if (recipe.name === titleOfRecipe) {
//         recipe.ingredients.forEach((ingredient) => {
//           ingredientsRemaining.push(ingredient.ingredient);
//         });
//         appliancesRemaining.push(recipe.appliance);
//         recipe.ustensils.forEach((ustensil) => {
//           ustensilsRemaining.push(ustensil);
//         });
//       }
//     });
//   }

//   removeDuplicatedValues(arrayOfItemsRemaining) {
//     return (arrayOfItemsRemaining = Array.from(new Set(arrayOfItemsRemaining)));
//     // this.allIngredients = Array.from(new Set(this.allIngredients));
//   }

//   removefilter() {
//     let crossesClose = [
//       ...document.querySelectorAll(".menuNav--buttonTagSelected__crossClose"),
//     ];

//     crossesClose.forEach((cross) => {
//       cross.addEventListener("click", (e) => {
//         let valueOfButtonClosed =
//           e.target.parentNode.firstChild.nextElementSibling.innerHTML;
//         let valueOfButtonCloseNorm =
//           normalizeValues(valueOfButtonClosed).trim();
//         // console.log(valueOfButtonCloseNorm);
//       });
//     });
//   }
// }

// export { AdvancedSearchWithTags };

// const refreshTagsInList = () => {};
