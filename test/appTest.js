let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../server.js').app;
let th = require('./testHelper.js');


describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
      })
        done();
    })
  })

  describe('GET /',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo APP');
      })
      done();
    })
  })

  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo APP');
      })
        done();
    })
  })

  describe('POST /login',()=>{
    it("redirects to home page by setting cookie for registered user",(done)=>{
      request(app,{method:'POST',url:'/login',body:'username=anju&password=0000'},(res)=>{
        th.should_have_cookie(res,'sessionid','100001');
        th.should_have_cookie(res,'login','true');
        th.should_be_redirected_to(res,'/home.html');
      })
      done();
    })

    it('sets a message wrong password if username matches but not password',(done)=>{
      request(app,{method:'POST',url:'/login',body:'username=anju&password=0001'},(res)=>{
        th.should_have_expiring_cookie(res,'message','wrong password');
        th.should_not_have_cookie(res,'login');
        th.should_not_have_cookie(res,'sessionid');
        th.status_is_ok(res);
      })
      done();
    })

    it('sets a message you need to register if user is not present',(done)=>{
      request(app,{method:'POST',url:'/login',body:'username=QanjuQ&password=0001'},(res)=>{
        th.should_have_cookie(res,'message','you need to register');
        th.should_not_have_cookie(res,'sessionid');
        th.status_is_ok(res);
      })
    done();
    })

    it('redirects to home page if user is already loggedin',(done)=>{
      request(app,{method:'POST',url:'/login',body:'username=anju&password=0000',
      headers:{'cookie':'login:true','sessionid':'100001'}},(res)=>{
        th.should_be_redirected_to('/home');
      });
      done();
    })
  })

  describe('GET /login',()=>{
    it('serves the login form',(done)=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Username:<input type = "text" name = "username" id="uname">');
      })
      done();
    })
    it('redirects to home page if user is already loggedin',(done)=>{
      request(app,{method:'GET',url:'/login',
      headers:{'cookie':'login:true','sessionid':'100001'}},(res)=>{
        th.should_be_redirected_to('/home');
      });
      done();
    })
  })

  describe('GET /logout',()=>{
    it('sets a expiring login=false cookie',(done)=>{
      request(app,{method:'GET',url:'/logout'},(res)=>{
        th.should_have_expiring_cookie(res,'login','false');
        th.should_have_expiring_cookie(res,'sessionid','0');
        th.should_be_redirected_to(res,'/index.html');
      })
      done();
    })
  })

  describe('GET todos',()=>{
    it('gets a list of titles of todos',(done)=>{
      request(app,{method:'GET',url:'/todos',
      headers:{'cookie':['login=true; sessionid=100001']}},(res)=>{
        th.status_is_ok(res);
        console.log(res.body);
        th.body_contains(res.body,'[]');
      })
      done();
    })
  })

  describe('POST createTodo',()=>{
    it('creates a todo with title "hello"',(done)=>{
      request(app,{method:'POST',url:'createTodo'},(res)=>{

      })
      done();
    })
  })


})
