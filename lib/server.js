let fs = require('fs');

const handlers = require('./handlers.js');
const fileUtils = require('./fileUtils.js').fileUtils;
const WebApp = require('./webapp');
const utils = require('./serverUtils.js').loadUser;
let registered_users = [{userName:'Anju',name:'anjum'}];

let userDetails = {};
let loadData = function(){
  fs.readFile('./public/data/users.JSON','utf8',
  (err,data)=>{
    if(err){
      if(!fs.existsSync('./public/data')){
        fs.mkdirSync('./public/data');
      }
      fs.writeFileSync('./public/data/users.JSON',JSON.stringify(userDetails,null,2));
      return;
    }
    userDetails = JSON.parse(data);
  });
}


let app = WebApp.create();
app.use(utils.logger,'_preprocess');
app.use(utils.loadUser,'_preprocess');

app.use(fileUtils.getFilePath,'_postprocess');
app.use(fileUtils.getContentType,'_postprocess');
app.use(responses.serveStaticFile,'_postprocess');

app.get('/',handlers.handleSlash);
app.post('/login.html',handlers.userLogin);
app.get('/logout',handlers.userLogout);
app.get('/todos',handlers.getTodoLists);
app.post('/create',handlers.createTodo);

loadData();

exports.app = app;
