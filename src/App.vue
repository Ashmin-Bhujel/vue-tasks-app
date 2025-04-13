<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TaskForm from "./components/TaskForm.vue";
import type { FilterType, Task } from "./types";
import TaskList from "./components/TaskList.vue";

const tasks = ref<Task[]>([]);
const currentFilter = ref<FilterType>("all");

// Trying to get tasks data from localstorage if exists
try {
  tasks.value = JSON.parse(localStorage.getItem("tasks") || "[]");
} catch (error) {
  console.error("Failed to load tasks from localStorage:", error);
}

// Updating tasks data in localstorage everytime tasks data gets updated
watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true }
);

const totalDone = computed(() =>
  tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0)
);

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case "all":
      return tasks.value;
    case "todo":
      return tasks.value.filter((task) => !task.done);
    case "done":
      return tasks.value.filter((task) => task.done);
  }
  return tasks.value;
});

function handleAddTask(newTask: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    value: newTask,
    done: false,
  });
}

function handleToggleDone(id: string) {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
}

function handleRemoveTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
}

function handleSelectFilter(filterType: FilterType) {
  currentFilter.value = filterType;
}
</script>

<template>
  <main>
    <h1>Vue Tasks App</h1>
    <TaskForm @add-task="handleAddTask" />
    <TaskList
      :tasks
      :filtered-tasks="filteredTasks"
      :total-done="totalDone"
      :current-filter="currentFilter"
      @toggle-done="handleToggleDone"
      @remove-task="handleRemoveTask"
      @select-filter="handleSelectFilter"
    />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
}
</style>
