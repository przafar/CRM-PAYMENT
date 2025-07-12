<template>
  <v-navigation-drawer
    app
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    class="sidebar"
  >
    <v-list-item class="sidebar-logo">
      <v-list-item-title class="logo-title">CRM PAYMENT</v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list nav dense>
      <v-list-item
        v-for="item in menuItems"
        :key="item.name"
        class="sidebar-item"
        router
        link
        :to="{ name: item.name }"
        :active="route.name === item.name"
        active-class="sidebar-item--active"
      >
        <template #prepend>
          <Icon :icon="item.icon" class="sidebar-icon" />
        </template>
        <v-list-item-title class="sidebar-title">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()
const route = useRoute()

const menuItems = [
  {
    title: 'Сотрудники',
    name: 'employee',
    icon: 'mdi:account-group'
  },
  {
    title: 'Документы',
    name: 'documents',
    icon: 'mdi:file-document-box'
  }
]
</script>

<style scoped>
.sidebar {
  width: 280px;
  background-color: #122056;
}

.sidebar-item {
  border-radius: 6px;
  transition: background-color 0.2s;
  margin-bottom: 4px;
  padding-left: 12px;
}

.sidebar-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.sidebar-item--active {
  background-color: rgba(91, 101, 220) !important;
}
.sidebar-item--active .sidebar-icon {
  color: #fff;
}
.sidebar-item--active .sidebar-title {
  color: #fff;
}
.sidebar-icon {
  font-size: 24px;
  color: #fff;
}
.sidebar-title {
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  margin-left: 10px;
}

.logo-title {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin: 10px 5px;
}
</style>