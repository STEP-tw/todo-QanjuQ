const response = require('./responses.js');
const fileUtils = require('./fileUtils.js');
const fs = require('fs');
const User = require('./user.js');
const users = require('./users.js').create();

let sessionIdCounter = 100001;

let handlers = {};

handlers.postLogin = function(req,res){
  let username = req.body.username;
  let password = req.body.password;
  let user = users.getParticularUser('username',username);
  if(user){
    if(user.password != password){
      res.setHeader('Set-Cookie',[`message=wrong password; Max-Age=5`]);
      res.write("<h1>wrong password</h1>");
      res.end();
      return;
    }
    user.sessionid = (sessionIdCounter++).toString();
    res.setHeader('Set-Cookie',[`sessionid=${user.sessionid}`,`login=true`]);
    res.setHeader('Content-Type','text/html');
    res.write('<a href="/home.html">create todos start</a>');
    // res.redirect('/home.html');
    res.end();
    users.updateUserDetails(username,user);
    return;
  }
  res.setHeader('Set-Cookie',[`message=you need to register`]);
  res.end("you need to register");
}

handlers.handleSlash = function(req,res){
  req.url = '/index.html';
  fileUtils.getFilePath(req);
  fileUtils.getContentType(req);
  response.serveStaticFile(req,res);
}

handlers.userLogout = function(req,res){
  res.setHeader('Set-Cookie',[`login=false; Max-Age=5`,'sessionid=0; Max-Age=5']);
  res.redirect('/index.html');
}

handlers.createTodo = function(){
  let title = req.body.title;
  let name = 'Anjum';
  userDetails[name].todos[title] = `./public/data/${name}/${title}.json`;
  writeJsonFile('./public/data/users.JSON',userDetails);
  let todo = {title:title,description:''};
  fs.openSync(`./public/data/${name}/${title}.JSON`,'w+');
  writeJsonFile(`./public/data/${name}/${title}.json`,todo);
  res.statusCode = 200;
  res.end();
}

handlers.getLogin = function(req,res){
  res.setHeader('Content-Type','text/html');
  res.write(`
      Username:<input type = "text" name = "username" id="uname"><br/>
      Password:<input type = "password" name = "password" id = "password"/><br/>
      <button id = "login">Login</button><br/>
      <h3 id = "messagebox"></h3>`)
  res.end();
}

handlers.getTodoLists = function(req,res){
  let user = users.getParticularUser('sessionid',req.user.sessionid);
  user.__proto__ = new User().__proto__;
  let todos = user.getListOfTodos();
  res.setHeader('Content-Type','text/javascript');
  res.write(`${todos}`);
  res.end();
}

handlers.createTodo = function(req,res){
  let user = users.getParticularUser('sessionid',req.user.sessionid);
  user.__proto__ = new User().__proto__;
  users.createTodo(user,req.body.title);
  res.end();
}

module.exports = handlers;
