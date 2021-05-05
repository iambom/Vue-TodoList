<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- addTodoItem 이벤트 받아서 addOnItem 메서드 실행 -->
    <TodoInput v-on:addTodoItem="addOnItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOnItem" v-on:toggleItem="toggleOnItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems: [],
    }
  },
  methods: {
    addOnItem : function(todoItem) {
      var obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOnItem: function(todoItem, index) {
      // 전달 받은 todoItem object의 key를 지워줌 (key = todoItem.item)
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOnItem: function(todoItem, index) {
      // 다시 올려 받은 하위 props를 건드리지 말고 현재 컴포넌트의 data에 접근 하는 것이 좋음
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems: function () {
      localStorage.clear();
      this.todoItems = [];
    },
  },
  created: function() {
    if(localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          console.log(JSON.parse(localStorage.getItem(localStorage.key(i))));
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }
    }
  },
  components: {
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter

  }
}
</script>

<style>
  body{
    text-align: center;
    background-color: #f6f6f6;
  }
  input {
    border-style: groove;
    width:200px;
  }
  button {
    border-style: groove;
  }
  .shadow{
    box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
  }
</style>
