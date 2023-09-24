<template>
  <div id="app">
    <div class="container">
      <AddTodo/>
      <Todos/>
    </div>
  </div>
</template>

<script>
import Todos from "./components/Todos.vue";
import AddTodo from "./components/AddTodo.vue";
import { mapGetters, mapActions } from "vuex";
import axios from 'axios';

export default {
  name: "app", 
  methods: {   
    ...mapActions(['fetchTodos']),     
    async fetchAllTodos() {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      // option1 - in this case "this" is the store
      this.fetchTodos(response.data);
    }       
  },
  
  computed: {
    ...mapGetters(['allTodos'])  
  },
        
  created() {
    // this.$store.dispatch('fetchTodos'); // option2
    this.fetchAllTodos(); 
  }, 

  components: {
    Todos,
    AddTodo
  }
};
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}
.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
