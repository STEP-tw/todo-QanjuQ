const handler = require('./handler.js').handler;

const toKeyValue = kv=>{
    let parts = kv.split('=');
    return {key:parts[0].trim(),value:parts[1].trim()};
}

const accumulate = (o,kv)=> {
  o[kv.key] = kv.value;
  return o;
}

const parseBody = text=> text && text.split('&').map(toKeyValue).reduce(accumulate,{}) || {};

const parseCookies = text=> {
  try {
    return text && text.split(';').map(toKeyValue).reduce(accumulate,{}) || {};
  }catch(e){
    return {};
  }
}

let invoke = function(req,res){
  let handler = this._handlers[req.method][req.url];
  if(!handler){
    this._postprocess.forEach(postprocess=>{
      postprocess(req,res);
    });
    return;
  }
  handler(req,res);
}

const initialize = function(){
  this._handlers = {GET:{},POST:{}};
  this._preprocess = [];
  this._postprocess = [];
}

const get = function(url,handler){
  this._handlers.GET[url] = handler;
}

const post = function(url,handler){
  this._handlers.POST[url] = handler;
}

const use = function(handler,atWhatTime){
  this[atWhatTime].push(handler);
}

const bindWithResponse = function(){
  this.redirect = handler.redirect;
  this.resourceFoundHandler = handler.resourceFoundHandler;
  this.resourceNotFoundHandler = handler.resourceNotFoundHandler;
}

const main = function(req,res){
  // res.redirect = redirect.bind(res);
  bindWithResponse.call(res);
  req.cookies = parseCookies(req.headers.cookie || '');
  let content="";
  req.on('data',data=>content+=data.toString());
  req.on('end',()=>{
    req.body = parseBody(content);
    content="";
    this._preprocess.forEach(middleware=>{
      if(res.finished) return;
      middleware(req,res);
    });
    if(res.finished) return;
    invoke.call(this,req,res);
  });
}

// const resourceNotFoundHandler = (res)=>{
//   res.statusCode = 404;
//   res.write("<h1>File Not Found</h1>");
//   res.end();
// }
//
// const resourceFoundHandler = (res,contentType,content)=>{
//   res.statusCode = 200;
//   res.setHeader('ContentType',contentType);
//   res.write(content);
//   res.end();
// }

let create = ()=>{
  let rh = (req,res)=>{
    main.call(rh,req,res)
  };
  initialize.call(rh);
  rh.get = get;
  rh.post = post;
  rh.use = use;
  return rh;
}

exports.create = create;
