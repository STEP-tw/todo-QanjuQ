//contains all the reponses that are possible

let responses = {};

responses.resourceNotFoundHandler = function(){
  this.statusCode = 404;
  this.write("<h1>File Not Found</h1>");
  this.end();
}

responses.resourceFoundHandler = function(contentType,content){
  this.statusCode = 200;
  this.setHeader('Content-Type',contentType);
  this.write(content);
  this.end();
}

responses.redirect = function(path){
  console.log(`redirecting to ${path}`);
  this.statusCode = 302;
  this.setHeader('location',path);
  this.end();
}

responses.serveStaticFile = function(req,res){
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

exports.responses = responses;
