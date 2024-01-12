import { createStore } from "vuex";

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    REMOVE_TODO(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    MARK_AS_DONE(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index !== -1) {
        state.todos[index].state = "done";
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    MARK_AS_TODO(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index !== -1) {
        state.todos[index].state = "todo";
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  actions: {
    addTodo({ commit }, todo) {
      commit("ADD_TODO", todo);
    },
    removeTodo({ commit }, todo) {
      commit("REMOVE_TODO", todo);
    },
    markAsDone({ commit }, todo) {
      commit("MARK_AS_DONE", todo);
    },
    markAsTodo({ commit }, todo) {
      commit("MARK_AS_TODO", todo);
    },
  },
});
