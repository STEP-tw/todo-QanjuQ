const fs = require('fs');

const Todo = require('./todo.js');
let utils = {};

utils.createDirectory = function(name){
  if(!fs.existsSync(`./public/data/${name}`)){
    fs.mkdirSync(`./public/data/${name}`);
  }
  return `./public/data/${name}`;
};

utils.deleteTodoFile = function(path){
  fs.unlinkSync(path);
}

utils.readTodoFile = function(path){
  let content = fs.readFileSync(path,'utf8');
  return JSON.parse(content);
}

utils.createTodoFile = function(path){
  fs.openSync(path,'w+');
}

utils.writeTodoFile = function(path,content){
  fs.writeFileSync(path, JSON.stringify(content,null,2));
}

class User{
  constructor(username,name,password){
    this.username = username;
    this.name = name;
    this.password = password;
    this.todos = {};
    this.dir = utils.createDirectory(username);
  }

  createTodo(title){
    let todo = new Todo(title);
    this.todos[title] =  todo;
    utils.writeTodoFile(`${this.dir}/${title}.JSON`,todo);
  }

  deleteTodo(title){
    delete this.todos[title];
    utils.deleteTodoFile(`${this.dir}/${title}.JSON`);
  }

  getTodo(title){
    let todo = utils.readTodoFile(`./${this.dir}/${title}.JSON`);
    todo.__protot__ = new Todo().__protot__;
    return todo;
  }

  getListOfTodos(){
    return Object.keys(this.todos);
  }
}


module.exports = User;
