const createRequest = function(){
  let logout = new XMLHttpRequest();
  logout.open('GET','logout');
  logout.send();
}

const addListener = function(){
  document.getElementById('logout').onclick = createRequest;
}

window.onload = addListener;
