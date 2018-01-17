let response = require('./responses.js');
let fileUtils = require('./fileUtils.js');
let fs = require('fs');
let handlers = {};

let sessionIdCounter = 100001;


handlers.postLogin = function(req,res,users){
  let username = req.body.username;
  let password = req.body.password;
  let getValidUser = function(user){
    return user.username == username;
  }
  let present_users = Object.keys()
  let usernames = present_users.filter(u=>{
    return users[u].username = username;
  });
  let activeUser = users[usernames[0]];
  if(activeUser){
    if(activeUser.password != password){
      res.setHeader('Set-Cookie',[`message=wrong password; Max-Age=5`]);
      res.write("<h1>wrong password</h1>");
      res.end();
      return;
    }
    activeUser.sessionid = sessionIdCounter++;
    res.setHeader('Set-Cookie',[`sessionid=${user.sessionid}`,`login=true`]);
    res.redirect('/home.html');
    users[usernames[0]] = activeUser;
    return users;
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

handlers.getLogin = function(req,res){
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
