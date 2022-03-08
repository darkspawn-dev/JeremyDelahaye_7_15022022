export const search = (array, input) => {
    
    const form = document.createElement("form");

    const formDiv = document.createElement("div");
    form.setAttribute("class", "form-group");
    form.appendChild(formDiv);

    const input = document.createElement("input");
    input.setAttribute("class", "form-control form-control-lg");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Rechercher une recette");
    formDiv.appendChild(input);

    const icon = document.createElement("p")
    icon.setAttribute("class", "oi-magnifying-glass");
    input.appendChild(icon);

}
