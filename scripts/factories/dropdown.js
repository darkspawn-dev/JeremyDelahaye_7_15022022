export class Dropdown {
    constructor(id, items, dataType, color) {
        this.id = id
        this.items = items;
        this.dataType = dataType;
        this.color = color;
    }

    init(container) {
        container.appendChild(this.render())
    }

    render() {
        const dropdown = document.createElement("div");
        dropdown.setAttribute("id", "dropdown-filter");

        const button = document.createElement("div");
        button.setAttribute("class", "dropdown-filter-button");
        button.textContent = ("ingredients");
        dropdown.appendChild(button);

        const content = document.createElement("div");
        content.setAttribute("class", "dropdown-filter-content");

        const searchBar = document.createElement("div");
        searchBar.setAttribute("class", "dropdown-filter-content-searchbar");

        const input = document.createElement("input");
        input.setAttribute("input");

        const close = document.createElement("span");
        close.setAttribute("class", "dropdown-filter-content-close");

        const items = document.createElement("div");
        items.setAttribute("dropdown-filter-content-items")

        return dropdown
    }
}