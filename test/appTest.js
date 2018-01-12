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
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/index.html');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'ToDo APP');
        done();
      })
    })
  })
  describe('POST /login.html',()=>{
    it("redirects to home page by setting cookie",done=>{
      request(app,{method:'POST',url:'/login.html',body:'username=Anju&password="hello"'},res=>{
        th.should_be_redirected_to(res,'/home.html');
        th.should_have_cookie(res,'login',true);
        assert.equal(res.body,'');
        done();
      })
    })
  })
  describe('GET /todos',()=>{
    it('should return a object of todos and links',done=>{
      request(app,{method:'GET',url:'/todos'},res=>{
        th.status_is_ok(res);
        assert.notEqual(`{hello: ./public/data/Anjum/hello.json,
        helloq: ./public/data/Anjum/helloq.json}`,res.body);
        done();
      })
    })
  })
})
