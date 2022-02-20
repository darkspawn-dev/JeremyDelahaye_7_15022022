const DropdownItems = [
    "apples",
    "kiwis",
    "sucre",
    "bananes",
    "concombres",
    "banane",
    "thon",
  ];

  document.querySelectorAll('div.dropdown-filter-button').forEach(function (element) {
    element.addEventListener('click', function () {
      const button = this;
      button.style.display = 'none'

      const content = button.nextElementSibling;
      content.style.display = 'inline-block'
    })
  })

  document.querySelectorAll('span.dropdown-filter-content-close').forEach(function(element){
    element.addEventListener('click', function () {
      const span = this;
      const content = this.closest('div.dropdown-filter-content');
      content.style.display = 'none';

      const button = content.previousElementSibling;
      button.style.display = 'inline-block';
    })
  })

  document.querySelectorAll('input').forEach(function(element) {
    element.addEventListener('keyup', function() {
        init(dropdownItems.filter(v => v.match(this.value)))
    })
})

  function setFilterClick() {
    document.querySelectorAll('span.filter-element').forEach(function (element) {
      element.addEventListener('click', function () {
        console.log(this)
      })
    })
  }
  function init(items) {
    const itemsContainer = document.getElementsByClassName('dropdown-filter-content-items')[0]
    itemsContainer.innerHTML = "";
    for (let index = 0; index < items.length; index++) {
      const span = document.createElement('span')
      span.setAttribute("class", 'filter-element')
      span.textContent = items[index]
      itemsContainer.appendChild(span)
    }
    setFilterClick()
  }

init(DropdownItems);