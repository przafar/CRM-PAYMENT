<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="filter-form">
      <v-col cols="12" md="3" class="pr-2">
        <v-text-field
          v-model="modelValueNumber"
          label="№ документа"
          placeholder="Введите номер"
          clearable
          @update:model-value="val => emit('update:modelValueNumber', val)"
        />
      </v-col>

      <v-col cols="12" md="3" class="px-2">
        <v-select
          v-model="modelValueEmployee"
          :items="itemsEmployee"
          item-title="fullName"
          item-value="id"
          label="Сотрудник"
          placeholder="Выберите сотрудника"
          clearable
          @update:model-value="val => emit('update:modelValueEmployee', val)"
        />
      </v-col>

      <v-col cols="12" md="3" class="px-2">
        <v-select
          v-model="modelValueDocType"
          :items="itemsDocType"
          label="Тип документа"
          placeholder="Выберите тип"
          clearable
          @update:model-value="val => emit('update:modelValueDocType', val)"
        />
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValueNumber: string
  modelValueEmployee: number | string | null
  itemsEmployee: { id: number | string; fullName: string }[]
  modelValueDocType: string | null
  itemsDocType: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValueNumber', val: string): void
  (e: 'update:modelValueEmployee', val: number | string | null): void
  (e: 'update:modelValueDocType', val: string | null): void
}>()

const picker = ref(false)
</script>

<style scoped></style>