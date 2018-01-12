let parseData = function(data){
  console.log(data);
  let keys = Object.keys(data);
  let todos = '';
  keys.forEach((key)=>{
    
  });
}

const changeDiv = function(){
  let data = this.responseText;
  parseData(data);
}

const createTodo = function(){
  let todo = new XMLHttpRequest();
  todo.addEventListener('load',changeDiv);
  todo.open('POST','create');
  let title = document.getElementsByName('title')[0].value;
  todo.send(`title=${title}`);
}

const addListener =function(){
  createRequest();
  document.getElementById('create').onclick = createTodo;
  // document.getElementById('delete').onclick = deleteTodo;
}

let createRequest = function(){
  let todos = new XMLHttpRequest();
  todos.addEventListener('load',changeDiv);
  todos.open('GET','todos');
  todos.send();
}

window.onload = addListener;
