const assert = require('chai').assert;
const getParticularUser = require('../lib/users.js').getParticularUser;

describe('getParticularUser',()=>{
  it('gets user with sessionid 100001',()=>{
    let expected = {
      username: "anju",
      name: "Anjum Qureshi",
      password: "0000",
      todos: {},
      dir: "./public/data/anju",
      sessionid: "100001"
    };
    let actual = getParticularUser('sessionid','100001');
    assert.deepEqual(expected,actual);
  });
  it('gets user with username "anju"',()=>{
    let expected = {
      username: "anju",
      name: "Anjum Qureshi",
      password: "0000",
      todos: {},
      dir: "./public/data/anju",
      sessionid: "100001"
    };
    let actual = getParticularUser('username','anju');
    assert.deepEqual(expected,actual);
  })
})
