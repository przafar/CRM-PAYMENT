<!-- MainLayout.vue -->
<template>
  <v-app>
    
    <Sidebar v-model="drawer" />
    <Header :drawer="drawer" @toggle-drawer="drawer = !drawer" />

    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Header from '@/layouts/components/Header.vue'
import Sidebar from '@/layouts/components/Sidebar.vue'

// флаг, открыт ли дровер
const drawer = ref(true)
</script>