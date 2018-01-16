const logout = function(){
  createRequest('GET','logout',logoutAlert);
};

const logoutAlert = function(){
  alert('you logged out');
}

const addLogoutListener = function(){
  document.getElementById('logout').onclick = logout;
}
