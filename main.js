import recipes from "./scripts/data/recipes.js";
import { RecipeCard } from "./scripts/factories/recipe-card.js";

function init() {
  // for each recipe, instantiate, recipe card class
  const cardContainer = document.getElementById("cards");
  recipes.forEach((r) => {
    const { name, ingredients, description, time } = r;
    const card = new RecipeCard(name, ingredients, description, time).render();
      // append cards to dom
      cardContainer.appendChild(card);
  });
}

init();
