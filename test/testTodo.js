let assert = require('chai').assert;
let Item = require('../Item.js');
let Todo = require('../todo.js');

describe('Todo',()=>{
  describe('creating new Todo',()=>{
    it('is todo as expected Todo("hello")',()=>{
      let todo = new Todo('hello');
      assert.equal(todo.getTitle(),'hello');
      assert.notEqual(todo.getTitle(),"");
      assert.equal(todo.getDescription(),"");
      assert.deepEqual(todo.getItems(),{});
      assert.equal(todo.src,'./hello.JSON');
    });
  });
  describe('todo.createItem()',()=>{
    it('creating new item in todo with title item1',()=>{
      let todo = new Todo('hello');
      todo.createItem('item1',"hii");
      let expected = new Item('item1',"hii");
      console.log(expected);
      assert.deepEqual(todo.getItems(),{1:expected});
    });
    it('creating two items in todo with title item1,item2',()=>{
      let todo = new Todo('hello');
      todo.createItem("item1", "hii");
      todo.createItem("item2", "hii");
      let expected = {1:new Item("item1","hii"),2:new Item("item2","hii")};
      assert.deepEqual(todo.getItems(),expected);
    });
    it('should replace the previous item if item exists',()=>{
      let todo = new Todo('hello');
      todo.createItem('item1',"hii");
      let expected = {1:new Item('item1',"hii")};
      todo.createItem('item1',"hii");
      assert.deepEqual(todo.getItems(),expected);
    })
  });
  describe('todo.deleteItem()',()=>{
    it('delete item in todo with title item1',()=>{
      let todo = new Todo('hello');
      todo.createItem('item1',"hii");
      assert.deepEqual({1:new Item('item1',"hii")},todo.getItems());
      todo.deleteItem('item1',"hii");
      assert.deepEqual({},todo.getItems());
    });
    it('deleteing an item with title item1 in todo having two items',()=>{
      let todo = new Todo('hello');
      todo.createItem('item1',"hii");
      todo.createItem('item2',"hii");
      let expected = {1:new Item('item1',"hii"),2:new Item('item2',"hii")};
      assert.deepEqual(expected,todo.getItems());
      todo.deleteItem('item2',"hii");
      assert.deepEqual({1:new Item('item1',"hii")},todo.getItems());
    });
  })
  describe('todo.getItemWithTitle()',()=>{
    it('should return item with title "hello"',()=>{
      let todo = new Todo('apple');
      todo.createItem('hello',"hii");
      todo.createItem('hii',"hii");
      let expected = new Item('hello',"hii");
      assert.deepEqual(todo.getItemWithTitle('hello'),{1:expected});
      assert.isOk(todo.getItemWithTitle('hello'));
    });
    it('should be undefined if item is not present with hello as title',()=>{
      let todo = new Todo('apple');
      todo.createItem('hii',"hii");
      assert.isNotOk(todo.getItemWithTitle('helo'));
    });
  })
});
