let parseData = function(data){
  data = JSON.parse(data,null,2);
  let keys = Object.keys(data);
  let list = document.getElementById('todos');
  let todos = '';
  keys.forEach((key)=>{
    let todo = document.createElement('a');
    todo.innerHTML =  key + "<br/>";
    todo.id = key + ".JSON";
    todo.href = "todohtml"+key+".JSON";
    list.appendChild(todo);
  });
}

const changeDiv = function(){
  let data = this.responseText;
  parseData(data);
}

const createTodo = function(){
  let title = document.getElementsByName('title')[0].value;
  createRequest('POST','createTodo',changeDiv,`title=${title}`);
}

const addListener =function(){
  createRequest('GET','todos',changeDiv);
  document.getElementById('create').onclick = createTodo;
  addLogoutListener();
  // document.getElementById('delete').onclick = deleteTodo;
}

window.onload = addListener;
