import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

//creating a function that holds all the menu items in a dictionary
//essentially we are mapping the menu item to its respective type of item
const menuDictionary = menuItems.reduce((typeDict, menuItem) => {
  //check if there is an array existing for current menu item type 
  //if not create an empty array for current menu item type
  typeDict[menuItem.type] = typeDict[menuItem.type] || [];

  //push current menu item into array, essentially append it
  typeDict[menuItem.type].push(menuItem);

  //this function will return the type of menu item
  return typeDict;
}, {}); 

//sort items in each type by menuOrder
Object.values(menuDictionary).forEach((type) =>
  type.sort((a, b) => a.menuOrder - b.menuOrder)
);


//menu item function, to output menu items 
const menuItem = ({ name, price, description, spicy }) => {
  //create div for item on the menu list
  const item = document.createElement("div");
  //variable to hold if item is spicy or not
  var spicyCheck = "";
  //if the item is spicy, set the variable spicy check to spicy
  if (spicy) {
    spicyCheck = "spicy";
  }

  //this is out html output, this is the structure of every menu item
  var htmlOutput = `<div id="${name}" class="disclaimer ${spicyCheck} menu-item">
      <h4 class="item-name">${name}</h4>
      <h4 class="item-price">$${price}</h4>
      <h5 class="item-description">
          ${description}
      </h5>
    </div>`;

  item.innerHTML = htmlOutput;
  return item;
};

//nested for loop
//Go through each type of food
Object.keys(menuDictionary).forEach((type) =>
  //Go through each item in type of food
  menuDictionary[type].forEach((item) =>
    document.getElementById(type).appendChild(menuItem(item))
  )
);

//filter spicy menu items
const filterMenuItems = (e) => {
  const spicyItems = Array.from(
    document.getElementsByClassName("spicy menu-item")
  );

  //toggle visibility of items
  spicyItems.forEach((item) => item.classList.toggle("hidden"));
};

//add eventlistener to checkbox
const spicyCheckbox = document.getElementById("spicy-checkbox");
spicyCheckbox.addEventListener("change", filterMenuItems);
