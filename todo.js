let Item = require('./item.js');

class Todo{
  constructor(title){
    this.title = title;
    this.description = "";
    this.items = {};
    this.src = `./${title}.JSON`;
    this.itemId = 0;
  }

  getTitle(){
    return this.title;
  }

  getDescription(){
    return this.description;
  }

  createItem(title,content){
    this.items[++this.itemId] = new Item(title,content);
  }

  getItemWithTitle(title){
    let itemKeys = Object.keys(this.items);
    itemKeys.forEach()

  }

  deleteItem(title){
    let itemToDelete = this.items.find(item => item.getTitle() == title)
    delete this.items[itemToDelete.getTitle()];
  }

  getItems(){
    return this.items;
  }
}

module.exports = Todo;
