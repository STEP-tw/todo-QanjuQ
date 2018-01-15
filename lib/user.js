const fs = require('fs');

let utils = {};

utils.createDirectory = function(name){
  fs.mkdirSync('./data/' + name);
  return './data' + name;
};

utils.deleteTodoFile = function(path){
  fs.unlinkSync(path);
}

utils.createTodoFile = function(path){
  fs.openSync(path,'w+');
}

utils.writeTodoFile = function(path,content){
  fs.writeFileSync(path, JSON.stringify(content,null,2));
}

class User{
  constructor(name,password){
    this.name = name;
    this.password = password;
    this.todos = {};
    this.dir = utils.createDirectory(name);
  }

  createTodo(title){
    let todo = new Todo(title);
    this.todos[title] =  todo;
    utils.writeTodoFile(`${this.dir}${title}.JSON`,todo);
  }

  deleteTodo(title){
    delete this.todos[title];
    utils.deleteTodoFile(`${this.dir}${title}.JSON`);
  }

  getTodoSrc(title){
    return title;
  }
}

// 126833926

module.exports = User;
