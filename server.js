let fs = require('fs');

const User = require('./lib/user.js');
const handlers = require('./lib/handlers.js');
const fileUtils = require('./lib/fileUtils.js');
const WebApp = require('./lib/webapp');
const users = require('./lib/users.js').create();

const toS = o=>JSON.stringify(o,null,2);

const timeStamp = ()=>{
  let t = new Date();
  return `${t.toDateString()} ${t.toLocaleTimeString()}`;
};

const logger = (req,res)=>{
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
  let user = users.getParticularUser('sessionid',sessionid);
  if(sessionid && user){
    req.user = user;
  }
};


let loadData = function(){
  let userDetails = [];
  fs.readFile('./public/data/users.JSON','utf8',
  (err,data)=>{
    if(err){
      if(!fs.existsSync('./public/data')){
        fs.mkdirSync('./public/data');
      }
      fs.writeFileSync('./public/data/users.JSON',toS(userDetails));
      return;
    }
    userDetails = JSON.parse(data);
  });
}

const redirectLoggedinUsersToHome = function(req,res){
  if(['/login','/'].includes(req.url) && req.user){
    res.redirect('/home.html');
  }
}


let app = WebApp.create();
app.use(logger,'_preprocess');
app.use(loadUser,'_preprocess');
app.use(redirectLoggedinUsersToHome,'_preprocess');

app.use(fileUtils.getFilePath,'_postprocess');
app.use(fileUtils.getContentType,'_postprocess');

app.get('/',handlers.handleSlash);
app.get('/logout',handlers.userLogout);
app.get('/todos',handlers.getTodoLists);
app.get('/login',handlers.getLogin);
app.post('/login',handlers.postLogin);
app.post('/createTodo',handlers.createTodo);

loadData();

exports.app = app;
