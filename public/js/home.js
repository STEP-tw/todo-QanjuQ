let parseData = function(data){
  data =JSON.parse(data,null,2);
  let keys = Object.keys(data);
  let list = document.getElementById('todos');
  let todos = '';
  console.log(keys);
  keys.forEach((key)=>{
    let todo = document.createElement('a');
    todo.innerHTML =  key + "<br/>";
    todo.id = key + ".json";
    todo.href = key + ".json";
    list.appendChild(todo);
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
