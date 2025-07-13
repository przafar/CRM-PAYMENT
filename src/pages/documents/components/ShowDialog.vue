<template>
  <VCard class="pa-4" elevation="2">
    <!-- Заголовок -->
    <VCardTitle class="d-flex align-center">
      <span class="headline">Документ №{{ document.number }}</span>
      <VSpacer />
     
    </VCardTitle>

    <VDivider />

    <!-- Основные поля -->
    <VCardText class="pt-4">
      <div class="field-group">
        <div class="field-label">Тип документа</div>
        <div class="field-value font-weight-medium">{{ document.type }}</div>
      </div>

      <div class="field-group mt-4">
        <div class="field-label">Дата документа</div>
        <div class="field-value font-weight-medium">{{ formatDate(document.date) }}</div>
      </div>
    </VCardText>

    <VDivider />

    <!-- Описание -->
    <VCardText class="pt-4">
      <div class="field-group">
        <div class="field-label">Описание</div>
        <div class="field-value">
          <p v-if="document.description" class="description-text">
            {{ document.description }}
          </p>
          <p v-else class="text--disabled">Нет описания</p>
        </div>
      </div>
    </VCardText>

    <VDivider />

    <!-- Сотрудник -->
    <VCardText class="pt-4" v-if="document.employee">
      <div class="field-group">
        <div class="field-label">Сотрудник</div>
        <div class="field-value font-weight-medium">
          {{ document.employee.firstName }} {{ document.employee.lastName }}
        </div>
      </div>
    </VCardText>

    <VCardActions>
      <VSpacer />
      <VBtn color="primary" @click="$emit('close')">Закрыть</VBtn>
    </VCardActions>
  </VCard>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { formatDate } from '@/utils/date'

const props = defineProps<{
  document: {
    id: number
    type: string
    number: string
    date: string
    description: string
    employee?: { firstName: string; lastName: string }
  }
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.field-group {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-weight: 500;
  color: var(--v-theme-on-surface-variant);
}

.field-value {
  margin-top: 4px;
}

.description-text {
  white-space: pre-wrap;
  line-height: 1.5;
}
</style>