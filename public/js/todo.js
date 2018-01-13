const viewTodoRequest = function(){
  let content = this.responseText;
  console.log(content);
}

const createTodoRequest = function(){
  let url = event.target.id;
  let xml = new XMLHttpRequest();
  xml.addEventListener('load',viewTodoRequest);
  xml.open('GET',url);
  xml.send();
}
