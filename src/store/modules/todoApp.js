
const storage = {
  fetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }
    }
    arr.sort((a, b) => {return a.num - b.num}).sort((a, b) => {return a.completed - b.completed});
    
    return arr
  },
};

const state = {
  todoItems: storage.fetch()
};

const getters = {
  storedTodoItems(state) {
    return state.todoItems;
  }
};

const mutations = {
  addOnItem(state, todoItem) {
    const obj = {completed: false, item: todoItem.value, num: todoItem.num};
    localStorage.setItem(todoItem.value, JSON.stringify(obj));
    state.todoItems.push(obj);
  },

  removeOnItem(state, payload) {
    localStorage.removeItem(payload.todoItem.item);
    state.todoItems.splice(payload.index, 1);
  },

  toggleOnItem(state, payload) {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
    localStorage.removeItem(payload.todoItem.item);
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    
    const checkedItem = state.todoItems.splice(payload.index, 1);
    state.todoItems = state.todoItems.concat(checkedItem).sort((a,b) => a.num - b.num).sort((a, b) => a.completed - b.completed);
  },

  clearAllItems(state) {
    localStorage.clear();
    state.todoItems = [];
  }
};

export default{
  state,
  getters,
  mutations
}