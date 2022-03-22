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

/* Filtrer les recettes en fonction des filtres. */
function filteredRecipes() {
let myJson = recipes
let string = JSON.stringify(myJson);
console.log(string)

  const fRecipes = [];

    recipes.forEach((r, i) => {
      let filter = false;
      if (filters.ingredients) {
        filters.ingredients.forEach((ingredient, ingredientIndex) => {
          let ingredientPresent = false;
          r.ingredients.forEach((ingredientRecipe) => {
            if (ingredientRecipe.ingredient === ingredient) {
              ingredientPresent = true;
            }
          });
          if (!ingredientPresent) {
            filter = true;
          }
        });
      }
      if (filters.ustensils) {
        filters.ustensils.forEach((Ustensiles, u) => {
          let ustensilesPresent = false;
          r.ustensils.forEach((UstensilsRecipe) => {
            if (UstensilsRecipe === Ustensiles) {
              ustensilesPresent = true;
            }
          })
          if (!ustensilesPresent) {
            filter = true;
          }
        })
      }
      if (!filter) {
        fRecipes.push(r);
      }
    });

    const searchedRecipes = fRecipes;

    return searchedRecipes;
}




/**
 * Il crée un objet RecipeCard pour chaque recette dans le tableau filteredRecipes et l'ajoute au DOM.
 */
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


/**
 * Créez une liste déroulante pour chaque catégorie de filtres et remplissez les cartes avec les
 * recettes qui correspondent aux filtres
 * @param items - la liste des éléments à afficher dans la liste déroulante
 */
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


/**
 * Étant donné une liste d'objets, extraire les valeurs uniques d'une clé donnée des objets
 * @param l - La liste des objets dont extraire les valeurs.
 * @param key - Clé à extraire du tableau d'objets.
 * @returns Un tableau de chaînes.
 */
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


/**
 * Remplir les cartes avec les données de la base de données
 */
function init() {
  populateCards();
  initDropdowns();
}

init();
