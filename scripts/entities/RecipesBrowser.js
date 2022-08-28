import {
    extract
} from "../utils.js";
import {
    RecipeCard
} from "../factories/recipe-card.js";
import {
    Dropdown
} from "../factories/dropdown.js";

/* "La classe RecipesBrowser est une classe qui prend une liste de recettes et permet à l'utilisateur
de les filtrer et de les parcourir."
La classe a un constructeur qui prend une liste de recettes et initialise quelques propriétés :
this.recipesDB - la liste des recettes
this.filters - un objet qui contient les filtres
this.filteredRecipes - une liste de recettes qui ont été filtrées
this.searchedRecipes - une liste de recettes qui ont été recherchées
La classe a quelques méthodes :
init() - initialise la barre de recherche, les listes déroulantes et les cartes
onDropdownChange() - filtre les recettes, remplit les cartes et remplit les listes déroulantes
onSearchChange() - recherche les recettes, remplit les cartes et remplit les listes déroulantes
initSearchBar() - initialise la barre de recherche
initDropdowns() - crée une liste déroulante pour chaque catégorie de filtre et remplit les cartes
avec */
export class RecipesBrowser {
    constructor(recipes) {
        this.recipesDB = recipes;
        this.filters = {};
        this.filteredRecipes = [];
        this.searchedRecipes = [];
    }

    /**
     * Cette fonction initialise la barre de recherche, les listes déroulantes et les cartes.
     */
    init() {
        this.filteredRecipes = [...this.recipesDB];
        this.searchedRecipes = [...this.recipesDB];
        this.initSearchBar();
        this.initDropdowns(this.recipesDB);
        this.populateCards(this.recipesDB);
    }

    /**
     * "Lorsque la liste déroulante change, filtrez les recettes, remplissez les cartes et remplissez les
     * listes déroulantes."
     * 
     * La fonction est appelée lorsque la liste déroulante change.
     * 
     * La fonction filtre les recettes en fonction des filtres.
     * 
     * La fonction remplit les fiches en fonction des recettes filtrées.
     * 
     * La fonction remplit les listes déroulantes en fonction des recettes filtrées.
     * 
     * La fonction est appelée lorsque la liste déroulante change.
     * 
     * La fonction filtre les recettes en fonction des filtres.
     * 
     * La fonction remplit les fiches en fonction des recettes filtrées.
     * 
     * La fonction remplit les listes déroulantes en fonction des recettes filtrées.
     * 
     * La fonction est appelée lorsque la liste déroulante change.
     * 
     * La fonction filtre les recettes en fonction des filtres.
     * 
     * La fonction remplit les fiches en fonction des recettes filtrées.
     * 
     * La fonction renseigne
     */
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
        if(term.length >= 3) {
            this.searchedRecipes = this.searchRecipes(this.filteredRecipes, term);
            this.populateCards(this.searchedRecipes);
            this.populateDropdowns(this.searchedRecipes);
        }
    }

    /**
     * Lorsque l'utilisateur tape dans la barre de recherche, la fonction onSearchChange est appelée avec
     * la valeur de la barre de recherche comme argument.
     */
    initSearchBar() {
        const searchBar = document.getElementById("searchBar");
        searchBar.value = ""
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


/**
 * Il prend un tableau de recettes et pour chaque recette, il crée une nouvelle instance de la classe
 * RecipeCard, puis ajoute la carte au DOM.
 * 
 * La classe RecipeCard est définie dans le même fichier et ressemble à ceci :
 * @param recipes - un tableau d'objets
 */
    populateCards(recipes) {
        // for each recipe, instantiate, recipe card class
        const cardContainer = document.getElementById("cards");
        cardContainer.textContent = ""
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
        })
        if (cardContainer.textContent === "") {
            cardContainer.innerHTML = `<p id = "error-message" >
         Aucune recette ne correspond à votre critère... vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</p>`
        }
    }

/**
 * Il prend une liste de recettes, extrait les ingrédients et les ustensiles de chaque recette, puis
 * met à jour les listes déroulantes avec les ingrédients et les ustensiles extraits
 * @param recipes - un tableau d'objets, chaque objet est une recette
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
     * Il prend une liste de recettes et une liste de filtres, et renvoie une liste de recettes qui
     * correspondent aux filtres.
     * 
     * La fonction est un peu longue, mais ce n'est pas trop compliqué. C'est juste un tas de boucles
     * imbriquées.
     * 
     * La première boucle parcourt les recettes.
     * 
     * La deuxième boucle itère sur les ingrédients dans les filtres.
     * 
     * La troisième boucle parcourt les ingrédients de la recette.
     * 
     * La quatrième boucle itère sur les ustensiles dans les filtres.
     * 
     * La cinquième boucle parcourt les ustensiles de la recette.
     * 
     * La sixième boucle itère sur les appareils dans les filtres.
     * 
     * La septième boucle parcourt les appareils de la recette.
     * 
     * La fonction est un peu longue, mais ce n'est pas trop compliqué. C'est juste un tas de boucles
     * imbriquées.
     * @param recipes - une panoplie de recettes
     * @param filters - {
     * @returns Un tableau de recettes qui correspondent aux filtres.
     */
    filterRecipes(recipes, filters) {
        const fRecipes = [];
        recipes.forEach((r, i) => {
          let filter = false;
          if (filters.ingredients) {
            filters.ingredients.forEach((ingredient) => {
              let ingredientIsPresent = false;
              r.ingredients.forEach((ingredientRecipe) => {
                console.log(ingredientRecipe)
                if (ingredientRecipe.ingredient === ingredient) {
                  ingredientIsPresent = true;
                }
              });
              if (!ingredientIsPresent) {
                filter = true;
              }
              
            });
          }
      
      if(filters.ustensils) {
        filters.ustensils.forEach((ust) => {
          let ustensilesIsPresent = false;
          r.ustensils.forEach((ustensilsR ) => {
            if(ustensilsR === ust) {
              ustensilesIsPresent = true;
            }
        })
        if(!ustensilesIsPresent) {
          filter = true;
      }
        })
      }
        if(filters.appliance) {
          filters.appliance.forEach((app, ustIndex) => {
            let applianceIsPresent = false;
            if(app === r.appliance) {
              applianceIsPresent = true;
            }
          if(!applianceIsPresent) {
            filter = true;
        }
      })
        }
      
          if (!filter) {
            fRecipes.push(r);
          }
        })
        return fRecipes
    }

    /**
     * Il prend un tableau de recettes et une chaîne de recherche, et renvoie un tableau de recettes qui
     * correspondent à la chaîne de recherche
     * @param recipes - un tableau d'objets
     * @param search - le terme de recherche
     * @returns Un tableau de recettes qui correspondent aux critères de recherche.
     */
    
    searchRecipes(recipes, search) {
        const sRecipes = [];
        
        recipes.forEach((r) => {
            let filter = false;
                const reg = new RegExp(search, 'i')
                let ingredientMatch = false;
                r.ingredients.forEach((ingredient) => {
                    if (ingredient.ingredient.match(reg)) {
                        ingredientMatch = true;
                    }
                    
                })

                if (
                    !ingredientMatch &&
                    !r.description.match(reg) &&
                    !r.name.match(reg)
                ) {
                    filter = true;
                }
            if (!filter) {
                sRecipes.push(r);
            }
        })
        return sRecipes;
    }
}