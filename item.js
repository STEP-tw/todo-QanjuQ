class Item{
  constructor(title,content){
    this.title = title;
    this.content = content;
    this.done = false;
  }
  getTitle(){
    return this.title;
  }
  getContent(){
    return this.content;
  }
  getStatus(){
    return this.done;
  }
  changeStatus(){
    this.done = !this.done;
  }
}

module.exports = Item;
