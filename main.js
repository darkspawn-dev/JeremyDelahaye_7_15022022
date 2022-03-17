import recipes from "./scripts/data/recipes.js";
import { RecipeCard } from "./scripts/factories/recipe-card.js";
import { Dropdown } from "./scripts/factories/dropdown.js";

let search = null;
const filters = {};

// addEvent listener on searchBar
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  search = e.target.value;
  populateCards();
});

function filteredRecipes() {
  console.log(search)
  console.log(filters)
  const fRecipes = [];
//   recipes.forEach((r, i) => {
//     let filter = false;
//     if (filters.ingredients) {
//       filters.ingredients.forEach((ingredient, ingredientIndex) => {
//         let ingredientIsPresent = false;
//         r.ingredients.forEach((ingredientRecipe) => {
//           console.log(ingredientRecipe)
//           if (ingredientRecipe.ingredient === ingredient) {
//             ingredientIsPresent = true;
//           }
//         });
//         if (!ingredientIsPresent) {
//           filter = true;
//         }
//       });
//     }
//     if (!filter) {
//       fRecipes.push(r);
//     }
//   });

//   const searchedRecipes = fRecipes;

//   return searchedRecipes;
// }
  return recipes
}

// affichage des cartes
function populateCards() {

  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  cardContainer.textContent = "";
  filteredRecipes().forEach((r) => {
    const { name, ingredients, description, time } = r;
    const card = new RecipeCard(name, ingredients, description, time).render();
    // append cards to dom
    cardContainer.appendChild(card);
  });
}

// affichage des dropdowns
function initDropdowns(items) {
  const ingredientsList = extract(
    extract(recipes, "ingredients"),
    "ingredient"
  );
  const ustensilsList = extract(recipes, "ustensils");
  const appareilsList = extract(recipes, "appliance");

  const dropdownContainer = document.getElementById("dropdown-filters");
  const badgeContainer = document.getElementById("filters");

  const ingredientDropdown = new Dropdown(
    "ingredient-dropdown",
    ingredientsList,
    "ingredients",
    badgeContainer,
    filters,
    populateCards
  );
  ingredientDropdown.init(dropdownContainer);

  const applianceDropdown = new Dropdown(
    "appliance-dropdown",
    appareilsList,
    "appliance",
    badgeContainer,
    filters,
    populateCards,
    "red"
  );
  applianceDropdown.init(dropdownContainer);

  const ustensils = new Dropdown(
    "ustensils-dropdown",
    ustensilsList,
    "ustensils",
    badgeContainer,
    filters,
    populateCards,
    "green"
  );
  ustensils.init(dropdownContainer);
}

// affichage de la liste des items dropdowns
function extract(l, key) {
  const result = new Set();
  for (const element of l) {
    if (Array.isArray(element[key])) {
      for (const i of element[key]) {
        result.add(i);
      }
      continue;
    }

    result.add(element[key]);
  }
  // result.sort();
  return [...result].sort();
}

function init() {
  populateCards();
  initDropdowns();
}

init();
