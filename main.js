import recipes from "./scripts/data/recipes.js";
import { RecipeCard } from "./scripts/factories/recipe-card.js";
import { Dropdown } from "./scripts/factories/dropdown.js";

// affichage des cartes
function initCards() {
  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  recipes.forEach((r) => {
    const { name, ingredients, description, time } = r;
    const card = new RecipeCard(name, ingredients, description, time).render();
    // append cards to dom
    cardContainer.appendChild(card);
  });
}

// affichage des dropdowns
function initDropdowns(items) {
  const dropdownContainer = document.getElementById("dropdown-filters");

  const ingredientDropdown = new Dropdown(
    "ingredient-dropdown",
    ["banane", "mangue"],
    "ingredients"
  );
  ingredientDropdown.init(dropdownContainer);

  const applianceDropdown = new Dropdown(
    "appliance-dropdown",
    ["blender", "saladier", "blender", "saladier"],
    "appareils",
    "red"
  );
  applianceDropdown.init(dropdownContainer);

  const ustensils = new Dropdown(
    "ustensils-dropdown",
    ["couteau", "verre", "couteau", "verre", "couteau", "verre"],
    "ustensiles",
    "green"
  );
  ustensils.init(dropdownContainer);
}

function extract(l, key) {
  console.log(l);

  let ingredients = [];
  let ustensils = [];
  let appareils = [];

  l.forEach((element) => {
    if (!appareils.includes(element.appliance)) {
      appareils.push(element.appliance);
      appareils.sort();
    }

    element.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
        ustensils.sort();
      }
    });
    element.ingredients.forEach((ingredient) => {
      if (
        !ingredients.includes(
          ingredient.ingredient.toLowerCase().replace(".", "")
        )
      ) {
        ingredients.push(ingredient.ingredient.toLowerCase().replace(".", ""));
        ingredients.sort();
      }
    });
  });
  let list = { ingredients, ustensils, appareils };

  return list;
}

function init() {
  initCards();
  initDropdowns();
  console.log(extract(recipes, "id"));
}

init();
