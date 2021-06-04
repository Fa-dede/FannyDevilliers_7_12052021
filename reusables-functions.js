const normalizeValues = (value) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const sortByAlphabeticsOrder = (array) => {
  array = array.sort((a, b) => {
    return a > b ? 1 : -1;
  });
};

const changeDropDownMenusCssWidth = () => {
  let ingredientsMenu = document.querySelector(
    ".dropDownMenus--input_active_ingredient"
  );

  let ingredientsList = document.querySelector(
    ".dropDownMenus--input_active_list_ing"
  );
  let itemsRemainings = [...ingredientsList.children];
  let arrayOfRemainers = [];

  itemsRemainings.forEach((item) => {
    if (item.className === "name-of-item") {
      arrayOfRemainers.push(item);
    }
  });
  if (arrayOfRemainers.length <= 15) {
    ingredientsMenu.style.width = "350px";
  } else if (arrayOfRemainers.length <= 30) {
    ingredientsMenu.style.width = "500px";
  } else if (arrayOfRemainers.length > 30) {
    ingredientsMenu.style.width = "900px";
  }
};

const createMessageIfNoItemsRemainings = () => {
  let menus = [
    ...document.querySelectorAll(".dropDownMenus--input_active_list"),
  ];
  menus.forEach((menu) => {
    let endMessage = menu.querySelector(".end-message");
    createMessageForEachDropdownMenus(menu, endMessage);
  });
};

//Crée le message dans le DOM et le supprime si le dropdown est re rempli avec des items
const createMessageForEachDropdownMenus = (menu, endMessage) => {
  if (endMessage) {
    endMessage.remove();
  }
  let itemsClassNames = [];

  let itemArray = [...menu.querySelectorAll("li")];

  itemArray.forEach((item) => {
    itemsClassNames.push(item.className);
  });
  let itemIsHidden = (className) => className === "name-of-item hidden";
  let allitemsAreHidden = itemsClassNames.every(itemIsHidden);

  if (allitemsAreHidden) {
    //|| menu.innerText === ""
    menu.insertAdjacentHTML(
      "afterbegin",
      `
    <p class = 'end-message'>Il n'y a plus rien à selectionner dans cette section </p>`
    );
  } else {
    if (endMessage) {
      endMessage.remove();
    }
  }
};

export {
  normalizeValues,
  sortByAlphabeticsOrder,
  changeDropDownMenusCssWidth,
  createMessageIfNoItemsRemainings,
};
