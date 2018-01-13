const fs = require('fs');
class User{
  constructor(name){
    this.name = name;
    this.todos ={};
  }
  createTodo(title){
    let todo = new Todo(title);
    fs.openSync('')
  }
}
