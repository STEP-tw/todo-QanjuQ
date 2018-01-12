let fs = require('fs');

const contentTypes = {
  'html':'text/html',
  'css':'text/css',
  'js':'text/javascript',
  'jpg':'image/jpg',
  'png':'image/png',
  'svg':'image/svg',
  'ico':'image/x-icon',
  'gif':'image/gif'
};

const filepaths = {
  'html':'',
  'gif':'/images',
  'ico':'/images',
  'css':'/styles',
  'js':'/scripts',
  'jpg':'/images',
  'png':'/images',
  'svg':'/images'
};
let fileUtils = {};



fileUtils.getFileExtension = function(url){
  return url.split('.')[1];
}

fileUtils.isImage = function(filepath){
  let fileExtn = fileUtils.getFileExtension(filepath);
  return ['jpg','png','ico','svg','gif'].includes(fileExtn);
}

fileUtils.getContentType = (req)=>{
  let fileExtn = fileUtils.getFileExtension(req.url);
  req.contentType = contentTypes[fileExtn];
}

fileUtils.getFilePath = function(req){
  let fileExtn = fileUtils.getFileExtension(req.url);
  req.filepath = './public' + filepaths[fileExtn] + req.url;
}

fileUtils.readFile = function(filepath,callBack){
  if(fileUtils.isImage(filepath)){
    fileUtils.serveImage(filepath,callBack);
    return;
  }
  fileUtils.serveFile(filepath,callBack);
}

fileUtils.serveImage = function(filepath,callBack){
  fs.readFile(filepath,callBack);
}

fileUtils.serveFile = function(filepath,callBack){
  fs.readFile(filepath,'utf8',callBack);
}

exports.fileUtils = fileUtils;
