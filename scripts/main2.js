import recipes from "./data/recipes.js";
import { RecipesBrowser } from "./entities/RecipesBrowser.js";

const browser = new RecipesBrowser(recipes);
browser.init();
