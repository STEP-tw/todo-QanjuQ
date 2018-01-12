let fs = require('fs');
const fileUtils = require('./fileUtils.js').fileUtils;
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
let registered_users = [{userName:'anju',name:'anjum'}];
const toS = o=>JSON.stringify(o,null,2);

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
    res.resourceNotFoundHandler(req.contentType,data);
  }
  fileUtils.readFile(req.filepath,callBack);
}

let app = WebApp.create();
app.use(logRequest,'_preprocess');
app.use(loadUser,'_preprocess');

app.use(fileUtils.getFilePath,'_postprocess');
app.use(fileUtils.getContentType,'_postprocess');
app.use(respondWithFile,'_postprocess');

app.get('/',(req,res)=>{
  res.redirect('/index.html');
});


exports.app = app;

// const PORT = 5000;
// let server = http.createServer(app);
// server.on('error',e=>console.error('**error**',e.message));
// server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
