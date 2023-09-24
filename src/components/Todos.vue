<template>
  <div>
    <h2>Todos</h2>
    <div class="settings-container">
      <div class="limit">
        Limit Todos: &nbsp;
        <select @change="limitTodos($event)">
          <option value="200">200</option>
          <option value="100">100</option>
          <option value="50">50</option>
          <option value="20">20</option>
          <option value="10">10</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="legend">
        <span>Double click to mark as complete</span>
        <span>
          <span class="incomplete-box"></span> = Incomplete
        </span>
        <span>
          <span class="complete-box"></span> = Complete
        </span>         
      </div>
  </div>

    <div class="todos">
      <div
        @dblclick="switchCompletion(todo)"
        v-for="todo in loadedTodos"
        :key="todo.id"
        class="todo"
        v-bind:class="{'is-complete':todo.completed}"
      >
        {{ todo.title }}
        <i @click="deleteCurrentTodo(todo.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from 'axios';

export default {
  name: "Todos",
    data() {
    return {
      limit: 200
    };
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),
    switchCompletion(todo) {
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };

      this.updateCurrentTodo(updTodo);

    },

    limitTodos(event) {
    // Get selected number
      const limit = parseInt(
        event.target.options[event.target.options.selectedIndex].innerText
      );
      this.limit = limit;
    },   

    async updateCurrentTodo(updTodo) {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        updTodo
      );   

      this.updateTodo(response.data); // option1 - in this case "this" is the store
      // this.$store.dispatch('updateTodo', response.data); // option2
    },
        
    async deleteCurrentTodo(id) {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      this.deleteTodo(id); // option1 - in this case "this" is the store
      // this.$store.dispatch('deleteTodo', id); // option2
    },
  },     

  computed: {
    ...mapGetters(["allTodos"]),
     loadedTodos: function () {
       return this.allTodos.slice(0, this.limit);
     } // in case filtering todos is not in a separate component
  }

};
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.todo {
  border: 1px solid #ccc;
  background: #41b833;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
}

.settings-container {
  display: grid;
  grid-template-columns: 1fr 4fr;  
  margin-bottom: 10px;
}

.limit {
  display: flex;
  align-items: center;
}

.legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #46355e;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b833;
}

.is-complete {
  background: #46355e;
  color: #fff;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }

  .settings-container {
    grid-template-columns: 1fr;  
  }  
}
</style>
