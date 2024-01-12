<template>
  <div class="lists">
    <div class="list">
      <div class="list-head">
        <h1>Todos</h1>
        <button @click="isShow = !isShow">
          {{ !isShow ? "+ 新增待辦項目" : "取消" }}
        </button>
      </div>

      <div class="cards">
        <div class="add-content" v-if="isShow">
          <p v-if="warnText !== ''" class="warnText">{{ warnText }}</p>
          <input type="text" v-model="inputTitle" placeholder="待辦項目" />
          <div class="datepicker">
            <Datepicker v-model="pickedDate" placeholder="最後期限" typeable />
          </div>
          <div class="buttons">
            <button @click="addTodo">新增</button>
          </div>
        </div>

        <div class="card" v-for="todo in activeTodos" :key="todo.id">
          <div class="state state-todo" @click="markAsDone(todo)">
            <div
              class="circle circle-todo"
              :class="{ checked: todo.state === 'done' }"
            >
              <span class="checkmark checkmark-todo">&#10003;</span>
            </div>
            <div class="todo-btn">
              <p>{{ todo.state === "todo" ? "待辦事項" : "已完成" }}</p>
            </div>
          </div>
          <p>項目: {{ todo.title }}</p>
          <p>期限: {{ todo.deadline }}</p>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="list-head">
        <h1>Done</h1>
      </div>
      <div class="cards cards-done">
        <div class="card" v-for="todo in dones" :key="todo.id">
          <div class="state state-done" @click="markAsTodo(todo)">
            <div
              class="circle circle-done"
              :class="{ checked: todo.state === 'done' }"
            >
              <span class="checkmark checkmark-done">&#10003;</span>
            </div>
            <div class="todo-btn">
              <p>{{ todo.state === "todo" ? "待辦事項" : "已完成" }}</p>
            </div>
          </div>
          <p>項目: {{ todo.title }}</p>
          <p>期限: {{ todo.deadline }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker,
  },
  setup() {
    const title = ref("");
    const deadline = ref("");
    const store = useStore();
    const isShow = ref(false);
    const pickedDate = ref(null);
    const inputTitle = ref("");
    const warnText = ref("");

    const todos = computed(() => store.state.todos);

    const activeTodos = computed(() => {
      return todos.value.filter((todo) => todo.state !== "done");
    });

    const dones = computed(() => {
      return todos.value.filter((todo) => todo.state === "done");
    });

    // 新增代辦項目
    const addTodo = () => {
      if (inputTitle.value === "") {
        warnText.value = "*請輸入待辦項目";
        return;
      } else if (pickedDate.value === null) {
        warnText.value = "*請輸入最後期限";
        return;
      } else {
        warnText.value = "";
      }
      store.dispatch("addTodo", {
        title: inputTitle.value,
        deadline: formatDate(pickedDate.value),
        state: "todo",
        id: Date.now(),
      });
      inputTitle.value = "";
      pickedDate.value = "";
      console.log(store.state.todos);
    };

    // 刪除代辦項目
    const removeTodo = (todo) => {
      store.dispatch("removeTodo", todo);
    };

    // 標記為已完成
    const markAsDone = (id) => {
      store.dispatch("markAsDone", id);
      console.log("done");
    };

    // 標記為待辦
    const markAsTodo = (id) => {
      store.dispatch("markAsTodo", id);
      console.log("todo");
    };

    // 轉換儲存日期格式
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ("0" + (d.getMonth() + 1)).slice(-2);
      const day = ("0" + d.getDate()).slice(-2);

      return `${year}/${month}/${day}`;
    };

    return {
      deadline,
      title,
      inputTitle,
      pickedDate,
      todos,
      activeTodos,
      dones,
      isShow,
      warnText,
      addTodo,
      removeTodo,
      markAsDone,
      markAsTodo,
    };
  },
};
</script>

<style scoped>
.lists {
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
}

.list {
  padding: 10px 20px;
  min-width: 364px;
}

.list-head {
  padding: 10px 0 0 20px;
}

.cards {
  height: calc(100vh - var(--header-height) - 140px);
  overflow-y: auto;
  padding: 20px 20px;
}
.cards-done {
  height: calc(100vh - var(--header-height) - 80px);
}

.card,
.add-content {
  width: 284px;
  padding: 18px 25px;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: #fff;
}

.card {
  margin-top: 15px;
}

button {
  background-color: #8c6961;
  border: none;
  color: white;
  width: 280px;
  height: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2px;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #815c54;
}

input[type="text"] {
  width: 100%;
  padding: 8px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 2px;
}

.buttons {
  width: 100%;
  display: flex;
  align-items: center;
}

.todo-btn {
  padding: 4px 6px;
  font-size: 13px;
  background: #333333;
  color: #fff;
  margin-bottom: 5px;
}

.state {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.card p {
  margin: 5px 0;
}

.circle {
  width: 20px;
  height: 20px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid #000;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark {
  display: none;
  color: #28a745;
}

.checkmark-done {
  display: block;
}

.state-todo:hover .checkmark {
  display: block;
}

.state-done:hover .checkmark {
  display: none;
}

.warnText {
  color: #a82230;
  font-size: 12px;
  font-weight: bold;
}
</style>
