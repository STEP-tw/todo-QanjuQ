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
    let item = this.getItemWithTitle(title);
    if(item){
      let itemKey = Object.keys(item);
      this.items[itemKey] = new Item(title,content);
      return;
    }
    this.items[++this.itemId] = new Item(title,content);
  }
  getItemWithTitle(title){
    let itemKeys = Object.keys(this.items);
    let itemToDelete;
    let items = this.getItems();
    itemKeys.forEach((key)=>{
      if(items[key].isTitleSameAs(title)){
        itemToDelete = {[key]:items[key]};
      }
    });
    return itemToDelete;
  }

  deleteItem(title){
    let itemKey = Object.keys(this.getItemWithTitle(title));
    delete this.items[itemKey];
  }

  getItems(){
    return this.items;
  }
}

module.exports = Todo;
