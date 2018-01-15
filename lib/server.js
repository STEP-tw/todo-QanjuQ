let fs = require('fs');

const lib = require('./serverLib.js');
const fileUtils = require('./fileUtils.js').fileUtils;
const WebApp = require('./webapp');
const utils = require('./serverUtils.js').loadUser;
let registered_users = [{userName:'Anju',name:'anjum'}];

let userDetails = fs.readFileSync('./public/data/users.json','utf8');
userDetails = JSON.parse(userDetails);

const respondWithFile = function(req,res){
  let callBack = function(err,data){
    if(err){
      res.resourceNotFoundHandler();
      return;
    }
    if(is(req.filepath)){
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
app.use(utils.logger,'_preprocess');
app.use(utils.loadUser,'_preprocess');

app.use(fileUtils.getFilePath,'_postprocess');
app.use(fileUtils.getContentType,'_postprocess');
app.use(respondWithFile,'_postprocess');

app.get('/',lib.handleSlash);
app.post('/login.html',lib.userLogin);
app.get('/logout',lib.userLogout);
app.get('/todos',lib.getTodoLists);
app.post('/create',lib.createTodo);


exports.app = app;
