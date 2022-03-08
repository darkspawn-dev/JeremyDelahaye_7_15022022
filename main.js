import recipes from "./scripts/data/recipes.js";
import { RecipeCard } from "./scripts/factories/recipe-card.js";
import { Dropdown } from "./scripts/factories/dropdown.js";

let search = null;
const filters = {
  ingredients: [],
  ustensils: [],
  appliance: [],
};

function filteredRecipes(search, filters) {
  return recipes
}

// affichage des cartes
function populateCards() {
  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  filteredRecipes(search, filters).forEach((r) => {
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
    badgeContainer
  );
  ingredientDropdown.init(dropdownContainer);

  const applianceDropdown = new Dropdown(
    "appliance-dropdown",
    appareilsList,
    "appliance",
    badgeContainer,
    "red"
  );
  applianceDropdown.init(dropdownContainer);

  const ustensils = new Dropdown(
    "ustensils-dropdown",
    ustensilsList,
    "ustensils",
    badgeContainer,
    "green"
  );
  ustensils.init(dropdownContainer);
}

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

function initFiltersWatchers() {
  const filtersContainer = document.getElementById("filters");
  const config = { attributes: false, childList: true, subtree: false };
  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          filters[node.dataset.dataType].push(node.dataset.value);
        }
        for (const node of mutation.removedNodes) {
          filters[node.dataset.dataType] = filters[node.dataset.dataType].filter(i => i !== node.dataset.value);
        }
      }
    }
    populateCards();
  };
  const observer = new MutationObserver(callback);
  observer.observe(filtersContainer, config);
}

function init() {
  populateCards();
  initDropdowns();
  initFiltersWatchers();

  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", (e) => {
    search = e.target.value;
    populateCards();
  });
}

init();
