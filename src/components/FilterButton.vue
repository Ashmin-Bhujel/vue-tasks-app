<script lang="ts" setup>
import type { FilterType } from "../types";

const props = defineProps<{
  filterType: FilterType;
  currentFilter: FilterType;
}>();

const emit = defineEmits<{
  selectFilter: [filterType: FilterType];
}>();
</script>

<template>
  <button
    @click="emit('selectFilter', props.filterType)"
    class="secondary"
    :class="{ contrast: props.currentFilter === props.filterType }"
  >
    {{ props.filterType }}
  </button>
</template>

<style scoped>
button {
  text-transform: capitalize;
}
</style>
