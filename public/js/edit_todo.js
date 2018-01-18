const addNewItemBox = function(event){
  if(event.key == 'Enter'){
    let items = document.getElementById('items');
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>Objective: <input type="text" name = "objective"/></td>
    <td>Description:<input type="text" name ="description"></td>`;
    items.appendChild(tr);
  }
}

const save = function(){
  alert('you have changed your todo');
}

const parseTodo = function(todo){
  let data = '';
  let keys = Object.keys(todo);
  keys.reduce((key)=>{
    return `${key}=${todo[key]}&`
  },data);
}

const saveTodo = function(){
  let todo = {};
  todo.title = document.getElementById('title').innerText;
  todo.description = document.getElementById('description').value;
  createRequest('POST',`/saveTodo${todo.title}`,save,parseTodo(todo));
}

const addListener = function(){
  document.body.onkeypress = addNewItemBox;
  document.getElementById('addItem').onclick = addNewItemBox;
  document.getElementById('save').onclick = saveTodo;
}

window.onload = addListener;
