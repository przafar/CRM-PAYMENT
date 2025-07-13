<template>
  <div class="page-header">
    <div class="page-header__top d-flex align-center">
      <h4 class="page-header__title">{{ title }}</h4>
      <v-spacer />
      <div class="page-header__controls">
        <slot name="controls" />
        <v-btn
          icon
          v-if="hasFilterSlots"
          @click="$emit('toggle-filters')"
          :class="{ 'active--filters': filtersVisible }"
        >
          <v-icon>{{ filtersVisible ? 'mdi-filter-minus' : 'mdi-filter-plus' }}</v-icon>
        </v-btn>
      </div>
    </div>

    <v-expand-transition>
      <div v-if="filtersVisible" class="page-header__filters d-flex flex-wrap">
        <slot name="filters" />
      </div>
    </v-expand-transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, useSlots } from 'vue'

const props = defineProps<{
  title: string
  filtersVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-filters'): void
}>()

const slots = useSlots()
const hasFilterSlots = !!slots.filters

</script>

<style scoped>
.page-header {
  padding: 16px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
}
.page-header__top {
  align-items: center;
}
.page-header__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}
.page-header__controls > * {
  margin-left: 8px;
}
.page-header__filters {
  margin-top: 16px;
  gap: 12px;
}
.active--filters {
  color: var(--v-primary-base);
}
</style>