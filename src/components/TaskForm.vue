<script lang="ts" setup>
import { ref } from "vue";

const newTask = ref("");
const invalidMessage = ref("");

const emit = defineEmits<{
  addTask: [newTask: string];
}>();

function handleSubmit() {
  if (newTask.value.trim()) {
    emit("addTask", newTask.value.trim());
    newTask.value = "";
  } else {
    invalidMessage.value = "Please enter a valid task!";
  }
}
</script>

<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <div>
        <input
          type="text"
          name="new-task"
          id="new-task"
          placeholder="Enter new task"
          :aria-invalid="!!invalidMessage || undefined"
          v-model="newTask"
          @input="invalidMessage = ''"
        />

        <small v-if="invalidMessage" id="invalid-helper" aria-live="polite">{{
          invalidMessage
        }}</small>
      </div>

      <div>
        <button>Add Task</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
form {
  padding: 2rem 0;
}

button {
  width: 100%;
}
</style>
