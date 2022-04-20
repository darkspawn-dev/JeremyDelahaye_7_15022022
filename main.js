import recipes from "./scripts/data/recipes.js";
import {
  RecipeCard
} from "./scripts/factories/recipe-card.js";
import {
  Dropdown
} from "./scripts/factories/dropdown.js";

let search = null;
const filters = {};

// addEvent listener on searchBar
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  search = e.target.value;
  populateCards();
});


function filteredRecipes() {
  return recipes.filter((r) => {
    let filter = false;
    if (filters.ingredients) {
      const ingredientsPresent = filters.ingredients.reduce((result, ingredient) => {
        if (!result) {
          return result
        }
        return r.ingredients.find((ingredientRecipe) => ingredientRecipe.ingredient === ingredient) !== undefined
      }, true);
      if (!ingredientsPresent) {
        filter = true;
      }
    }

    if (filters.ustensils) {
      const ustensilesPresent = filters.ustensils.reduce((ustResult, ust) => {
        if (!ustResult) {
          return ustResult
        }
        return r.ustensils.find((ustensilsR) => ustensilsR === ust) !== undefined
      }, true);
      if (!ustensilesPresent) {
        filter = true;
      }
    }
    if (filters.appliance) {
      const appliancePresent = filters.appliance.reduce((appResult, app) => {
        if (!appResult) {
          return appResult
        }
        return r.appliance === app
      }, true)
      if (!appliancePresent) {
        filter = true;
      }
    }

    if (search && search.length >= 3) {
      const reg = new RegExp(search, 'i')
      const ingredientMatch = r.ingredients.find((i) => i.ingredient.match(reg)) || false

      if (
        !ingredientMatch &&
        !r.description.match(reg) &&
        !r.name.match(reg)
      ) {
        filter = true;
      }
    }

    return !filter
  })
}




/**
 * Il crée un objet RecipeCard pour chaque recette dans le tableau filteredRecipes et l'ajoute au DOM.
 */
function populateCards() {
  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  cardContainer.textContent = "";
  filteredRecipes().forEach((r) => {
    const {
      name,
      ingredients,
      description,
      time
    } = r;
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
    "Ingredients",
    badgeContainer,
    filters,
    populateCards

  );
  ingredientDropdown.init(dropdownContainer);

  const applianceDropdown = new Dropdown(
    "appliance-dropdown",
    appareilsList,
    "Appareils",
    badgeContainer,
    filters,
    populateCards,
    "red"
  );
  applianceDropdown.init(dropdownContainer);

  const ustensils = new Dropdown(
    "ustensils-dropdown",
    ustensilsList,
    "Ustensiles",
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