let fs = require('fs');

const User = require('./lib/user.js');
const handlers = require('./lib/handlers.js');
const fileUtils = require('./lib/fileUtils.js');
const WebApp = require('./lib/webapp');

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

const getUsersList = function(){
  let users = fs.readFileSync('./public/data/users.json');
  return JSON.parse(users);
}

const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  // console.log(sessionid);
  let users = getUsersList();
  let present_users = Object.keys()
  let username = present_users.filter(username=>{
    return users[username].sessionid = sessionid;
  });
  let activeUser = users[username[0]];
  if(sessionid && activeuser){
    req.user = activeUser;
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
  if(['/login','/','/index.html'].includes(req.url) && req.user)
    res.redirect('/home.html');
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
app.post('/login',(req,res)=>{
  let users = handlers.postLogin(req,res,getUsersList());
  fs.writeFileSync(users);
});
app.post('/createTodo',handlers.createTodo);

loadData();

exports.app = app;
