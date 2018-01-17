let parseData = function(todoslist){
  let li = "";
  todoslist.forEach(function(todoTitle){
    li += `<li>${createTodoLink(todoTitle)}</li>`;
  });
  return li;
}

const createTodoLink = function(todoTitle){
  return `<a href =todo${todoTitle}.JSON>${todoTitle}</a>`;
}

const changeDiv = function(){
  let data = this.responseText;
  let htmltext = parseData(data.split(','));
  document.getElementById('list').innerHTML = htmltext;
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
