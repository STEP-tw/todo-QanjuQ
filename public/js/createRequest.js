const createRequest = function(method,url,listener,data=''){
  let req = new XMLHttpRequest();
  req.addEventListener('load',listener);
  req.open(method, url);
  req.send(data);
}
