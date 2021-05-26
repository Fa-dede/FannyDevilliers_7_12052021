const navIntoButton = (listOfItems, buttonActive, arrayOfItemsDisplayed) => {
  let inputsForSearchArray = [
    ...document.querySelectorAll(".dropDownMenus--input_active_title"),
  ];

  let chevronArray = [
    ...document.querySelectorAll(".dropDownMenus--input_active_chevron "),
  ];

  let listOfItemsArray = [...listOfItems.children];

  let errorMessageIsDisplayed = false;

  inputsForSearchArray.forEach((input) => {
    input.addEventListener("input", (e) => {
      //Supprime le tableau précédemment rempli par les items à l'autocomplétion
      arrayOfItemsDisplayed.splice(0, arrayOfItemsDisplayed.length);

      //Supprime le message erreur précédent à la nouvelle saisie
      //   let messageArray = [...document.querySelectorAll(".error-message")];
      //   messageArray.forEach((message) => {
      //     message.remove(); //PROBLEME
      //   });

      // Met la valeur de l'input à null et supprime message erreur lors de la fermeture au chevron Up
      chevronArray.forEach((chevron) => {
        closeDropDownAndResetInfo(chevron, listOfItemsArray, input);
      });

      //Normalise les caractères de l'input
      let valueLowCaseAndWithoutAccent = input.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      listOfItemsArray.forEach((li) => {
        // Efface l'ensemble des li à l'évènement
        li.style.display = "none";

        //Normalise les caractères des Titres des Li
        let titleLowCaseAndWithoutAccent = li.title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        //N'affiche que les Li qui correspondent à la valeur de l'input
        if (
          titleLowCaseAndWithoutAccent.includes(valueLowCaseAndWithoutAccent)
        ) {
          li.style.display = "flex";
          arrayOfItemsDisplayed.push(li.title);
        }
      });

      //Affiche le message d'erreur en cas de saisie infructueuse (si tableau item pushés = 0)
      if (
        arrayOfItemsDisplayed.length === 0 &&
        listOfItems.parentNode === input.parentNode
      ) {
        if (errorMessageIsDisplayed === false) {
          listOfItems.insertAdjacentHTML(
            "afterbegin",
            `
        <p class = "error-message" >Aïe... Aucun résultat ne correspond à votre recherche</p>`
          );
        }
      }
      //   if (document.querySelectorAll(".error-message").length > 0) {
      //     errorMessageIsDisplayed = true;
      //   }

      //Efface les messages d'erreur si la saisie est nulle
      if (errorMessageIsDisplayed) {
        console.log("error");
      }
      if (input.value.length < 1 || errorMessageIsDisplayed) {
        document.querySelectorAll(".error-message").forEach((message) => {
          message.remove();
        });
      }
    });
  });
};

const closeDropDownAndResetInfo = (target, array, input) => {
  array.forEach((li) => {
    target.addEventListener("click", (e) => {
      input.value = null;
      document.querySelectorAll(".error-message").forEach((message) => {
        message.remove();
      });
      li.style.display = "flex";
    });
  });
};
export { navIntoButton, closeDropDownAndResetInfo };
