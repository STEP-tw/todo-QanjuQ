const displayMessage = function(){
  document.getElementById('messagebox').innerHTML = this.responseText;
}

const postLogin = function(){
  let uname = document.getElementById('uname').value;
  let password = document.getElementById('password').value;
  createRequest('POST','login',displayMessage,`username=${uname}&password=${password}`);
}

const displayForm = function(){
  let recieved = this.responseText;
  document.getElementById('login_form').innerHTML = recieved;
  document.getElementById('login').onclick = postLogin;
}

const getLogin = function(){
  createRequest('GET','login',displayForm);
}

const addListener = function(){
  addLogoutListener();
  document.getElementById('get_login').onclick = getLogin;
}

window.onload = addListener;
