let response = require('./responses.js');
let fileUtils = require('./fileUtils.js');
let fs = require('fs');
let handlers = {};

let sessionIdCounter = 100001;

handlers.userLogin = function(req,res,users){
  let username = req.body.username;
  let password = req.body.password;
  let validUser = function(user){
    return user.username == username;
  }
  let user = users.find(validUser);
  if(user){
    if(user.password != password){
      res.setHeader('Set-Cookie',[`message=wrong password`]);
      res.end();
      return;
    }
    user.sessionid = sessionIdCounter++;
    res.setHeader('Set-Cookie',[`sessionid=${user.sessionid}`,`login=true`]);
    res.redirect('/home.html');
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
  res.setHeader('Set-Cookie',`login=false; Max-Age=5`);
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

handlers.serveLoginForm = function(req,res){
  res.setHeader('Content-Type','text/html');
  res.write(`<form method = "post" action = "/login">
      Username:<input type = "text" name = "username"><br/>
      Password:<input type = "password" name = "password"/><br/>
      <input type = "submit" value = "Login"/>
    </form>`)
  res.end();
}

handlers.getTodoLists = function(req,res){
  console.log(req.user);
  res.end();
}
module.exports = handlers;
