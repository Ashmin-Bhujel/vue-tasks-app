<script lang="ts" setup>
import type { FilterType, Task } from "../types";
import FilterButton from "./FilterButton.vue";

const props = defineProps<{
  tasks: Task[];
  filteredTasks: Task[];
  totalDone: number;
  currentFilter: FilterType;
}>();

const emit = defineEmits<{
  toggleDone: [id: string];
  removeTask: [id: string];
  selectFilter: [filterType: FilterType];
}>();

const filters: FilterType[] = ["all", "todo", "done"];
</script>

<template>
  <section>
    <div>
      <h4 v-if="!props.tasks.length">Add task to get started</h4>
      <h4 v-else>
        {{ props.totalDone }}/{{ props.tasks.length }} Task completed
      </h4>
    </div>

    <div v-if="props.tasks.length" class="btn-wrapper">
      <FilterButton
        v-for="filter in filters"
        :filterType="filter"
        :currentFilter="props.currentFilter"
        @select-filter="(filterType: FilterType) => emit('selectFilter', filterType)"
      />
    </div>

    <TransitionGroup name="task-list" tag="div">
      <article v-for="task in filteredTasks" :key="task.id" class="task">
        <div>
          <input
            type="checkbox"
            :name="task.value"
            :id="task.id"
            :checked="task.done"
            @input="emit('toggleDone', task.id)"
          />

          <label :for="task.id" :class="{ done: task.done }">{{
            task.value
          }}</label>
        </div>

        <div>
          <button class="outline" @click="emit('removeTask', task.id)">
            Remove
          </button>
        </div>
      </article>
    </TransitionGroup>
  </section>
</template>

<style scoped>
h4 {
  text-align: center;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.done {
  text-decoration: line-through;
}

.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}

.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
