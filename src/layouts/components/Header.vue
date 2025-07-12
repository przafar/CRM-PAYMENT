<template>
  <v-app-bar app dark>
     <v-app-bar-nav-icon @click="$emit('toggle-drawer')">
      <Icon
        :icon="!drawer ? 'line-md:close-to-menu-transition' : 'line-md:menu-to-close-transition'"
        :rotate="0"
        :inline="true"
        class="menu-icon"
      />
     </v-app-bar-nav-icon>
    <v-toolbar-title class="d-flex align-center">
      
    </v-toolbar-title>
    <v-spacer />
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style scoped>
.menu-icon {
  font-size: 28px;
  color: #122056;
}
</style>