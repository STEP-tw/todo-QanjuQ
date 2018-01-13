let fs = require('fs');
const fileUtils = require('./fileUtils.js').fileUtils;
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
let registered_users = [{userName:'Anju',name:'anjum'}];
const toS = o=>JSON.stringify(o,null,2);

let userDetails = fs.readFileSync('./public/data/users.json','utf8');
userDetails = JSON.parse(userDetails);

const logRequest = (req,res)=>{
  let text = ['<<<<<<==============================>>>>>>>',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const respondWithFile = function(req,res){
  let callBack = function(err,data){
    if(err){
      res.resourceNotFoundHandler();
      return;
    }
    if(fileUtils.isJsonFile(req.filepath)){
      data = JSON.parse(data);
    }
    res.resourceFoundHandler(req.contentType,data);
  };
  fileUtils.readFile(req.filepath,callBack);
}

let writeJsonFile = function(filepath,content){
  fs.writeFile(filepath,toS(content),(err)=>{
    if(err) throw err; });
};

let app = WebApp.create();
app.use(logRequest,'_preprocess');
app.use(loadUser,'_preprocess');

app.use(fileUtils.getFilePath,'_postprocess');
app.use(fileUtils.getContentType,'_postprocess');
app.use(respondWithFile,'_postprocess');

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});

app.post('/login.html',(req,res)=>{
  let user = registered_users.find(user=>user.userName == req.body.username);
  console.log(req.cookies.login);
  if(user || (!req.cookies.login)){
    res.setHeader('Set-Cookie','login=true')
    res.redirect('/home.html');
  }
  res.end("please login");
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',`login=false,Expires=${new Date().toUTCString()}`);
  res.redirect('/index.html');
});

app.get('/todos',(req,res)=>{
  res.write(toS(userDetails["Anjum"]["todos"]));
  res.end();
});

app.post('/create',(req,res)=>{
  let title = req.body.title;
  let name = 'Anjum';
  userDetails[name].todos[title] = `./public/data/${name}/${title}.json`;
  writeJsonFile('./public/data/users.JSON',userDetails);
  let todo = {title:title,description:''};
  fs.openSync(`./public/data/${name}/${title}.JSON`,'w+');
  writeJsonFile(`./public/data/${name}/${title}.json`,todo);
  res.statusCode = 200;
  res.end();
});


exports.app = app;
