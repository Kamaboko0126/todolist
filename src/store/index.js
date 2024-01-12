import { createStore } from "vuex";

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, todo) {
      state.todos.splice(state.todos.indexOf(todo), 1);
    },
    MARK_AS_DONE(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index !== -1) {
        state.todos[index].state = "done";
      }
    },
    MARK_AS_TODO(state, todo) {
      const index = state.todos.indexOf(todo);
      if (index !== -1) {
        state.todos[index].state = "todo";
      }
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
