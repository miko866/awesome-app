<template>
  <div>
    <h1>Todos</h1>
    <input type="text" v-model="todoName" @keyup.enter="addTodo" />
    <ul>
      <li v-for="todo of todos" :key="todo.id">{{ todo.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

const baseURL = 'http://localhost:3000/todos';
export default {
  data() {
    return {
      todos: [],
      todoName: ''
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.todos = res.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async addTodo() {
      // Send object to JSON Server
      const res = await axios.post(baseURL, { name: this.todoName });

      // Append new data in to Array
      this.todos = [...this.todos, res.data];

      // Empty String
      this.todoName = '';
    }
  }
};
</script>

<style lang="scss" scoped></style>
