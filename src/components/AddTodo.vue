<template>
  <div>
    <h3>Add Todo</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="title" placeholder="Add Todo...">
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';
export default {
  name: "AddTodo",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    ...mapActions(["addTodo"]), // this is not neccessary if we choose option2
    onSubmit(e) {
      e.preventDefault();
      this.addNewTodo(this.title);
      this.clearData();
    },

    async addNewTodo() {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        { title: this.title, completed: false }
      );

      this.addTodo(response.data); // option1 - in this case "this" is the store
      // this.$store.dispatch('addTodo', response.data); // option2
    },

    clearData() {
      this.title = "";
    }

  }
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b833;
  outline: 0;
}

input[type="submit"] {
  flex: 2;
  background: #41b833;
  color: #fff;
  border: 1px #41b833 solid;
  cursor: pointer;
}
</style>
