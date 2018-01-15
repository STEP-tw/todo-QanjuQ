let handlers = {};

handlers.userLogin = function(req,res){
  let user = registered_users.find(user=>user.userName == req.body.username);
  console.log(req.cookies.login);
  if(user || (!req.cookies.login)){
    res.setHeader('Set-Cookie','login=true');
    res.redirect('/home.html');
  }
  res.end("please login");
}

handlers.handleSlash = function(req,res){
  req.filepath = '/index.html';
  respondWithFile(req,res);
}

handlers.userLogout = function(req,res){
  res.setHeader('Set-Cookie',`login=false,Expires=${new Date().toUTCString()}`);
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

exports.handlers = handlers;
