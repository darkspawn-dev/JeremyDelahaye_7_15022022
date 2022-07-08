import recipes from "./scripts/data/recipes.js";
import { RecipeCard } from "./scripts/factories/recipe-card.js";
import { Dropdown } from "./scripts/factories/dropdown.js";

let search = null;
const filters = {};

const filterRecipes = [];
const searchRecipes = [];

/* Ajout d'un écouteur d'événement sur la barre de recherche. Lorsque l'utilisateur tape dans la barre
de recherche, la fonction "populateCards" est appelée. */
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  search = e.target.value;
  populateCards();
});

/**
 * La fonction filtre le tableau des recettes en vérifiant si la recette est présente dans le tableau
 * des filtres
 * @returns Les recettes filtrées.
 */
function filteredRecipes() {
  // search should filter on title, description, ingredient
  // filters should filter on target property

  const fRecipes = [];
  /* Boucle dans le tableau des recettes. */
  for (const r of recipes) {
    let filter = false;
/* Vérifier si l'ingrédient est présent dans la recette. */
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
/* Pousser la recette vers le tableau filteredRecipes si elle passe le filtre. */
    if (!filter) {
      fRecipes.push(r);
    }
  }
/* Renvoi des recettes filtrées. */
  return fRecipes
}

/**
 * Il prend un tableau de recettes et renvoie un tableau de recettes qui correspondent aux critères de
 * recherche.
 * @param filterRecipes - un tableau d'objets contenant les recettes
 * @returns Un tableau de recettes qui correspondent aux critères de recherche.
 */
function searchedRecipes(filterRecipes) {
  const sRecipes = [];
  /* Filtrer les recettes en fonction des critères de recherche. */
  for (const r of filterRecipes) {
    let filter = false;
  if (search && search.length >= 3) {
    const reg = new RegExp(search, 'i')
    let ingredientMatch = false;
    for (const ingredient of r.ingredients) {
      if (ingredient.ingredient.match(reg)) {
        ingredientMatch = true;
      }
    }

   /* Vérifier si le terme de recherche se trouve dans la description, le nom ou les ingrédients. */
    if (
      !ingredientMatch &&
      !r.description.match(reg) &&
      !r.name.match(reg)
    ) {
      filter = true;
    }
  }
/* Pousser la recette vers le tableau si elle passe le filtre. */
  if (!filter) {
    sRecipes.push(r);
  } 
}
return sRecipes;
}
/**
 * Il crée un objet RecipeCard pour chaque recette dans le tableau filteredRecipes et l'ajoute au DOM.
 */
function populateCards() {
  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  cardContainer.textContent = "";
 
   const filterRecipes = filteredRecipes();
   const searchRecipes = searchedRecipes(filterRecipes);

  searchRecipes.forEach((r) => {
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
 * @param key - Clé à extraire du tableau.
 * @returns Une liste de toutes les valeurs uniques dans le champ `key` de la liste `l`.
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
 * Initialiser les menus déroulants et remplir les fiches
 */
function init() {
  initDropdowns();
  populateCards();
}

init();