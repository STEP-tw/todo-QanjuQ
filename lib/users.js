const fs = require('fs');
const User = require('./user.js');

const toS = o=>JSON.stringify(o,null,2);

const getUsers = function(){
  let content = fs.readFileSync('./public/data/users.JSON','utf8');
  return JSON.parse(content);
}

const updateUsers = function(content){
  fs.writeFileSync('./public/data/users.JSON',toS(content));
}

const addUser = function(name,username,password){
  let users = getUsers();
  let user = new User(username,name,password);
  users[username] = user;
  updateUsers(users);
}

addUser('Anjum Qureshi','anju','0000');
addUser('Anjum K','anjum','0000');

const updateUserDetails = function(username,field,value){
  let users = getUsers();
  users[username].field = value;
  updateUsers(users);
}

const getParticularUser = function(field,value){
  let user;
  let users = getUsers();
  let usernames = Object.keys(users);
  usernames.forEach(function(username){
    if(users[username][field] == value){
      user = users[username];
      return;
    }
  });
}

exports.getParticularUser = getParticularUser;
