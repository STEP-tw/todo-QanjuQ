const fs = require('fs');
const User = require('./lib/user.js');

const toS = o=>JSON.stringify(o,null,2);
const registerUser = function(name,username,password){
  let users = fs.readFileSync('./public/data/users.JSON','utf8');
  users = JSON.parse(users);
  let user = new User(username,name,password);
  users[username] = user;
  fs.writeFileSync('./public/data/users.JSON',toS(users));
};

registerUser('Anjum Qureshi','anju','0000');
registerUser('Anjum K','anjum','0000');
