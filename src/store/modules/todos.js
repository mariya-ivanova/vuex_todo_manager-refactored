import axios from 'axios';

const state = {
  todos: []
};
console.log(state.todos);

const getters = {
  allTodos: state => state.todos  
};

const actions = {

  fetchTodos(context, todos) {
    context.commit('setTodos', todos);
  },

  addTodo(context, addedTodo) {
    context.commit('newTodo', addedTodo);
  },

  deleteTodo(context, id) {
    context.commit('removeTodo', id);
  }, 

  updateTodo(context, updTodo) {
    context.commit('updateTodo', updTodo);
  },   
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
