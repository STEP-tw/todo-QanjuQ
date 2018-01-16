const displayForm = function(){
  let recieved = this.responseText;
  document.getElementById('login_form').innerHTML = recieved;
}

const login = function(){
  createRequest('GET','login',displayForm);
}

const addListener = function(){
  addLogoutListener();
  document.getElementById('login').onclick = login;
}

window.onload = addListener;
