<template>
  <div class="py-3 px-1 bg-amber-300 flex rounded-md border border-amber-500">
    <input type="checkbox" v-if="isEditing == false" v-model="checked" class="w-[6%] mx-[2%]"/>
    <span type="checkbox" v-else class="w-[6%] mx-[2%]"></span>
    <div v-if="!isEditing" class="flex w-[88%] justify-between mr-[2%]" >
      <span class="w-[65%] italic line-through py-2 pl-2" v-if="checked == true" >{{ props.todo.title }}</span>
      <span class="w-[65%] py-2 pl-2" v-if="checked == false" >{{ props.todo.title }}</span>
      <span class="w-[15%] text-center py-2 bg-rose-500 text-amber-50 rounded-xl font-bold" @click="emit('delete')">Xóa</span>
      <span class="w-[15%] text-center py-2 bg-cyan-300 text-gray-700 rounded-xl font-bold" v-if="!isEditing && checked == false" @click="isEditing = !isEditing; updateValue = props.todo.title">Sửa</span>
    </div>
    <div v-else class="flex w-[95%] justify-between mr-[2%]">
      <input type="text" class="w-[65%] border bg-amber-50 pl-2 rounded-sm" v-model="updateValue" @keyup.enter="handleUpdate"></input>
      <span class="w-[15%] text-center py-2 bg-rose-500 text-amber-50 rounded-xl font-bold" @click="emit('delete')">Xóa</span>
      <span class="w-[15%] text-center py-2 bg-cyan-100 text-gray-700 rounded-xl font-bold" v-if="isEditing" @click="handleUpdate">Xong</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Todo } from "../stores/useTodoStore";

const props = defineProps<{
    todo: Todo
}>();

const checked = ref(props.todo.isDone)
const isEditing = ref(false)
const updateValue = ref('')

function handleUpdate() {
  emit('edit', { ...props.todo, title: updateValue.value })
  isEditing.value = false
}

watch(checked, () => {
  emit('edit', { ...props.todo, isDone: checked.value })
} )


const emit = defineEmits<{
  delete: []
  edit: [value: Todo]
}>()

</script>
