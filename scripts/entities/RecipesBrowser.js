import {
    extract
} from "../utils.js";
import {
    RecipeCard
} from "../factories/recipe-card.js";
import {
    Dropdown
} from "../factories/dropdown.js";

export class RecipesBrowser {
    constructor(recipes) {
        this.recipesDB = recipes;
        this.filters = {};
        this.filteredRecipes = [];
        this.searchedRecipes = [];
    }

    init() {
        this.filteredRecipes = [...this.recipesDB];
        this.searchedRecipes = [...this.recipesDB];
        this.initSearchBar();
        this.initDropdowns(this.recipesDB);
        this.populateCards(this.recipesDB);
    }

    onDropdownChange() {
        this.filteredRecipes = this.filterRecipes(this.searchedRecipes, this.filters);
        this.populateCards(this.filteredRecipes);
        this.populateDropdowns(this.filteredRecipes);
    }

    /**
     * Si le terme de recherche comporte au moins 3 caractères, recherchez les recettes et remplissez les
     * cartes et les listes déroulantes avec les résultats. Sinon, remplissez les cartes et les listes
     * déroulantes avec les recettes filtrées.
     * @param term - le terme de recherche
     */
    onSearchChange(term) {
        this.searchedRecipes = term.length >= 3 ? this.searchRecipes(this.filteredRecipes, term) : [...this.filteredRecipes];
        this.populateCards(this.searchedRecipes);
        this.populateDropdowns(this.searchedRecipes);
    }

    initSearchBar() {
        const searchBar = document.getElementById("searchBar");
        searchBar.addEventListener("keyup", (e) => {
            const term = e.target.value;
            this.onSearchChange(term);
        });
    }

    /**
     * Créez une liste déroulante pour chaque catégorie de filtres et remplissez les cartes avec les
     * recettes qui correspondent aux filtres
     * @param recipes - la liste des recettes à utiliser dans le menu déroulant
     */
    initDropdowns(recipes) {
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
            this.filters,
            () => this.onDropdownChange(),
            "Ingrédients"
        );
        ingredientDropdown.init(dropdownContainer);

        const applianceDropdown = new Dropdown(
            "appliance-dropdown",
            appareilsList,
            "appliance",
            badgeContainer,
            this.filters,
            () => this.onDropdownChange(),
            "Appareils",
            "red"
        );
        applianceDropdown.init(dropdownContainer);

        const ustensils = new Dropdown(
            "ustensils-dropdown",
            ustensilsList,
            "ustensils",
            badgeContainer,
            this.filters,
            () => this.onDropdownChange(),
            "Ustensiles",
            "green"
        );
        ustensils.init(dropdownContainer);

        this.ingredientsDropdown = ingredientDropdown;
        this.ustensilsDropdown = ustensils;
        this.applianceDropdown = applianceDropdown;
    }

    populateCards(recipes) {
        // for each recipe, instantiate, recipe card class
        const cardContainer = document.getElementById("cards");
        cardContainer.textContent = "";

        recipes.forEach((r) => {
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
 * Il prend une liste de recettes, extrait les ingrédients, les ustensiles et les appareils de chaque
 * recette, puis met à jour les listes déroulantes avec les listes extraites
 * @param recipes - un tableau d'objets
 */
    populateDropdowns(recipes) {
        const ingredientsList = extract(
            extract(recipes, "ingredients"),
            "ingredient"
        );
        const ustensilsList = extract(recipes, "ustensils");

        const appareilsList = extract(recipes, "appliance");

        this.ingredientsDropdown.updateItems(ingredientsList);
        this.ustensilsDropdown.updateItems(ustensilsList);
        this.applianceDropdown.updateItems(appareilsList);
    }

 /**
  * Il prend un tableau de recettes et un objet de filtres, et renvoie un tableau de recettes qui
  * correspondent aux filtres.
  * @param recipes - une panoplie de recettes
  * @param filters - {
  * @returns Un tableau de recettes qui correspondent aux filtres.
  */
    filterRecipes(recipes, filters) {
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
            if (!filter) {
                fRecipes.push(r);
            }
        }
        return fRecipes
    }

    searchRecipes(recipes, search) {
        return recipes.filter((r) => {
            let filter = false;

            const reg = new RegExp(search, 'i')
            const ingredientMatch = r.ingredients.find((i) => i.ingredient.match(reg)) || false

            if (
                !ingredientMatch &&
                !r.description.match(reg) &&
                !r.name.match(reg)
            ) {
                filter = true;
            }


            return !filter
        })
    }


}