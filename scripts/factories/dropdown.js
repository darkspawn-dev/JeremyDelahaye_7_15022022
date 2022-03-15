// creation de la class dropdown
export class Dropdown {
  constructor(
    id,
    items,
    dataType,
    badgeContainer,
    filters,
    populateCards,
    color
  ) {
    this.id = id;
    this.items = items;
    this.dataType = dataType;
    this.color = color;
    this.badgeContainer = badgeContainer;
    filters[dataType] = [];
    this.filters = filters;
    this.populateCards = populateCards;
  }

  // init les composants
  init(container) {
    const dropdown = this.render();
    this.dropdown = dropdown;
    this.populate();
    // adds eventlistener
    this.addEvents(dropdown);
    container.appendChild(dropdown);
  }

  // creation des élements de la dropdown
  render() {
    const dropdown = document.createElement("div");
    dropdown.setAttribute("id", this.id);
    dropdown.setAttribute("class", "dropdown-filter");

    const button = document.createElement("div");
    button.setAttribute("class", `dropdown-filter-button ${this.colorClass()}`);
    const p = document.createElement("p");
    p.setAttribute("class", "dropdownTitle")
    p.textContent = this.dataType;
    button.appendChild(p);

    dropdown.appendChild(button);

    const icon = document.createElement("span");
    icon.setAttribute("class", "oi oi-chevron-bottom");
    button.appendChild(icon);

    const content = document.createElement("div");
    content.setAttribute(
      "class",
      `dropdown-filter-content ${this.colorClass()}`
    );
    dropdown.appendChild(content);

    const searchBar = document.createElement("div");
    searchBar.setAttribute("class", "dropdown-filter-content-searchbar");
    content.appendChild(searchBar);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", `${this.input()}`);
    input.setAttribute("class", this.colorClass());

    searchBar.appendChild(input);

    const close = document.createElement("span");
    close.setAttribute("class", "dropdown-filter-content-close");
    searchBar.appendChild(close);

    const iconUp = document.createElement("span");
    iconUp.setAttribute("class", "oi oi-chevron-top");
    close.appendChild(iconUp);

    const items = document.createElement("div");
    items.setAttribute("class", "dropdown-filter-content-items");
    content.appendChild(items);

    return dropdown;
  }

  // création class pour le placeholder des input
  input() {
    return `Rechercher un ${this.dataType}`;
  }
  // création de la class color pour les filtres
  colorClass() {
    switch (this.color) {
      case "red":
        return "color__green";
      case "green":
        return "color__red";
      default:
        return "color__default";
    }
  }

  // function filtres bouton dropdowns
  populate(filter) {
    const items = this.items.filter((v) =>
      v.toLowerCase().match(filter ? filter.toLowerCase() : undefined)
    );
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

    close.addEventListener("click", function (e) {
      // const span = this;
      const content = this.closest("div.dropdown-filter-content");
      content.style.display = "none";

      const button = content.previousElementSibling;
      button.style.display = "inline-block";
    });

    const key = dropdown.querySelector("input");
    key.addEventListener("keyup", (e) => {
      this.populate(e.target.value);
      this.addEvents(this.dropdown);
    });

    // addeventlistener on item
    const selectItem = dropdown.querySelectorAll("span.filter-element");
    selectItem.forEach((item) => {
      item.addEventListener("click", (e) =>
        this.appendBadge(e.target.textContent)
      );
    });
  }

  appendBadge(value) {
    // create badge with value & color

    const badge = document.createElement("span");
    badge.setAttribute("class", `badge badge-primary ${this.colorClass()}`);
    badge.textContent = value;

    const icon = document.createElement("p");
    icon.setAttribute("class", "oi oi-circle-x");
    badge.appendChild(icon);

    this.badgeContainer.appendChild(badge);
    this.filters[this.dataType].push(value);

    icon.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      this.filters[this.dataType] = this.filters[this.dataType].filter(
        (i) => i !== value
      );
      this.populateCards();
    });

    this.populateCards();
  }
}
