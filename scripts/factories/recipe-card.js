// creation de la class card
export class RecipeCard {
  constructor(title, ingredients, description, duration) {
    this.title = title;
    this.ingredients = ingredients;
    this.description = description;
    this.duration = duration;
  }
// creation des élements cards
  render() {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    card.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.appendChild(cardBody);

    const h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.textContent = this.title;
    cardBody.appendChild(h5);

    const duration = document.createElement("span");
    duration.setAttribute("class", "oi oi-clock");
    cardBody.appendChild(duration);
    duration.textContent = ` ${this.duration} min`;

    const ingredients = document.createElement("div");
    ingredients.setAttribute("class", "ingredients");
    cardBody.appendChild(ingredients);

    const ul = document.createElement("ul");
    ingredients.appendChild(ul);

    this.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      ul.appendChild(li);

      const span = document.createElement("span");
      span.setAttribute("class", "ingredients-list");
      span.textContent = ingredient.ingredient;
      li.appendChild(span);

      const quantitySpan = document.createElement('span');
      li.appendChild(quantitySpan)
      if (ingredient.quantity && ingredient.unit) {        
        quantitySpan.textContent = `: ${ingredient.quantity} ${ingredient.unit}`; 
      } else if (ingredient.quantity) {
        quantitySpan.textContent = `: ${ingredient.quantity}`;
      }
    });

    const description = document.createElement("div");
    description.setAttribute("class", "description");
    description.textContent = this.description;
    cardBody.appendChild(description);

    return card;
  }
}
