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
  // search should filter on title, description, ingredient

  // filters should filter on target property

  const fRecipes = [];

  for (const r of recipes) {
    let filter = false;
    for (const ingredient of filters.ingredients) {
      let ingredientIsPresent = false;
      for (const ingredientRecipe of r.ingredients) {
        if (ingredientRecipe.ingredient === ingredient) {
          ingredientIsPresent = true;
        }
      }
      if (!ingredientIsPresent) {
        filter = true;
      }
    }

    for (const ustensils of filters.ustensils) {
      let ustensilesIsPresent = false;
      for (const ustensilsR of r.ustensils) {
        if (ustensilsR === ustensils) {
          ustensilesIsPresent = true;
        }
      }
      if (!ustensilesIsPresent) {
        filter = true;
      }
    }
    for (const appliance of filters.appliance) {
      let applianceIsPresent = false;

      if (appliance === r.appliance) {
        applianceIsPresent = true;
      }

      if (!applianceIsPresent) {
        filter = true;
      }
    }
    if (search && search.length >= 3) {
      const reg = new RegExp(search, 'i')
      let ingredientMatch = false;
      for (const ingredient of r.ingredients) {
        if (ingredient.ingredient.match(reg)) {
          ingredientMatch = true;
        }
      }

      if (
        !ingredientMatch &&
        !r.description.match(reg) &&
        !r.name.match(reg)
      ) {
        filter = true;
      }
    }
    if (!filter) {
      fRecipes.push(r);
    }
  }

  return fRecipes;
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
  initDropdowns();
  populateCards();
}

init();
