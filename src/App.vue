<script setup lang="ts">
import { ref, watch } from 'vue'
import TodoItem from './components/TodoItem.vue';
import { useTodoStore, type Todo } from './stores/useTodoStore';

const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore()

let input = ref('')

function handleAddTodo() {
  if (input.value != '') {
    addTodo(input.value)
    input = ref('')
  }
}

function handleUpdate(todo: Todo) {
  updateTodo(todo.id, todo.title, todo.isDone)
}




watch(todos, () => {
  console.log(todos)
})
</script>

<template>
  <div class="max-w-4xl mx-auto py-14 bg-blue-100 rounded-xl">
    <h1 class="text-center text-5xl font-bold text-cyan-500">TODO APP</h1>

    <div class="max-w-2xl mx-auto">
      <div class="flex m-auto w-[70%] py-8 justify-between">
        <input type="text" class="bg-amber-50 border w-[85%] py-2 pl-2 rounded-md" v-model="input" @keyup.enter="handleAddTodo" placeholder="Nhập Công việc cần thêm vào...">
          <button class="bg-amber-100 border border-amber-300 w-[12%] rounded-md" @click="handleAddTodo">Thêm</button>
      </div>

      <ul class="flex flex-col gap-y-2.5">
        <li v-for="item in todos" :key="item.id">
          <TodoItem :todo="item" @delete="deleteTodo(item.id)" @edit="handleUpdate" />
        </li>
      </ul>
    </div>


  </div>

</template>

<style scoped>
.item-wrapper {
  border: 1px solid #eee;
  margin-bottom: 8px;
  border-radius: 4px;
}

.item-header {
  padding: 12px;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.item-content {
  padding: 12px;
  background-color: #fff;
  border-top: 1px solid #eee;
}
</style>
