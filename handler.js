let handler = {};

handler.resourceNotFoundHandler = function(){
  this.statusCode = 404;
  this.write("<h1>File Not Found</h1>");
  this.end();
}

handler.resourceFoundHandler = (contentType,content)=>{
  this.statusCode = 200;
  this.setHeader('Content-Type',contentType);
  this.write(content);
  this.end();
}

handler.redirect = function(path){
  console.log(`redirecting to ${path}`);
  this.statusCode = 302;
  this.setHeader('location',path);
  this.end();
}

exports.handler = handler;
