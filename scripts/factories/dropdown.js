export class Dropdown {
  constructor(id, items, dataType, color, ingredients) {
    this.id = id;
    this.items = items;
    this.dataType = dataType;
    this.color = color;
    this.ingredients = ingredients;
  }

  init(container) {
    const dropdown = this.render();
    this.dropdown = dropdown;
    this.populate();
    // adds eventlistener
    this.addEvents(dropdown);
    container.appendChild(dropdown);
  }
  // creation des élements
  render() {
    const dropdown = document.createElement("div");
    dropdown.setAttribute("id", this.id);
    dropdown.setAttribute("class", "dropdown-filter");

    const button = document.createElement("div");
    button.setAttribute("class", `dropdown-filter-button ${this.colorClass()}`);
    const p = document.createElement('p');
    p.textContent = this.dataType;
    button.appendChild(p);
 
    dropdown.appendChild(button);


    const icon = document.createElement("span");
    icon.setAttribute("class", "oi oi-chevron-bottom");
    button.appendChild(icon);

    const content = document.createElement("div");
    content.setAttribute("class", `dropdown-filter-content ${this.colorClass()}`);
 
    dropdown.appendChild(content);

    const searchBar = document.createElement("div");
    searchBar.setAttribute("class", "dropdown-filter-content-searchbar");
    content.appendChild(searchBar);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Rechercher un ingredient");
    input.setAttribute("class", this.colorClass());

    searchBar.appendChild(input);

    const close = document.createElement("span");
    close.setAttribute("class", "dropdown-filter-content-close");
    close.textContent = "close";
    searchBar.appendChild(close);

    const items = document.createElement("div");
    items.setAttribute("class", "dropdown-filter-content-items");
    content.appendChild(items);

    return dropdown;
  }

  colorClass() {
    switch (this.color) {
      case 'red':
        return 'color__red';
      case 'green':
        return 'color__green';
      default:
        return 'color__default';
    }
  }

  // function filtres bouton dropdowns
  populate(filter) {
    const items = this.items.filter((v) => v.match(filter));
    const itemsContainer = this.dropdown.querySelector(
      "div.dropdown-filter-content-items"
    );
    itemsContainer.textContent = "";
    for (const item of items) {
      const span = document.createElement("span");
      span.setAttribute("class", "filter-element");
      span.textContent = item;
      itemsContainer.appendChild(span);
    }
  }
 
  //addEventlistener des bouton dropdowns
  addEvents(dropdown) {
    const filterButton = dropdown.querySelector("div.dropdown-filter-button");
    filterButton.addEventListener("click", function () {
      const button = this;
      button.style.display = "none";

      const content = button.nextElementSibling;
      content.style.display = "inline-block";
    });
    const close = dropdown.querySelector("span.dropdown-filter-content-close");
    close.addEventListener("click", function () {
      const span = this;
      const content = this.closest("div.dropdown-filter-content");
      content.style.display = "none";

      const button = content.previousElementSibling;
      button.style.display = "inline-block";
    });

    const key = dropdown.querySelector("input");
    key.addEventListener("keyup", (e) => this.populate(e.target.value));
  }
}
