const fs = require('fs');
const User = require('./user.js');
const toS = o=>JSON.stringify(o,null,2);
// const Date = require('date');

class Users{
  constructor(root, fs=fs){
    this.root = root;
    this.fs = fs;
  }

  getUsers(){
    let content = this.fs.readFileSync(this.root,'utf8');
    return JSON.parse(content);
  }

  updateUsers(content){
    this.fs.writeFileSync(this.root,toS(content));
  }

  usernameExists(username){
    let users = Object.keys(this.getUsers());
    return users.includes(username);
  }

  addUser(name,username,password){
    if(this.usernameExists(username)){
      throw Error("can't create user");
    }
    let users = getUsers();
    let user = new User(username,name,password);
    users[username] = user;
    this.updateUsers(users);
  }

  updateUserDetails(user){
    let users = this.getUsers();
    users[user.username] = user;
    this.updateUsers(users);
  }

  getParticularUser(field,value){
    let validUser;
    let users = this.getUsers();
    let usernames = Object.keys(users);
    usernames.forEach(function(username){
      let user = users[username];
      if(user[field] == value){
        validUser = user;
      }
    });
    return validUser;
  }

  createTodo(userObj,title){
    userObj.createTodo(title);
    let username = userObj.username;
    let user = this.getUsers()[username];
    user.todos[title] = new Date().toLocaleString();
    this.updateUserDetails(user);
  }
}

const create = function(){
  let users = new Users('./public/data/users.JSON',fs);
  return users;
}


exports.create = create;
