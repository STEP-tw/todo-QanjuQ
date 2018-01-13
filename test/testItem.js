let assert = require('chai').assert;
let Item = require('../Item.js');

describe('Item',()=>{
  describe('getContent()',()=>{
    it('Item("hello") returns hello',()=>{
      let item = new Item('a','hello');
      assert.equal(item.getTitle(),'a');
      assert.equal(item.getContent(),'hello');
      assert.notEqual(item.getContent(),"");
    });
  });
  describe('getStatus()',()=>{
    it('Item("hello") returns false',()=>{
      let item = new Item('a','hello');
      assert.isNotOk(item.getStatus());
    });
  });
  describe('changeStatus()',()=>{
    it('Item("hello") changes status to done if its undone',()=>{
      let item = new Item('a','hello');
      assert.isNotOk(item.getStatus());
      item.changeStatus();
      assert.isOk(item.getStatus());
    });

    it('Item("hello") changes status to undone if its done',()=>{
      let item = new Item('a','hello');
      assert.isNotOk(item.getStatus());
      item.changeStatus();
      assert.isOk(item.getStatus());
    });
  });
  describe('isTitleSameAs()',()=>{
    it('returns true if title is equal to given title',()=>{
      let item = new Item('a','hello');
      assert.isOk(item.isTitleSameAs('a'));
    });
    it('returns false if title is equal to given title',()=>{
      let item = new Item('b','hello');
      assert.isNotOk(item.isTitleSameAs('a'));
    });
  })
});
